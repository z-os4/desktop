import React, { useState, useCallback } from 'react';
import { DesktopProvider } from './DesktopContext';
import type { DesktopSettings, WindowState } from './types';

interface ZDesktopProps {
  children?: React.ReactNode;
  wallpaper?: string;
  className?: string;
}

const defaultSettings: DesktopSettings = {
  theme: 'dark',
  accentColor: '#007AFF',
  wallpaper: '/wallpapers/default.jpg',
  dockPosition: 'bottom',
  dockSize: 64,
  dockMagnification: true,
  dockAutoHide: false
};

const ZDesktop: React.FC<ZDesktopProps> = ({ children, wallpaper, className }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [settings, setSettings] = useState<DesktopSettings>({
    ...defaultSettings,
    wallpaper: wallpaper || defaultSettings.wallpaper
  });

  const openWindow = useCallback((appId: string) => {
    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: appId,
      isMinimized: false,
      isMaximized: false,
      isFocused: true,
      position: { x: 100 + Math.random() * 100, y: 50 + Math.random() * 50 },
      size: { width: 800, height: 600 },
      zIndex: windows.length + 1
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(windows[windows.length - 2]?.id || null);
    }
  }, [activeWindowId, windows]);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => ({
      ...w,
      isFocused: w.id === id,
      zIndex: w.id === id ? Math.max(...prev.map(p => p.zIndex)) + 1 : w.zIndex
    })));
    setActiveWindowId(id);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
    ));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const updateSettings = useCallback((updates: Partial<DesktopSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <DesktopProvider value={{
      windows,
      activeWindowId,
      settings,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      updateSettings
    }}>
      <div
        className={`fixed inset-0 overflow-hidden ${className || ''}`}
        style={{
          backgroundImage: `url(${settings.wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {children}
      </div>
    </DesktopProvider>
  );
};

export default ZDesktop;
