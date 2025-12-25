import React from 'react';

interface DockItemProps {
  id: string;
  name: string;
  icon: React.ReactNode | string;
  onClick?: () => void;
  isRunning?: boolean;
  badge?: number;
  size?: number;
  scale?: number;
  onHover?: () => void;
}

const DockItem: React.FC<DockItemProps> = ({
  name,
  icon,
  onClick,
  isRunning,
  badge,
  size = 64,
  scale = 1,
  onHover
}) => {
  const scaledSize = size * scale;

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer transition-all duration-150 group"
      style={{ width: scaledSize, height: scaledSize }}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      {/* Tooltip */}
      <div className="absolute -top-8 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {name}
      </div>

      {/* Icon */}
      <div
        className="rounded-xl overflow-hidden shadow-lg transition-transform duration-150"
        style={{ width: scaledSize, height: scaledSize }}
      >
        {typeof icon === 'string' ? (
          <img src={icon} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl">
            {icon}
          </div>
        )}
      </div>

      {/* Running indicator */}
      {isRunning && (
        <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
      )}

      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <div className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </div>
      )}
    </div>
  );
};

export default DockItem;
