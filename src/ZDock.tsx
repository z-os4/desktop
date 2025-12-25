import React, { useState } from 'react';
import DockItem from './DockItem';
import type { DockItem as DockItemType } from './types';

interface ZDockProps {
  items?: DockItemType[];
  position?: 'bottom' | 'left' | 'right';
  size?: number;
  magnification?: boolean;
  className?: string;
}

const ZDock: React.FC<ZDockProps> = ({
  items = [],
  position = 'bottom',
  size = 64,
  magnification = true,
  className
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getScale = (index: number) => {
    if (!magnification || hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  };

  const positionClasses = {
    bottom: 'bottom-2 left-1/2 -translate-x-1/2 flex-row',
    left: 'left-2 top-1/2 -translate-y-1/2 flex-col',
    right: 'right-2 top-1/2 -translate-y-1/2 flex-col'
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} flex items-end gap-1 p-2 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl ${className || ''}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {items.map((item, index) => (
        <DockItem
          key={item.id}
          {...item}
          size={size}
          scale={getScale(index)}
          onHover={() => setHoveredIndex(index)}
        />
      ))}
    </div>
  );
};

export default ZDock;
