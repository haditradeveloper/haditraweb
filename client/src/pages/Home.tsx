import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSlider from '@/components/HeroSlider';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { type Language } from '@/lib/i18n';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen">
      <Navigation language={language} onLanguageChange={setLanguage} />
      <HeroSlider language={language} />
      <StatsSection language={language} />
      <ServicesSection language={language} />
      <CTASection language={language} />
      <Footer language={language} />
    </div>
  );
}
