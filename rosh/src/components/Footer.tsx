import React from 'react';
import { Instagram, Clock, Wifi } from 'lucide-react';
import blackballLogo from '../assets/images/regenerated_image_1787686626321.png';

interface FooterProps {
  onOpenWifiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWifiModal }) => {
  return (
    <footer className="w-full border-t border-emerald-950/60 bg-[#060807] pt-8 pb-12 text-zinc-400">
      <div className="mx-auto max-w-xl px-3.5 sm:px-4">
        <div className="flex flex-col gap-6 pb-6 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="space-y-2">
            <div className="flex items-center">
              <img
                src={blackballLogo}
                alt="BlackBall Sinuca Bar"
                className="h-9 sm:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Essências premium, roshs de qualidade e as melhores mesas de sinuca.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Horários */}
            <div className="space-y-1.5 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900">
              <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[10px]">
                <Clock className="h-3.5 w-3.5 text-[#00E676]" />
                <span>Horários de Funcionamento</span>
              </div>
              <div className="space-y-1 text-[11px] pt-1">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Segunda a Quinta:</span>
                  <span className="font-semibold text-white">18:00 às 03:00</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Sexta:</span>
                  <span className="font-semibold text-white">18:00 às 04:00</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Sábado:</span>
                  <span className="font-semibold text-white">15:00 às 04:00</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Domingo:</span>
                  <span className="font-semibold text-white">15:00 às 03:00</span>
                </div>
              </div>
            </div>

            {/* Redes & Wi-Fi */}
            <div className="space-y-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[10px]">
                  <Instagram className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Instagram</span>
                </div>
                <a
                  href="https://instagram.com/blackballsinuca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-[#00E676] text-xs font-semibold transition-colors block"
                >
                  @blackballsinuca
                </a>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenWifiModal}
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-xs font-semibold bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-all active:scale-95"
                >
                  <Wifi className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Wi-Fi da Casa</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-4 flex flex-col items-center justify-between gap-1.5 text-center text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="font-brand font-bold text-zinc-400">© BlackBall Sinuca Bar</span>
            <span>•</span>
            <span>Cardápio de Essências</span>
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">
            Produzido por{' '}
            <a
              id="lp-marketing-digital-link"
              href="https://www.instagram.com/lpmktdigital_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 font-semibold hover:text-[#00E676] transition-colors underline-offset-2 hover:underline inline-flex items-center gap-1"
            >
              LP Marketing Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
