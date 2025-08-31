'use client';

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { defineChain } from 'viem';

// Flare Coston2 Testnet configuration
export const flare = defineChain({
  id: 114,
  name: 'Flare Testnet Coston2',
  nativeCurrency: {
    decimals: 18,
    name: 'Coston2 Flare',
    symbol: 'C2FLR',
  },
  rpcUrls: {
    default: {
      http: ['https://coston2-api.flare.network/ext/C/rpc'],
    },
  },
  blockExplorers: {
    default: { name: 'Coston2 Explorer', url: 'https://coston2-explorer.flare.network' },
  },
});

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo-project-id';

// Use demo ID for development - replace with real one for production
const DEMO_PROJECT_ID = 'demo-project-id';
const validProjectId = projectId && projectId !== 'example-project-id' ? projectId : DEMO_PROJECT_ID;

const metadata = {
  name: 'AcePay',
  description: 'AI agents that turn your crypto into real-world services',
  url: 'https://acepay.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [flare],
  projectId: validProjectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
});