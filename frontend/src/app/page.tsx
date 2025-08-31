import { HeroSection } from '@/components/hero-section';
import { BentoSection } from '@/components/bento-section';
import { HowItWorks } from '@/components/how-it-works';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BentoSection />
      <HowItWorks />
    </main>
  );
}
