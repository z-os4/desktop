import React, { useState } from 'react';
import type { MenuBarMenu } from './types';

interface ZMenuBarProps {
  menus?: MenuBarMenu[];
  appName?: string;
  className?: string;
}

const defaultMenus: MenuBarMenu[] = [
  {
    title: 'File',
    items: [
      { label: 'New Window', shortcut: '⌘N' },
      { label: 'Close Window', shortcut: '⌘W' },
      { separator: true },
      { label: 'Quit', shortcut: '⌘Q' }
    ]
  },
  {
    title: 'Edit',
    items: [
      { label: 'Undo', shortcut: '⌘Z' },
      { label: 'Redo', shortcut: '⇧⌘Z' },
      { separator: true },
      { label: 'Cut', shortcut: '⌘X' },
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' }
    ]
  },
  {
    title: 'View',
    items: [
      { label: 'Toggle Full Screen', shortcut: '⌃⌘F' }
    ]
  },
  {
    title: 'Window',
    items: [
      { label: 'Minimize', shortcut: '⌘M' },
      { label: 'Zoom' }
    ]
  },
  {
    title: 'Help',
    items: [
      { label: 'zOS Help' }
    ]
  }
];

const ZMenuBar: React.FC<ZMenuBarProps> = ({ menus = defaultMenus, appName = 'Finder', className }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className={`fixed top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-xl flex items-center justify-between px-4 text-white text-sm ${className || ''}`}>
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Apple logo */}
        <button className="hover:bg-white/10 px-2 py-0.5 rounded">

        </button>

        {/* App name */}
        <span className="font-semibold">{appName}</span>

        {/* Menus */}
        {menus.map(menu => (
          <div
            key={menu.title}
            className="relative"
            onMouseEnter={() => openMenu && setOpenMenu(menu.title)}
          >
            <button
              className={`px-2 py-0.5 rounded ${openMenu === menu.title ? 'bg-blue-500' : 'hover:bg-white/10'}`}
              onClick={() => setOpenMenu(openMenu === menu.title ? null : menu.title)}
            >
              {menu.title}
            </button>

            {openMenu === menu.title && (
              <div className="absolute top-full left-0 mt-1 min-w-48 bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-xl py-1 z-50">
                {menu.items.map((item, idx) =>
                  item.separator ? (
                    <div key={idx} className="border-t border-gray-600 my-1" />
                  ) : (
                    <button
                      key={idx}
                      className="w-full px-4 py-1 text-left hover:bg-blue-500 flex justify-between items-center disabled:opacity-50"
                      onClick={() => { item.onClick?.(); setOpenMenu(null); }}
                      disabled={item.disabled}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && <span className="text-gray-400 ml-4">{item.shortcut}</span>}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center gap-3">
        <span>🔋</span>
        <span>📶</span>
        <span>{dateString}</span>
        <span>{timeString}</span>
      </div>

      {/* Click outside to close */}
      {openMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenu(null)}
        />
      )}
    </div>
  );
};

export default ZMenuBar;
