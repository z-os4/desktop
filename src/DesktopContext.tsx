import React, { createContext, useContext } from 'react';
import type { DesktopContextValue } from './types';

const DesktopContext = createContext<DesktopContextValue | null>(null);

export const DesktopProvider: React.FC<{
  value: DesktopContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = (): DesktopContextValue => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
