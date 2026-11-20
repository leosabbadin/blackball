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
          {/* Brand Column with identical Header Logo */}
          <div className="space-y-3">
            <div className="flex items-center">
              <img
                src={blackballLogo}
                alt="BlackBall Sinuca Bar"
                className="h-10 sm:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Gastronomia de alta qualidade, porções generosas e as melhores mesas de sinuca da região.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* Horários de Funcionamento Detalhados */}
            <div className="space-y-2 rounded-xl bg-zinc-950/60 border border-zinc-850 p-3.5">
              <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
                <Clock className="h-3.5 w-3.5 text-[#00E676]" />
                <span>Horários de Funcionamento</span>
              </div>
              
              <div className="space-y-1.5 text-[11.5px] pt-1">
                <div className="flex items-center justify-between gap-2 border-b border-zinc-900/80 pb-1">
                  <span className="text-zinc-400">Segunda a Quinta</span>
                  <span className="text-zinc-200 font-semibold font-mono text-[11px]">18:00 às 03:00</span>
                </div>
                <div className="flex items-center justify-between gap-2 border-b border-zinc-900/80 pb-1">
                  <span className="text-zinc-400">Sexta</span>
                  <span className="text-zinc-200 font-semibold font-mono text-[11px]">18:00 às 04:00</span>
                </div>
                <div className="flex items-center justify-between gap-2 border-b border-zinc-900/80 pb-1">
                  <span className="text-zinc-400">Sábado</span>
                  <span className="text-zinc-200 font-semibold font-mono text-[11px]">15:00 às 04:00</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-zinc-400">Domingo</span>
                  <span className="text-zinc-200 font-semibold font-mono text-[11px]">15:00 às 03:00</span>
                </div>
              </div>
            </div>

            {/* Redes, Wi-Fi & Contato */}
            <div className="flex flex-col justify-between gap-3 rounded-xl bg-zinc-950/60 border border-zinc-850 p-3.5">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
                  <Instagram className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Siga no Instagram</span>
                </div>
                <a
                  href="https://www.instagram.com/blackballsinuca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-300 hover:text-[#00E676] font-medium text-[12px] transition-colors"
                >
                  @blackballsinuca
                </a>
              </div>

              <div className="pt-2 border-t border-zinc-900/80">
                <button
                  type="button"
                  onClick={onOpenWifiModal}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900/90 border border-zinc-800 px-3 py-2 text-zinc-200 hover:border-emerald-500/50 hover:text-[#00E676] text-xs font-semibold transition-all active:scale-[0.98]"
                >
                  <Wifi className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Acessar Wi-Fi da Casa</span>
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
            <span>Cardápio de Comidas</span>
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
