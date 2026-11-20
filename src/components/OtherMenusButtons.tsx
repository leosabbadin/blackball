import React from 'react';

export const OtherMenusButtons: React.FC = () => {
  const menus = [
    {
      id: 'drinks',
      label: 'DRINKS',
      href: 'http://blackballsinuca.com.br/drinks',
    },
    {
      id: 'bebidas',
      label: 'BEBIDAS',
      href: 'http://blackballsinuca.com.br/bebidas',
    },
    {
      id: 'rosh',
      label: 'ROSH',
      href: 'http://blackballsinuca.com.br/rosh',
    },
  ];

  return (
    <section aria-label="Outros Cardápios" className="w-full px-3.5 py-1 sm:px-4">
      <div className="grid grid-cols-3 gap-2">
        {menus.map((menu) => (
          <a
            key={menu.id}
            href={menu.href}
            className="flex items-center justify-center py-2.5 px-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-zinc-300 hover:text-white hover:border-emerald-500/50 hover:bg-zinc-900/90 active:scale-[0.98] transition-all duration-150 shadow-sm group"
          >
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-center group-hover:text-[#00E676] transition-colors">
              {menu.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

