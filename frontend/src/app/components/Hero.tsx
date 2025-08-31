"use client";
import { useRouter } from "next/navigation";
import { themeColors } from "@/app/providers";

export default function Hero() {
    const router = useRouter();

    const handleGetStarted = () => {
      router.push('/services/food-delivery');
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: themeColors.background }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight" style={{ color: themeColors.text }}>
            AcePay
          </h1>

          <p className="text-xl max-w-2xl mx-auto" style={{ color: themeColors.text + 'CC' }}>
            Pay with crypto for real-world services
          </p>

          <button
            onClick={handleGetStarted}
            className="px-8 py-4 text-lg rounded-xl transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
              color: 'white',
            }}
          >
            Order Food with Crypto
          </button>
        </div>
      </div>
    </div>
  )
}