import React from 'react';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { Dish } from '../types';
import { BADGE_LABELS } from '../data/menuData';

interface DishCardProps {
  dish: Dish;
  onSelect: (dish: Dish) => void;
  priority?: boolean;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onSelect,
}) => {
  return (
    <article
      onClick={() => onSelect(dish)}
      className="group relative flex flex-col w-full max-w-full overflow-hidden rounded-2xl bg-[#0c100d] border border-zinc-800/90 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_6px_25px_-5px_rgba(0,230,118,0.2)] active:scale-[0.99] cursor-pointer shadow-md"
    >
      {/* DISH CONTENT & INFORMATION */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4 space-y-2.5">
        <div className="space-y-1.5">
          {/* Badges and serves pills if present */}
          {((dish.badges && dish.badges.length > 0) || dish.serves) && (
            <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
              {dish.badges?.slice(0, 2).map((badgeKey) => {
                const badge = BADGE_LABELS[badgeKey];
                if (!badge) return null;
                return (
                  <span
                    key={badgeKey}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-wide border ${badge.bg} ${badge.color} ${badge.border}`}
                  >
                    {badge.label}
                  </span>
                );
              })}
              {dish.serves && (
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold text-zinc-300 border border-zinc-800">
                  <Users className="h-2.5 w-2.5 text-[#00E676]" />
                  <span>{dish.serves}</span>
                </span>
              )}
            </div>
          )}

          <div className="flex items-start justify-between gap-2">
            <h3 className="font-brand text-base sm:text-lg font-bold text-white transition-colors group-hover:text-[#00E676] leading-snug">
              {dish.name}
            </h3>
          </div>

          {dish.description && (
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {dish.description}
            </p>
          )}
        </div>

        {/* Quantity, Weight & Details if available */}
        {(dish.quantity || dish.weight || dish.prepTime) && (
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-zinc-400">
            {dish.quantity && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2 py-0.5 text-zinc-300 border border-zinc-800">
                <span className="text-emerald-400">📦</span>
                <span>{dish.quantity}</span>
              </span>
            )}
            {dish.weight && !dish.quantity && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-900 px-2 py-0.5 text-zinc-300 border border-zinc-800">
                <span>⚖️ {dish.weight}</span>
              </span>
            )}
            {dish.prepTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-emerald-400" />
                {dish.prepTime}
              </span>
            )}
          </div>
        )}

        {/* PRICE & EXPLORE ACTION FOOTER */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">Valor</span>
            <div className="flex items-baseline font-brand font-black text-[#00E676] tracking-tight">
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-400/90 mr-0.5 select-none">R$</span>
              <span className="text-lg sm:text-xl font-black">{dish.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              {dish.priceUnit && (
                <span className="text-[11px] font-bold text-zinc-400 ml-1 select-none">{dish.priceUnit}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-zinc-900 group-hover:bg-[#00E676] px-3 py-1.5 text-zinc-300 group-hover:text-black border border-zinc-800 group-hover:border-[#00E676] transition-all text-xs font-bold shadow-sm">
            <span>Ver detalhes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
