# @z-os/desktop v4.2.0

zOS Desktop Environment - Complete macOS-style desktop for the web.

## Install
```bash
npm install @z-os/desktop
```

## Components
- ZDesktop - Main desktop container
- ZDock - macOS-style dock with magnification
- ZMenuBar - Global menu bar
- SpotlightSearch - Cmd+Space search
- AppSwitcher - Cmd+Tab app switching
- DesktopSettings - Desktop preferences

## Usage
```tsx
import { ZDesktop, ZDock, ZMenuBar } from '@z-os/desktop';

function App() {
  return (
    <ZDesktop>
      <ZMenuBar />
      <ZDock />
    </ZDesktop>
  );
}
```

## Dependencies
- @z-os/ui - Window components
- @z-os/sdk - App SDK
- @z-os/apps - Built-in applications
