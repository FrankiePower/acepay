'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const FTSO_MAINNET = "0x7BDE3Df0624114eDB3A67dFe6753e62f4e7c1d20";
const FTSO_TESTNET = "0x3d893C53D9e8056135C26C8c638B76C8b60Df726";

// Feed IDs from FTSO documentation
const HBAR_USD = "0x01484241522f555344000000000000000000000000";
const FLR_USD = "0x01464c522f55534400000000000000000000000000";

interface PriceData {
  price: string;
  lastUpdated: number;
  error?: string;
}

export function PriceFeed() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getFeedConfig = () => ({
    feedId: FLR_USD,
    symbol: 'FLR',
    name: 'Flare'
  });

  const fetchPrice = async () => {
    const feedConfig = getFeedConfig();
    setIsLoading(true);
    try {
      const provider = new ethers.JsonRpcProvider("https://flare-api.flare.network/ext/C/rpc");
      const ftso = new ethers.Contract(
        FTSO_MAINNET, 
        ["function getFeedByIdInWei(bytes21) external view returns (uint256, uint64)"], 
        provider
      );
      
      const [priceWei, timestamp] = await ftso.getFeedByIdInWei(feedConfig.feedId);
      const price = ethers.formatEther(priceWei);
      
      setPriceData({
        price: parseFloat(price).toFixed(4),
        lastUpdated: Number(timestamp),
        error: undefined
      });
    } catch (error) {
      console.error('Error fetching price:', error);
      setPriceData({
        price: '0.0000',
        lastUpdated: Date.now() / 1000,
        error: 'Failed to fetch price'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
    
    // Update price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const feedConfig = getFeedConfig();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-medium">{feedConfig.symbol}/USD</span>
      </div>
      
      {isLoading ? (
        <span className="animate-pulse text-muted-foreground">Loading...</span>
      ) : priceData?.error ? (
        <span className="text-red-500 text-xs">{priceData.error}</span>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-primary">
            ${priceData?.price}
          </span>
          <span className="text-xs text-muted-foreground">
            {priceData?.lastUpdated && new Date(priceData.lastUpdated * 1000).toLocaleTimeString()}
          </span>
        </div>
      )}
      
      <span className="text-xs text-muted-foreground/60">FTSO</span>
    </div>
  );
} 