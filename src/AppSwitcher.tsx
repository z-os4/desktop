import React, { useState, useEffect } from 'react';
import { useDesktop } from './DesktopContext';

interface AppSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const AppSwitcher: React.FC<AppSwitcherProps> = ({ isOpen, onClose, className }) => {
  const { windows, focusWindow } = useDesktop();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const runningApps = windows.filter(w => !w.isMinimized);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Tab' && e.metaKey) {
        e.preventDefault();
        if (e.shiftKey) {
          setSelectedIndex(prev => (prev - 1 + runningApps.length) % runningApps.length);
        } else {
          setSelectedIndex(prev => (prev + 1) % runningApps.length);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Meta' && isOpen) {
        if (runningApps[selectedIndex]) {
          focusWindow(runningApps[selectedIndex].id);
        }
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, selectedIndex, runningApps, focusWindow, onClose]);

  if (!isOpen || runningApps.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/30" />
      <div className={`relative flex gap-4 p-4 bg-gray-800/90 backdrop-blur-xl rounded-2xl ${className || ''}`}>
        {runningApps.map((app, index) => (
          <div
            key={app.id}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer ${
              index === selectedIndex ? 'bg-white/20 ring-2 ring-blue-500' : 'hover:bg-white/10'
            }`}
            onClick={() => { focusWindow(app.id); onClose(); }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
              📱
            </div>
            <span className="text-white text-sm max-w-20 truncate">{app.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSwitcher;
