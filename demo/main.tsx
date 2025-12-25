import React, { useState, useCallback, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles.css';

// Apps
import {
  ZCalculator,
  ZTerminal,
  ZNotes,
  ZTextPad,
  ZClock,
  ZCalendar,
  ZWeather,
  ZPhotos,
  ZMusic,
  ZStickies,
  ZSystemPreferences,
  ZAppStore,
  BUNDLED_APPS,
  getAppRegistry,
} from '@z-os/apps';

// Desktop components
import {
  ZDesktop,
  ZDock,
  ZMenuBar,
  SpotlightSearch,
  BootSequence,
  LockScreen,
} from '../src';

// App component mapping
const APP_COMPONENTS: Record<string, React.FC<any>> = {
  'ai.hanzo.calculator': ZCalculator,
  'ai.hanzo.terminal': ZTerminal,
  'ai.hanzo.notes': ZNotes,
  'ai.hanzo.textpad': ZTextPad,
  'ai.hanzo.clock': ZClock,
  'ai.hanzo.calendar': ZCalendar,
  'ai.hanzo.weather': ZWeather,
  'ai.hanzo.photos': ZPhotos,
  'ai.hanzo.music': ZMusic,
  'ai.hanzo.stickies': ZStickies,
  'ai.hanzo.preferences': ZSystemPreferences,
  'ai.hanzo.appstore': ZAppStore,
};

interface WindowState {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
}

function ZOSDemo() {
  const [booting, setBooting] = useState(false); // Skip boot for testing
  const [locked, setLocked] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+Space for Spotlight
      if (e.metaKey && e.code === 'Space') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
      // Cmd+L for Lock Screen
      if (e.metaKey && e.code === 'KeyL') {
        e.preventDefault();
        setLocked(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openApp = useCallback((appId: string) => {
    const manifest = BUNDLED_APPS.find(a => a.id === appId);
    if (!manifest) return;

    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: manifest.name,
      position: {
        x: 100 + (windows.length * 30) % 200,
        y: 50 + (windows.length * 30) % 150,
      },
      size: { width: 700, height: 500 },
      zIndex: windows.length + 1,
      isMinimized: false,
    };
    setWindows(prev => [...prev, newWindow]);
    setSpotlightOpen(false);
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => ({
      ...w,
      zIndex: w.id === id ? Math.max(...prev.map(p => p.zIndex)) + 1 : w.zIndex,
    })));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  }, []);

  // Boot sequence
  if (booting) {
    return (
      <BootSequence
        onComplete={() => setBooting(false)}
        logo="🍎"
        version="4.2.0"
      />
    );
  }

  // Lock screen
  if (locked) {
    return (
      <LockScreen
        username="User"
        onUnlock={() => setLocked(false)}
        time={time}
      />
    );
  }

  // Dock items
  const dockItems = BUNDLED_APPS.slice(0, 8).map(app => ({
    id: app.id,
    name: app.name,
    icon: app.icon,
    onClick: () => openApp(app.id),
    isRunning: windows.some(w => w.appId === app.id),
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Menu Bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4 text-white text-sm">
          <span className="font-bold">🍎</span>
          <span className="font-semibold">zOS</span>
        </div>
        <div className="text-white text-sm">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          {' '}
          {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>
      </div>

      {/* Windows */}
      {windows.map(win => {
        if (win.isMinimized) return null;
        const AppComponent = APP_COMPONENTS[win.appId];
        if (!AppComponent) return null;

        return (
          <div
            key={win.id}
            className="absolute bg-[#1c1c1c] rounded-xl shadow-2xl overflow-hidden"
            style={{
              left: win.position.x,
              top: win.position.y,
              width: win.size.width,
              height: win.size.height,
              zIndex: win.zIndex,
            }}
            onClick={() => focusWindow(win.id)}
            data-testid={`window-${win.appId}`}
          >
            {/* Title Bar */}
            <div className="h-8 bg-[#2d2d2d] flex items-center px-3 gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
                data-testid="close-button"
              />
              <button
                onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
              />
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
              <span className="flex-1 text-center text-white text-sm">{win.title}</span>
            </div>
            {/* App Content */}
            <div className="h-[calc(100%-32px)]">
              <AppComponent onClose={() => closeWindow(win.id)} />
            </div>
          </div>
        );
      })}

      {/* Spotlight */}
      {spotlightOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-32 z-50">
          <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl w-[600px] shadow-2xl overflow-hidden">
            <input
              type="text"
              placeholder="Spotlight Search"
              className="w-full px-6 py-4 bg-transparent text-white text-xl outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Escape' && setSpotlightOpen(false)}
            />
            <div className="max-h-80 overflow-y-auto">
              {BUNDLED_APPS.map(app => (
                <button
                  key={app.id}
                  onClick={() => openApp(app.id)}
                  className="w-full px-6 py-3 flex items-center gap-4 hover:bg-blue-500/30 text-left"
                  data-testid={`spotlight-${app.id}`}
                >
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <div className="text-white font-medium">{app.name}</div>
                    <div className="text-gray-400 text-sm">{app.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dock */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white/10 backdrop-blur-xl rounded-2xl p-2 z-40">
        {dockItems.map(item => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl hover:scale-110 transition-transform relative"
            title={item.name}
            data-testid={`dock-${item.id}`}
          >
            {item.icon}
            {item.isRunning && (
              <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Mount app
const root = createRoot(document.getElementById('root')!);
root.render(<ZOSDemo />);
