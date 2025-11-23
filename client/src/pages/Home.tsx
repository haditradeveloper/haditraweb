import { useState, useCallback, lazy, Suspense, memo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Navigation from '@/components/Navigation';
import HeroSlider from '@/components/HeroSlider';
import StatsSection from '@/components/StatsSection';
import { type Language } from '@/lib/i18n';

const ServicesSection = lazy(() => import('@/components/ServicesSection'));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const Footer = lazy(() => import('@/components/Footer'));
const ChatbotWidget = lazy(() => import('@/components/ChatbotWidget'));

const SectionLoader = memo(() => (
  <div className="min-h-[400px] flex items-center justify-center" aria-label="Loading section" role="status">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" aria-hidden="true" />
    <span className="sr-only">Loading content</span>
  </div>
));
SectionLoader.displayName = 'SectionLoader';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleOpenChatbot = useCallback(() => {
    setIsChatbotOpen(true);
  }, []);

  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Navigation language={language} onLanguageChange={setLanguage} />
      </ErrorBoundary>
      <ErrorBoundary>
        <HeroSlider language={language} onOpenChatbot={handleOpenChatbot} />
      </ErrorBoundary>
      <ErrorBoundary>
        <StatsSection language={language} />
      </ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <ErrorBoundary>
          <ServicesSection language={language} />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ErrorBoundary>
          <PortfolioSection language={language} />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ErrorBoundary>
          <AboutSection language={language} />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ErrorBoundary>
          <ContactSection language={language} />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ErrorBoundary>
          <CTASection language={language} onOpenChatbot={handleOpenChatbot} />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={null}>
        <ErrorBoundary>
          <Footer language={language} />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={null}>
        <ErrorBoundary>
          <ChatbotWidget 
            language={language} 
            isOpenExternal={isChatbotOpen}
            onOpenChange={setIsChatbotOpen}
          />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}
