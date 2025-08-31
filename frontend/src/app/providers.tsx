'use client';

import { ReactNode } from 'react';

export const themeColors = {
  primary: '#E51556',
  secondary: '#E51556', 
  background: '#F8F8F8',
  text: '#000000',
  accent: '#E51556',
  gradient: 'linear-gradient(135deg, #E51556 0%, #CC134D 100%)'
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: themeColors.background, minHeight: '100vh' }}>
      {children}
    </div>
  );
}