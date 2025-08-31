'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { FaUtensils } from 'react-icons/fa';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderDetails {
  address: string;
  addressCoords?: [number, number];
  restaurantName: string;
  item: string;
}

interface StoredOrder extends OrderDetails {
  timestamp: string;
  status: string;
}

export default function FoodDeliveryPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    address: '',
    restaurantName: '',
    item: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Function to get stored order
  const getStoredOrder = (): StoredOrder | null => {
    if (typeof window === 'undefined') return null;
    const storedOrder = localStorage.getItem('currentOrder');
    return storedOrder ? JSON.parse(storedOrder) : null;
  };

  // Example of how to use the stored order
  const handleViewOrder = () => {
    const order = getStoredOrder();
    if (order) {
      console.log('Stored Order:', order);
      // You can access individual fields like:
      console.log('Address:', order.address);
      console.log('Restaurant:', order.restaurantName);
      console.log('Item:', order.item);
      console.log('Order Time:', order.timestamp);
      console.log('Status:', order.status);
    } else {
      console.log('No order found');
    }
  };

  const handleBack = () => {
    router.push('/agent/deposit');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderDetails.address || !orderDetails.restaurantName || !orderDetails.item) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // Store order details in localStorage
      const orderData: StoredOrder = {
        ...orderDetails,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      localStorage.setItem('currentOrder', JSON.stringify(orderData));

      // Redirect to agent page
      router.push('/agent/agent');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSelect = (address: string, coords: [number, number]) => {
    setOrderDetails(prev => ({
      ...prev,
      address: address,
      addressCoords: coords
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-accent transition-colors text-foreground"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-center text-foreground">
            <b>Ace</b>Pay
            <span className="text-primary">.</span>
          </h1>
          <div className="w-10" /> {/* Spacer to balance the back button */}
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="w-full bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-gradient-to-br from-primary to-primary/60">
                  <FaUtensils className="w-5 h-5 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-foreground">Food Delivery</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label 
                      htmlFor="address" 
                      className="block text-sm font-medium mb-1 text-foreground"
                    >
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={orderDetails.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background border border-border text-foreground"
                      placeholder="Enter your delivery address"
                      required
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="restaurantName" 
                      className="block text-sm font-medium mb-1 text-foreground"
                    >
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      id="restaurantName"
                      name="restaurantName"
                      value={orderDetails.restaurantName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background border border-border text-foreground"
                      placeholder="Enter restaurant name"
                      required
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="item" 
                      className="block text-sm font-medium mb-1 text-foreground"
                    >
                      Item to Order
                    </label>
                    <input
                      type="text"
                      id="item"
                      name="item"
                      value={orderDetails.item}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background border border-border text-foreground"
                      placeholder="Enter item name"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg transition-all hover:scale-[1.02] disabled:opacity-70 bg-primary hover:bg-primary/90"
                >
                  {isLoading ? 'Processing...' : 'Send to Agent'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}