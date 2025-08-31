'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { ChevronLeft, ChevronRight, Wallet } from 'lucide-react';
import { useAccount, useDisconnect, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { PriceFeed } from '@/components/PriceFeed';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// TaskEscrow ABI
const TASK_ESCROW_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "address[]", "name": "allowedAgents", "type": "address[]"}
    ],
    "name": "createTask",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

export default function DepositPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('0.1');
  const [isLoading, setIsLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const FLARE_CHAIN_ID = 114;
  const ESCROW_CONTRACT = '0x698AeD7013796240EE7632Bde5f67A7f2A2aA6A5'; // You may need to deploy to Coston2
  const MIN_AMOUNT = '0.01';

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnectWallet = () => {
    open();
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) < parseFloat(MIN_AMOUNT)) {
      alert(`Minimum amount is ${MIN_AMOUNT} C2FLR`);
      return;
    }

    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (chain?.id !== FLARE_CHAIN_ID) {
      try {
        await switchChain({ chainId: FLARE_CHAIN_ID });
      } catch (error) {
        alert('Please switch to Flare Coston2 Testnet');
        return;
      }
    }

    const proceed = confirm(`Deposit ${amount} C2FLR to escrow?`);
    if (!proceed) return;

    try {
      setIsLoading(true);
      
      const selectedService = localStorage.getItem('selectedServiceTitle') || 'Food Delivery';
      
      writeContract({
        address: ESCROW_CONTRACT as `0x${string}`,
        abi: TASK_ESCROW_ABI,
        functionName: 'createTask',
        args: [`Task for ${amount} C2FLR - ${selectedService}`, []],
        value: ethers.parseEther(amount)
      });

    } catch (error: any) {
      console.error('Deposit failed:', error);
      alert('Transaction failed: ' + (error.message || 'Unknown error'));
      setIsLoading(false);
    }
  };

  // Handle transaction success
  useEffect(() => {
    if (isConfirmed) {
      setIsLoading(false);
      alert(`Success! ${amount} C2FLR deposited to escrow.`);
      handleNext();
    }
  }, [isConfirmed]);

  // Handle transaction error
  useEffect(() => {
    if (error) {
      setIsLoading(false);
      console.error('Transaction error:', error);
      alert('Transaction failed: ' + error.message);
    }
  }, [error]);

  const handleBack = () => router.push('/agent/choice');
  const handleNext = () => {
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
      router.push(`/services/${selectedService}`);
    }
  };

  const isNetworkCorrect = chain?.id === FLARE_CHAIN_ID;
  const isProcessing = isPending || isConfirming || isLoading;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center mb-20 relative">
        <h1 className="text-5xl font-bold tracking-tight mb-6 text-center text-foreground">
          <b>Ace</b>Pay
          <span className="text-primary">.</span>
        </h1>

        <div className="mb-4"><PriceFeed /></div>

        <div className="relative w-[400px]">
          <button
            onClick={handleBack}
            className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <Card className="w-full bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Deposit Funds</CardTitle>
              <CardDescription className="text-muted-foreground">
                Deposit C2FLR to create an escrow task on Coston2 testnet.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {!isConnected ? (
                <Button 
                  onClick={handleConnectWallet}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                >
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </Button>
              ) : (
                <>
                  <div className="text-sm mb-2 text-muted-foreground">
                    Connected: {formatAddress(address!)}
                    <br />
                    Network: Flare Coston2 Testnet
                    {!isNetworkCorrect && (
                      <div className="text-yellow-600 mt-1 flex items-center gap-1">
                        <span className="animate-spin">⚡</span>
                        Please switch to Flare Coston2 Testnet
                      </div>
                    )}
                    {isNetworkCorrect && (
                      <div className="text-green-600 mt-1 flex items-center gap-1">
                        ✅ Connected to Flare Coston2 Testnet
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1 text-foreground">
                      Deposit Amount (C2FLR)
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background border-border text-foreground"
                      placeholder={`Min: ${MIN_AMOUNT}`}
                      step="0.01"
                      min={MIN_AMOUNT}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleDeposit}
                      disabled={isProcessing || !isNetworkCorrect}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Wallet className="w-5 h-5" />
                      {isProcessing ? 'Processing...' : 'Create Escrow Task'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={handleDisconnectWallet}
                      className="px-3"
                    >
                      Disconnect
                    </Button>
                  </div>

                  <div className="text-sm text-center mt-2 text-muted-foreground">
                    Funds held securely until task completion
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <button
            onClick={handleNext}
            disabled={!isConnected}
            className={`absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
              isConnected ? 'hover:bg-accent' : 'cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}