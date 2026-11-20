import React from 'react';

interface OtherMenusButtonsProps {
  onSelectMenu?: (menuName: string) => void;
}

export const OtherMenusButtons: React.FC<OtherMenusButtonsProps> = ({ onSelectMenu }) => {
  const menus = [
    {
      id: 'comidas',
      label: 'COMIDAS',
      href: 'http://blackballsinuca.com.br/comidas',
    },
    {
      id: 'drinks',
      label: 'DRINKS',
      href: 'http://blackballsinuca.com.br/drinks',
    },
    {
      id: 'rosh',
      label: 'ROSH',
      href: 'http://blackballsinuca.com.br/rosh',
    },
  ];

  const handleClick = (e: React.MouseEvent, menu: typeof menus[0]) => {
    if (onSelectMenu) {
      e.preventDefault();
      onSelectMenu(menu.label);
    }
  };

  return (
    <section aria-label="Outros Cardápios" className="w-full px-3.5 py-1 sm:px-4">
      <div className="grid grid-cols-3 gap-2">
        {menus.map((menu) => (
          <a
            key={menu.id}
            href={menu.href}
            onClick={(e) => handleClick(e, menu)}
            className="flex items-center justify-center py-2 px-1.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 text-zinc-300 hover:text-white hover:border-emerald-500/40 hover:bg-zinc-900/80 active:scale-[0.98] transition-all duration-150"
          >
            <span className="text-[11px] font-bold tracking-wider text-center">
              {menu.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

