/**
 * @z-os/desktop v4.2.0 - Type definitions
 */

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode | string;
  onClick?: () => void;
  isRunning?: boolean;
  badge?: number;
}

export interface MenuItem {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
}

export interface MenuBarMenu {
  title: string;
  items: MenuItem[];
}

export interface DesktopSettings {
  theme: 'light' | 'dark' | 'auto';
  accentColor: string;
  wallpaper: string;
  dockPosition: 'bottom' | 'left' | 'right';
  dockSize: number;
  dockMagnification: boolean;
  dockAutoHide: boolean;
}

export interface DesktopContextValue {
  windows: WindowState[];
  activeWindowId: string | null;
  settings: DesktopSettings;
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateSettings: (settings: Partial<DesktopSettings>) => void;
}

export interface SpotlightResult {
  id: string;
  type: 'app' | 'file' | 'setting' | 'web';
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action: () => void;
}
