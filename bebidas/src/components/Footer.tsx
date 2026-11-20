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
          {/* Brand Column with exact Header logo */}
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
              Bebidas selecionadas, doses nobres, drinks e as melhores mesas de sinuca.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            {/* Horários de Funcionamento */}
            <div className="space-y-2 rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-3.5">
              <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[10px]">
                <Clock className="h-3.5 w-3.5 text-[#00E676]" />
                <span>Horário de Funcionamento</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between items-center py-0.5 border-b border-zinc-900">
                  <span className="text-zinc-400">Segunda a Quinta:</span>
                  <span className="font-semibold text-zinc-200">18:00 às 03:00</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-zinc-900">
                  <span className="text-zinc-400">Sexta:</span>
                  <span className="font-semibold text-zinc-200">18:00 às 04:00</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-zinc-900">
                  <span className="text-zinc-400">Sábado:</span>
                  <span className="font-semibold text-zinc-200">15:00 às 04:00</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-zinc-400">Domingo:</span>
                  <span className="font-semibold text-zinc-200">15:00 às 03:00</span>
                </div>
              </div>
            </div>

            {/* Redes & Wi-Fi */}
            <div className="flex flex-col justify-between rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-3.5 space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[10px]">
                  <Instagram className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Instagram</span>
                </div>
                <p className="text-zinc-400 text-[11px]">Acompanhe as novidades e torneios:</p>
                <a
                  href="https://www.instagram.com/blackballsinuca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-200 hover:text-[#00E676] font-semibold text-xs transition-colors inline-block"
                >
                  @blackballsinuca
                </a>
              </div>

              <div className="space-y-1.5 pt-2.5 border-t border-zinc-900">
                <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[10px]">
                  <Wifi className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>Wi-Fi da Casa</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenWifiModal}
                  className="inline-flex items-center gap-1 text-[#00E676] hover:underline text-[11px] font-bold"
                >
                  <span>Conectar ao Wi-Fi</span>
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
            <span>Cardápio de Bebidas</span>
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
