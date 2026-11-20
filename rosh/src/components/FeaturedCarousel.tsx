import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Dish } from '../types';
import { VideoPlayer } from './VideoPlayer';

interface FeaturedCarouselProps {
  dishes: Dish[];
  onSelectDish: (dish: Dish) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  dishes,
  onSelectDish,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!dishes || dishes.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.85;
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
              <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
              <span>Essências Selecionadas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-montserrat font-extrabold text-white tracking-tight mt-0.5">
              🔥 Destaques da <span className="text-[#00E676]">BlackBall</span>
            </h2>
          </div>

          {/* Carousel Arrows Desktop */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Anterior"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-emerald-500 hover:text-[#00E676] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Próximo"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-emerald-500 hover:text-[#00E676] transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Video Cards Container */}
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 snap-x snap-mandatory w-full"
        >
          {dishes.map((dish, index) => {
            const hasMedia = Boolean(dish.video || dish.image);
            return (
              <div
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group relative w-[76vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/30 hover:border-[#00E676] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.7)] transition-all duration-300 hover:shadow-[0_8px_30px_-5px_rgba(0,230,118,0.25)] cursor-pointer"
              >
                {/* Media or Brand Spotlight Header */}
                {hasMedia ? (
                  <div className="relative w-full overflow-hidden bg-black aspect-[16/11]">
                    <VideoPlayer
                      videoUrl={dish.video}
                      posterUrl={dish.image}
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
                ) : (
                  <div className="relative w-full bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-black px-4 pt-3.5 pb-2.5 border-b border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 border border-emerald-500/40 text-emerald-400 font-brand font-black text-xs shadow-[0_0_10px_rgba(0,230,118,0.2)]">
                        8
                      </div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400">
                        {dish.categoryName || 'BlackBall'}
                      </span>
                    </div>
                    <span className="rounded-full bg-amber-950/80 px-2 py-0.5 text-[9px] font-extrabold text-amber-300 border border-amber-500/40">
                      🔥 Destaque
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-3.5 space-y-2">
                  <div>
                    <h3 className="font-brand text-base font-bold text-white group-hover:text-[#00E676] transition-colors leading-snug line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-emerald-400/90 mt-0.5">
                      {dish.categoryName}
                    </p>
                  </div>

                  {(dish.flavor || dish.description) && (
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {dish.flavor ? `Sabor: ${dish.flavor}` : dish.description}
                    </p>
                  )}

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
    </section>
  );
};
