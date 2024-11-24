import { HeroSection } from '@/components/sections/hero';
import { StatsSection } from '@/components/sections/stats';
import { ServicesSection } from '@/components/sections/services';
import { CTASection } from '@/components/sections/cta';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <CTASection />
    </>
  );
}