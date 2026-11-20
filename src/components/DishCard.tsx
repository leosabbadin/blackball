import React from 'react';
import { Users, Clock, ArrowRight, Package } from 'lucide-react';
import { Dish } from '../types';
import { BADGE_LABELS } from '../data/menuData';
import { VideoPlayer } from './VideoPlayer';

interface DishCardProps {
  dish: Dish;
  onSelect: (dish: Dish) => void;
  priority?: boolean;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onSelect,
  priority = false,
}) => {
  // Se o prato possui vídeo ou foto, exibe o card completo com mídia grande e mesmo visual dos destaques
  if (dish.video || dish.image) {
    return (
      <article
        onClick={() => onSelect(dish)}
        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/30 hover:border-[#00E676] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.7)] transition-all duration-300 hover:shadow-[0_8px_30px_-5px_rgba(0,230,118,0.25)] cursor-pointer"
      >
        {/* Large Cinematographic Video */}
        <div className="relative w-full overflow-hidden bg-black aspect-[16/11]">
          <VideoPlayer
            id={`dish-${dish.id}`}
            videoUrl={dish.video}
            posterUrl={dish.poster || dish.image}
            alt={dish.name}
            aspectRatio="16/11"
            priority={priority}
            className="w-full h-full object-cover"
          />

          {/* Badges */}
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col items-end gap-1 pointer-events-none">
            {dish.featured && (
              <span className="rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-extrabold text-[#00E676] border border-[#00E676]/60 backdrop-blur-md shadow-lg">
                🔥 DESTAQUE
              </span>
            )}
            {dish.badges?.map((badgeKey) => {
              const badge = BADGE_LABELS[badgeKey];
              if (!badge) return null;
              return (
                <span
                  key={badgeKey}
                  className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-wide border ${badge.bg} ${badge.color} ${badge.border} shrink-0 backdrop-blur-md shadow-md`}
                >
                  {badge.label}
                </span>
              );
            })}
          </div>

          {/* Serves Pill */}
          {dish.serves && (
            <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-zinc-200 border border-white/10 pointer-events-none">
              <Users className="h-3 w-3 text-[#00E676]" />
              <span>{dish.serves}</span>
            </div>
          )}

          {dish.quantity && !dish.serves && (
            <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-zinc-200 border border-white/10 pointer-events-none">
              <Package className="h-3 w-3 text-emerald-400" />
              <span>{dish.quantity}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-brand text-base sm:text-lg font-bold text-white group-hover:text-[#00E676] transition-colors leading-snug">
              {dish.name}
            </h3>
          </div>

          {dish.description && (
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {dish.description}
            </p>
          )}

          {/* Extra info (serves, quantity, weight, prepTime) */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 font-medium pt-0.5">
            {dish.quantity && dish.serves && (
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Package className="h-3 w-3 text-emerald-400" />
                <span>{dish.quantity}</span>
              </span>
            )}
            {dish.weight && !dish.quantity && (
              <span className="text-zinc-400">
                ⚖️ {dish.weight}
              </span>
            )}
            {dish.prepTime && (
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Clock className="h-3 w-3 text-emerald-400" />
                <span>{dish.prepTime}</span>
              </span>
            )}
          </div>

          {dish.secondaryPrice && (
            <div className="text-[11px] text-zinc-300 font-medium pt-0.5">
              <span>{dish.secondaryPrice.label}: </span>
              <strong className="text-[#00E676] font-bold">
                R$ {dish.secondaryPrice.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
            <div className="flex items-baseline font-brand font-black text-[#00E676] tracking-tight">
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-400/90 mr-0.5 select-none">R$</span>
              <span className="text-lg sm:text-xl font-black">
                {dish.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {dish.priceUnit && (
                <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 ml-1">
                  {dish.priceUnit}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 rounded-xl bg-zinc-900 group-hover:bg-[#00E676] px-2.5 py-1.5 text-zinc-300 group-hover:text-black border border-zinc-800 group-hover:border-[#00E676] transition-all text-xs font-bold shadow-sm">
              <span>Ver detalhes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(dish)}
      className="group relative flex flex-col sm:flex-row sm:items-center justify-between w-full max-w-full overflow-hidden rounded-2xl bg-[#0c100d] border border-zinc-800/90 p-3.5 sm:p-4 transition-all duration-200 hover:border-emerald-500/50 hover:shadow-[0_4px_20px_-5px_rgba(0,230,118,0.15)] active:scale-[0.99] cursor-pointer shadow-md gap-3"
    >
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-brand text-base font-bold text-white transition-colors group-hover:text-[#00E676] leading-snug">
            {dish.name}
          </h3>
          {dish.badges?.slice(0, 2).map((badgeKey) => {
            const badge = BADGE_LABELS[badgeKey];
            if (!badge) return null;
            return (
              <span
                key={badgeKey}
                className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold tracking-wide border ${badge.bg} ${badge.color} ${badge.border} shrink-0`}
              >
                {badge.label}
              </span>
            );
          })}
        </div>

        {dish.description && (
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        )}

        {/* Extra info (serves, quantity, weight, prepTime) */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 font-medium pt-0.5">
          {dish.serves && (
            <span className="inline-flex items-center gap-1 text-zinc-300">
              <Users className="h-3 w-3 text-[#00E676]" />
              <span>{dish.serves}</span>
            </span>
          )}

          {dish.quantity && (
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <Package className="h-3 w-3 text-emerald-400" />
              <span>{dish.quantity}</span>
            </span>
          )}

          {dish.weight && !dish.quantity && (
            <span className="text-zinc-400">
              ⚖️ {dish.weight}
            </span>
          )}

          {dish.prepTime && (
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <Clock className="h-3 w-3 text-emerald-400" />
              <span>{dish.prepTime}</span>
            </span>
          )}
        </div>

        {dish.secondaryPrice && (
          <div className="text-[11px] text-zinc-300 font-medium pt-0.5">
            <span>{dish.secondaryPrice.label}: </span>
            <strong className="text-[#00E676] font-bold">
              R$ {dish.secondaryPrice.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </strong>
          </div>
        )}
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60 shrink-0">
        <div className="flex flex-col sm:items-end">
          <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 sm:text-right">Valor</span>
          <div className="flex items-baseline font-brand font-black text-[#00E676] tracking-tight">
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-400/90 mr-0.5 select-none">R$</span>
            <span className="text-lg sm:text-xl font-black">
              {dish.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {dish.priceUnit && (
              <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 ml-1">
                {dish.priceUnit}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-zinc-900 group-hover:bg-[#00E676] px-2.5 py-1.5 text-zinc-300 group-hover:text-black border border-zinc-800 group-hover:border-[#00E676] transition-all text-xs font-bold shadow-sm">
          <span>Ver detalhes</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </article>
  );
};

