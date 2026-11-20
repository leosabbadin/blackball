/**
 * Utility functions for video frames, posters, and media handling.
 * Ensures the poster image is always the exact real 1st frame (timestamp 0.0s)
 * of the corresponding video using Cloudinary's native start offset `so_0` parameter.
 */

/**
 * Returns a high-definition image URL extracted from the exact first frame (time 0.0s)
 * of a Cloudinary video.
 *
 * Examples:
 * - https://res.cloudinary.com/.../video/upload/v1788900043/FRANGO_A_PASSARINHO.mp4
 *   -> https://res.cloudinary.com/.../video/upload/so_0,f_auto,q_auto:good/v1788900043/FRANGO_A_PASSARINHO.jpg
 *
 * - https://res.cloudinary.com/.../video/upload/q_auto:good,w_720,c_limit/v1787597073/Black_Ball_-_Isca_de_Frango.mp4
 *   -> https://res.cloudinary.com/.../video/upload/so_0,q_auto:good,w_720,c_limit/v1787597073/Black_Ball_-_Isca_de_Frango.jpg
 */
export function getCloudinaryFirstFramePoster(
  videoUrl?: string,
  fallbackPoster?: string
): string {
  if (!videoUrl) {
    return fallbackPoster || '';
  }

  // Handle Cloudinary video URLs
  if (videoUrl.includes('/video/upload/')) {
    // 1. Swap video file extension (.mp4, .webm, .mov) with .jpg
    const jpgUrl = videoUrl.replace(/\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i, '.jpg$2');

    // 2. If it already contains a start_offset or so_0, return as-is
    if (jpgUrl.includes('so_0') || jpgUrl.includes('start_offset_0')) {
      return jpgUrl;
    }

    const prefix = '/video/upload/';
    const uploadIndex = jpgUrl.indexOf(prefix);
    const afterUpload = jpgUrl.substring(uploadIndex + prefix.length);

    // 3. Check if path starts directly with version identifier e.g. "v1788900043/..."
    if (/^v\d+\//.test(afterUpload)) {
      return (
        jpgUrl.substring(0, uploadIndex + prefix.length) +
        'so_0,f_auto,q_auto:good/' +
        afterUpload
      );
    } else {
      // 4. Has existing transformations (e.g. "q_auto:good,w_720,c_limit/...")
      // Prepend so_0 to the transformation chain
      return (
        jpgUrl.substring(0, uploadIndex + prefix.length) +
        'so_0,' +
        afterUpload
      );
    }
  }

  // For non-Cloudinary or custom external videos, return provided fallback
  return fallbackPoster ? resolveMediaUrl(fallbackPoster) : '';
}

/**
 * Resolves media URLs considering Vite's base path (e.g. /comidas/)
 * so that both '/videos/BolinhodeCarneSeca.mp4' and external http URLs work seamlessly.
 */
export function resolveMediaUrl(url?: string): string {
  if (!url) return '';
  // Convert ImgBB HTML page links to direct CDN image URLs if provided
  if (url.includes('ibb.co/395mhc6Z') && !url.includes('i.ibb.co')) {
    return 'https://i.ibb.co/HfLTgqw8/i-Stock-514998178.jpg';
  }
  if (url.includes('ibb.co/yHf5Pwt') && !url.includes('i.ibb.co')) {
    return 'https://i.ibb.co/YHR8Qzm/360-F-483842040-0-Rjr1-EDu-Dttyc-Q3g6-Lb-Hmf3-Lgfh-O2-TOH.jpg';
  }
  if (url.includes('ibb.co/ZzNdDyhR') && !url.includes('i.ibb.co')) {
    return 'https://i.ibb.co/8gXMZFjn/Whats-App-Image-2026-10-19-at-14-36-03.jpg';
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const base = import.meta.env.BASE_URL || '/';
  // Normalize leading slashes
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  if (url.startsWith(cleanBase)) {
    return url;
  }

  return `${cleanBase}${cleanUrl}`;
}
