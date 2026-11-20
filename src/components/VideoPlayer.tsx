import React, { useEffect, useId, useRef, useState } from 'react';
import { Sparkles, Utensils } from 'lucide-react';
import { videoFeedManager } from '../utils/videoFeedManager';
import { getCloudinaryFirstFramePoster, resolveMediaUrl } from '../utils/mediaUtils';

interface VideoPlayerProps {
  id?: string;
  videoUrl?: string;
  posterUrl?: string;
  alt: string;
  aspectRatio?: '4/5' | '16/9' | '16/11' | '16/12' | 'square' | 'auto';
  className?: string;
  autoPlayInView?: boolean;
  priority?: boolean;
  isModal?: boolean;
  onClick?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  id,
  videoUrl,
  posterUrl,
  alt,
  aspectRatio = '16/11',
  className = '',
  priority = false,
  isModal = false,
  onClick,
}) => {
  const reactGeneratedId = useId();
  const playerId = id || reactGeneratedId;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsPlaying] = useState<boolean>(false);
  const [, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  // Separate CARREGAR from REPRODUZIR: preloads video tag when within 300px of viewport
  const [isNearViewport, setIsNearViewport] = useState<boolean>(priority || isModal);

  // Guarantee the poster is ALWAYS the exact real 1st frame (offset 0.0s) of the video
  const effectivePoster = getCloudinaryFirstFramePoster(videoUrl, posterUrl);
  const hasMedia = Boolean(videoUrl || effectivePoster);

  // Determine ratio class
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/11':
        return 'aspect-[16/11]';
      case '4/5':
        return 'aspect-[4/5]';
      case '16/12':
        return 'aspect-[16/12]';
      case '16/9':
        return 'aspect-video';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-[16/11]';
    }
  };

  // Immediate play helper for modal video
  useEffect(() => {
    if (!isModal || !videoRef.current || !videoUrl || hasError) return;
    const video = videoRef.current;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoaded(true);
        })
        .catch(() => {});
    }
  }, [isModal, videoUrl, hasError]);

  // Register feed card video with the independent IntersectionObserver videoFeedManager
  useEffect(() => {
    if (isModal || !videoUrl || hasError || !containerRef.current) return;

    const unregister = videoFeedManager.register({
      id: playerId,
      containerEl: containerRef.current,
      getVideoEl: () => videoRef.current,
      onNearViewport: () => setIsNearViewport(true),
      isModal: false,
    });

    return () => {
      unregister();
    };
  }, [playerId, videoUrl, isModal, hasError]);

  // When lazily mounted video enters the DOM, notify manager to evaluate if it should play immediately
  useEffect(() => {
    if (isNearViewport && videoRef.current) {
      videoFeedManager.notifyVideoMounted(playerId, videoRef.current);
    }
  }, [isNearViewport, playerId]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-[#0a0f0c] ${getAspectClass()} ${className} group select-none`}
    >
      {/* If No Video & No Poster URL: Discrete Luxury BlackBall Placeholder */}
      {!hasMedia ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-[#0e1611] via-[#080d0a] to-[#050806] border border-emerald-950/40">
          {/* Subtle Billiard Felt Glow Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Billiard Ball Stylized Badge */}
          <div className="relative mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-black border-2 border-emerald-500/40 shadow-[0_0_20px_rgba(0,230,118,0.15)] group-hover:scale-105 transition-transform">
            <span className="font-brand font-black text-xl text-white">8</span>
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00E676] text-black">
              <Utensils className="h-2.5 w-2.5" />
            </div>
          </div>

          <div className="relative space-y-0.5 max-w-[85%]">
            <span className="font-brand text-xs font-bold tracking-wider text-zinc-300 line-clamp-1">
              {alt}
            </span>
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-emerald-400/80">
              <Sparkles className="h-2.5 w-2.5 text-[#00E676]" />
              <span className="tracking-widest uppercase text-[9px]">Gastronomia BlackBall</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 
            Base Layer: Static First-Frame Poster Image.
            Visual replica of frame 0 extracted via Cloudinary so_0.
            Guarantees zero blank flashes while video element initializes.
          */}
          {effectivePoster && (
            <img
              src={resolveMediaUrl(effectivePoster)}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                const lowerAlt = (alt || '').toLowerCase();
                if (lowerAlt.includes('brownie') && !target.src.includes('brownie-chocolate-sorvete.jpg')) {
                  target.src = resolveMediaUrl('/images/brownie-chocolate-sorvete.jpg');
                } else if (lowerAlt.includes('petit gateau') && !target.src.includes('petit-gateau.jpg')) {
                  target.src = resolveMediaUrl('/images/petit-gateau.jpg');
                }
              }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
            />
          )}

          {/* 
            Video Layer: Rendered once the card is near viewport (rootMargin: 300px).
            Preload is set to metadata so only the initial header is fetched until playback.
            PlaysInline, muted, and loop are guaranteed. Zero currentTime resetting.
          */}
          {videoUrl && !hasError && isNearViewport && (
            <video
              ref={videoRef}
              src={resolveMediaUrl(videoUrl)}
              poster={effectivePoster ? resolveMediaUrl(effectivePoster) : undefined}
              playsInline
              muted
              loop
              preload="metadata"
              onPlaying={() => {
                setIsLoaded(true);
                setIsPlaying(true);
              }}
              onPause={() => setIsPlaying(false)}
              onError={() => setHasError(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
            />
          )}

          {/* Subtle Dark Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20 pointer-events-none" />
        </>
      )}

      {/* Subtle Cue Corner Accent */}
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#00E676] rotate-45 transform" />
      </div>
    </div>
  );
};

