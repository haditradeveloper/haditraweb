import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type Language } from '@/lib/i18n';

interface CTASectionProps {
  language: Language;
}

export default function CTASection({ language }: CTASectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5" />
      
      <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {language === 'en' 
              ? 'Ready to Transform Your Business?' 
              : 'هل أنت مستعد لتحويل عملك؟'}
          </h2>
          <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            {language === 'en'
              ? "Let's create innovative solutions together. Book a consultation to discuss your needs."
              : 'لنبتكر حلولاً مبتكرة معاً. احجز استشارة لمناقشة احتياجاتك.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              data-testid="button-cta-primary"
              className="bg-white text-slate-900 hover:bg-white/90 px-8 py-6 text-base font-semibold group"
              onClick={() => console.log('Primary CTA clicked')}
            >
              {language === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="button-cta-secondary"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-base font-semibold"
              onClick={() => console.log('Secondary CTA clicked')}
            >
              {language === 'en' ? 'Explore Services' : 'استكشف الخدمات'}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
