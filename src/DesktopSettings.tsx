import React from 'react';
import { useDesktop } from './DesktopContext';

interface DesktopSettingsProps {
  className?: string;
}

const wallpapers = [
  '/wallpapers/default.jpg',
  '/wallpapers/dark.jpg',
  '/wallpapers/gradient.jpg',
  '/wallpapers/abstract.jpg'
];

const accentColors = [
  { name: 'Blue', value: '#007AFF' },
  { name: 'Purple', value: '#5856D6' },
  { name: 'Pink', value: '#FF2D55' },
  { name: 'Red', value: '#FF3B30' },
  { name: 'Orange', value: '#FF9500' },
  { name: 'Yellow', value: '#FFCC00' },
  { name: 'Green', value: '#34C759' }
];

const DesktopSettings: React.FC<DesktopSettingsProps> = ({ className }) => {
  const { settings, updateSettings } = useDesktop();

  return (
    <div className={`p-6 space-y-6 ${className || ''}`}>
      {/* Theme */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Appearance</h3>
        <div className="grid grid-cols-3 gap-4">
          {(['light', 'dark', 'auto'] as const).map(theme => (
            <button
              key={theme}
              onClick={() => updateSettings({ theme })}
              className={`p-4 rounded-lg text-center capitalize ${
                settings.theme === theme
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Accent Color</h3>
        <div className="flex gap-2">
          {accentColors.map(color => (
            <button
              key={color.value}
              onClick={() => updateSettings({ accentColor: color.value })}
              className={`w-8 h-8 rounded-full transition-transform ${
                settings.accentColor === color.value ? 'ring-2 ring-white scale-110' : ''
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Wallpaper */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Wallpaper</h3>
        <div className="grid grid-cols-4 gap-2">
          {wallpapers.map(wp => (
            <button
              key={wp}
              onClick={() => updateSettings({ wallpaper: wp })}
              className={`aspect-video rounded-lg overflow-hidden ${
                settings.wallpaper === wp ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img src={wp} alt="Wallpaper" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Dock Settings */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Dock</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between text-gray-300">
            <span>Size</span>
            <input
              type="range"
              min="32"
              max="128"
              value={settings.dockSize}
              onChange={e => updateSettings({ dockSize: Number(e.target.value) })}
              className="w-32"
            />
          </label>
          <label className="flex items-center justify-between text-gray-300">
            <span>Magnification</span>
            <input
              type="checkbox"
              checked={settings.dockMagnification}
              onChange={e => updateSettings({ dockMagnification: e.target.checked })}
              className="w-5 h-5"
            />
          </label>
          <label className="flex items-center justify-between text-gray-300">
            <span>Auto Hide</span>
            <input
              type="checkbox"
              checked={settings.dockAutoHide}
              onChange={e => updateSettings({ dockAutoHide: e.target.checked })}
              className="w-5 h-5"
            />
          </label>
          <label className="flex items-center justify-between text-gray-300">
            <span>Position</span>
            <select
              value={settings.dockPosition}
              onChange={e => updateSettings({ dockPosition: e.target.value as 'bottom' | 'left' | 'right' })}
              className="bg-gray-700 rounded px-2 py-1"
            >
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DesktopSettings;
