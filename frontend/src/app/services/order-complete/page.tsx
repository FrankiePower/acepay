'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, RefreshCw, Home } from 'lucide-react';

interface TaskCompletion {
  taskId: string;
  completionTx: string;
  chain: string;
  timestamp: string;
}

interface OrderData {
  address: string;
  restaurantName: string;
  item: string;
  timestamp: string;
  status: string;
}

export default function OrderCompletePage() {
  const router = useRouter();
  const [taskCompletion, setTaskCompletion] = useState<TaskCompletion | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Load completion data
    const storedCompletion = localStorage.getItem('taskCompleted');
    const storedOrder = localStorage.getItem('currentOrder');
    
    if (storedCompletion) {
      setTaskCompletion(JSON.parse(storedCompletion));
    }
    
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }
  }, []);

  const handleNewOrder = () => {
    // Clear previous order data
    localStorage.removeItem('currentOrder');
    localStorage.removeItem('taskCompleted');
    localStorage.removeItem('selectedService');
    localStorage.removeItem('selectedServiceTitle');
    
    // Redirect to choice page
    router.push('/agent/choice');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getBlockExplorerUrl = (chain: string, txHash: string) => {
    switch (chain) {
      case 'flare':
        return `https://coston2-explorer.flare.network/tx/${txHash}`;
      case 'hedera':
        return `https://hashscan.io/testnet/transaction/${txHash}`;
      case 'flow':
        return `https://evm.flowscan.org/tx/${txHash}`;
      default:
        return '#';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            <b>Ace</b>Pay
            <span className="text-primary">.</span>
          </h1>
        </div>

        {/* Success Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="w-full bg-card">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">Order Completed!</CardTitle>
                <p className="text-muted-foreground mt-2">Your AI agent has successfully completed the task</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Order Details */}
              {orderData && (
                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Restaurant:</span>
                      <span className="font-medium text-foreground">{orderData.restaurantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Item:</span>
                      <span className="font-medium text-foreground">{orderData.item}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="font-medium text-foreground">{orderData.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Time:</span>
                      <span className="font-medium text-foreground">{formatDate(orderData.timestamp)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Task Completion Details */}
              {taskCompletion && (
                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Blockchain Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Task ID:</span>
                      <span className="font-mono text-sm font-medium text-foreground">#{taskCompletion.taskId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Network:</span>
                      <Badge variant="outline" className="capitalize">{taskCompletion.chain}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transaction:</span>
                      <a 
                        href={getBlockExplorerUrl(taskCompletion.chain, taskCompletion.completionTx)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm font-mono"
                      >
                        {taskCompletion.completionTx.slice(0, 8)}...{taskCompletion.completionTx.slice(-8)}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              <div className="text-center py-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">🎉 Success!</h4>
                  <p className="text-green-700 text-sm">
                    Your order has been placed and payment has been processed securely through the blockchain escrow.
                    You should receive confirmation and tracking information shortly.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleNewOrder}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className="w-4 h-4" />
                  Place Another Order
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleGoHome}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </div>

              {/* Support Info */}
              <div className="text-center pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Need help? Contact our support team with your Task ID: #{taskCompletion?.taskId || 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}