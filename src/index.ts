/**
 * @z-os/desktop v4.2.0 - zOS Desktop Environment
 */

// Desktop
export { default as ZDesktop } from './ZDesktop';

// Dock
export { default as ZDock } from './ZDock';
export { default as DockItem } from './DockItem';

// Menu Bar
export { default as ZMenuBar } from './ZMenuBar';

// Search & Navigation
export { default as SpotlightSearch } from './SpotlightSearch';
export { default as AppSwitcher } from './AppSwitcher';

// Settings
export { default as DesktopSettings } from './DesktopSettings';

// Screens
export { default as LockScreen } from './LockScreen';
export { default as BootSequence } from './BootSequence';

// Context
export { DesktopProvider, useDesktop } from './DesktopContext';

// Types
export * from './types';
