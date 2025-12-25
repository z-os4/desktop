# @z-os/desktop

[![npm version](https://img.shields.io/npm/v/@z-os/desktop.svg)](https://www.npmjs.com/package/@z-os/desktop)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://z-os4.github.io/desktop/)
[![CI](https://github.com/z-os4/desktop/actions/workflows/ci.yml/badge.svg)](https://github.com/z-os4/desktop/actions/workflows/ci.yml)

zOS Desktop Environment - Complete macOS-style desktop for the web. v4.2.0

**[📚 Full Documentation](https://z-os4.github.io/desktop/)**

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
