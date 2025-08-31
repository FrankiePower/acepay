'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';

import { config } from '@/config/wagmi';

export const themeColors = {
  primary: '#E51556',
  secondary: '#E51556', 
  background: '#F8F8F8',
  text: '#000000',
  accent: '#E51556',
  gradient: 'linear-gradient(135deg, #E51556 0%, #CC134D 100%)'
};

// Setup queryClient
const queryClient = new QueryClient();

// Create modal
if (typeof window !== 'undefined') {
  createWeb3Modal({
    wagmiConfig: config,
    projectId: 'demo-project-id',
    enableAnalytics: false,
    themeMode: 'light',
    themeVariables: {
      '--w3m-color-mix': '#E51556',
      '--w3m-accent': '#E51556',
      '--w3m-border-radius-master': '12px',
    }
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div style={{ backgroundColor: themeColors.background, minHeight: '100vh' }}>
          {children}
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}