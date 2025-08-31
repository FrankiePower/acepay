'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { FaUtensils, FaPlane, FaTaxi, FaAmazon } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ServicePage() {
  const router = useRouter();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleBack = () => {
    router.push('/');
  };

  const handleServiceClick = (service: string) => {
    if (service === 'Cab Service' || service === 'Amazon') {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 2000);
    } else {
      // Convert service name to URL-safe slug
      const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
      localStorage.setItem('selectedService', serviceSlug);
      localStorage.setItem('selectedServiceTitle', service); // Store original title for display
      router.push('/agent/deposit');
    }
  };

  const services = [
    {
      title: 'Food Delivery',
      icon: <FaUtensils className="w-5 h-5" />,
      description: 'Order your favorite meals',
      color: 'from-[#ff008c] to-[#ff4d4d]',
      hoverColor: 'hover:from-[#ff4d4d] hover:to-[#ff008c]'
    },
    {
      title: 'Flight Booking',
      icon: <FaPlane className="w-5 h-5" />,
      description: 'Book your next journey',
      color: 'from-[#008cff] to-[#00b3ff]',
      hoverColor: 'hover:from-[#00b3ff] hover:to-[#008cff]'
    },
    {
      title: 'Cab Service',
      icon: <FaTaxi className="w-5 h-5" />,
      description: 'Ride with comfort',
      color: 'from-[#00c853] to-[#00e676]',
      hoverColor: 'hover:from-[#00e676] hover:to-[#00c853]'
    },
    {
      title: 'Amazon',
      icon: <FaAmazon className="w-5 h-5" />,
      description: 'Shop everything',
      color: 'from-[#ffa000] to-[#ffb300]',
      hoverColor: 'hover:from-[#ffb300] hover:to-[#ffa000]'
    }
  ];

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center mb-20 relative">
        <h1 className="text-5xl font-bold tracking-tight mb-6 text-center text-foreground">
          <b>Ace</b>Pay
          <span className="text-primary">.</span>
        </h1>

        <div className="relative w-[400px]">
          {/* Back Arrow */}
          <button
            onClick={handleBack}
            className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <Card className="w-full overflow-hidden gap-2 relative bg-card">
            <CardHeader className="z-10">
              <CardTitle className="text-2xl text-foreground">Choose Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceClick(service.title)}
                    className="cursor-pointer transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="rounded-lg p-3 flex flex-col items-center shadow-md h-[120px] bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                      <div className="bg-white/10 rounded-full p-2 mb-2">
                        {service.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-center">{service.title}</h3>
                      <p className="text-xs text-center mt-1 opacity-90">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Toast */}
        {showComingSoon && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 bg-primary text-primary-foreground">
            Coming Soon!
          </div>
        )}
      </div>
    </div>
  );
}