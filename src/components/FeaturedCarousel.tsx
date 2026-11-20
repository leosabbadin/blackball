import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Flame, ChevronLeft, ChevronRight, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Dish } from '../types';
import { VideoPlayer } from './VideoPlayer';
import { videoFeedManager } from '../utils/videoFeedManager';

interface FeaturedCarouselProps {
  dishes: Dish[];
  onSelectDish: (dish: Dish) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  dishes,
  onSelectDish,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      videoFeedManager.recheckAll();
    }
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [dishes, checkScrollState]);

  if (!dishes || dishes.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = Math.max(260, carouselRef.current.clientWidth * 0.8);
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative w-full max-w-full overflow-hidden py-3 sm:py-5 border-b border-emerald-950/40">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
              <Flame className="h-3.5 w-3.5 fill-amber-400" />
              <span>Experiências Exclusivas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-montserrat font-extrabold text-white tracking-tight mt-0.5">
              🔥 Destaques da <span className="text-[#00E676]">BlackBall</span>
            </h2>
          </div>

          {/* Carousel Arrows in Header (Mobile & Desktop) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Anterior"
              className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-all ${
                canScrollLeft
                  ? 'bg-zinc-900 text-zinc-200 border-zinc-700 hover:border-[#00E676] hover:text-[#00E676] hover:scale-105 active:scale-95'
                  : 'bg-zinc-950 text-zinc-600 border-zinc-800/60 opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Próximo"
              className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border transition-all ${
                canScrollRight
                  ? 'bg-zinc-900 text-zinc-200 border-zinc-700 hover:border-[#00E676] hover:text-[#00E676] hover:scale-105 active:scale-95'
                  : 'bg-zinc-950 text-zinc-600 border-zinc-800/60 opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Video Cards Container */}
        <div className="relative group/carousel">
          {/* Small Floating Left Arrow on Carousel */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scroll('left');
              }}
              aria-label="Navegar para a esquerda"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/85 text-[#00E676] border border-[#00E676]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-md hover:bg-zinc-900 hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Small Floating Right Arrow on Carousel */}
          {canScrollRight && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scroll('right');
              }}
              aria-label="Navegar para a direita"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/85 text-[#00E676] border border-[#00E676]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-md hover:bg-zinc-900 hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 snap-x snap-mandatory w-full"
          >
          {dishes.map((dish, index) => {
            return (
              <div
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group relative w-[76vw] max-w-[290px] shrink-0 snap-start overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/30 hover:border-[#00E676] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.7)] transition-all duration-300 hover:shadow-[0_8px_30px_-5px_rgba(0,230,118,0.25)] cursor-pointer"
              >
                {/* Large Cinematographic Video */}
                <div className="relative w-full overflow-hidden bg-black aspect-[16/11]">
                  <VideoPlayer
                    id={`featured-${dish.id}`}
                    videoUrl={dish.video}
                    posterUrl={dish.poster || dish.image}
                    alt={dish.name}
                    aspectRatio="16/11"
                    priority={index === 0}
                    className="w-full h-full object-cover"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1 pointer-events-none">
                    <span className="rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-extrabold text-[#00E676] border border-[#00E676]/60 backdrop-blur-md shadow-lg">
                      🔥 DESTAQUE
                    </span>
                  </div>

                  {/* Serves Pill */}
                  {dish.serves && (
                    <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-zinc-200 border border-white/10 pointer-events-none">
                      <Users className="h-3 w-3 text-[#00E676]" />
                      <span>{dish.serves}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3.5 space-y-2">
                  <h3 className="font-brand text-base font-bold text-white group-hover:text-[#00E676] transition-colors leading-snug line-clamp-1">
                    {dish.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                    <div className="flex items-baseline font-brand font-black text-[#00E676] tracking-tight">
                      <span className="text-[10px] sm:text-xs font-semibold text-emerald-400/90 mr-0.5 select-none">R$</span>
                      <span className="text-lg font-black">{dish.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-300 group-hover:text-[#00E676] transition-colors">
                      <span>Ver detalhes</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};
