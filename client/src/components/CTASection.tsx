import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type Language } from '@/lib/i18n';

interface CTASectionProps {
  language: Language;
  onOpenChatbot?: () => void;
}

export default function CTASection({ language, onOpenChatbot }: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-32 bg-background border-t border-border relative overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
          {language === 'en' 
            ? 'Ready to Transform Your Business?' 
            : 'هل أنت مستعد لتحويل عملك؟'}
        </h2>
        <p className="text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-xs sm:text-sm px-4">
          {language === 'en'
            ? "Let's create innovative solutions together."
            : 'لنبتكر حلولاً مبتكرة معاً.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            data-testid="button-cta-primary"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-none transition-colors duration-200"
            onClick={() => onOpenChatbot?.()}
          >
            <span className="flex items-center gap-2">
              {language === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-testid="button-cta-secondary"
            className="border border-border text-foreground hover:border-primary px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-none transition-colors duration-200"
            onClick={() => {
              const element = document.getElementById('services');
              if (element) {
                const offset = 56;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }
            }}
          >
            {language === 'en' ? 'Explore Services' : 'استكشف الخدمات'}
          </Button>
        </div>
      </div>
    </section>
  );
}
