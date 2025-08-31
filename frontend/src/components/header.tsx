'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Wallet, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnectWallet = () => {
    open();
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AcePay</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Wallet & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {address ? formatAddress(address) : ''}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleDisconnectWallet}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={handleConnectWallet}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/20"
            >
              <div className="py-4 space-y-4">
                <nav className="space-y-3">
                  <a
                    href="#services"
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </a>
                  <a
                    href="#how-it-works"
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How it Works
                  </a>
                  <a
                    href="#pricing"
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </a>
                </nav>

                <div className="pt-4 border-t border-border/20 space-y-3">
                  {isConnected ? (
                    <>
                      <Badge variant="outline" className="flex items-center gap-2 w-fit">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        {address ? formatAddress(address) : ''}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={handleDisconnectWallet} className="w-full">
                        Disconnect Wallet
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={handleConnectWallet} className="w-full">
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}