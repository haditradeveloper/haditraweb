import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language } from '@/lib/i18n';

import slide1 from '@assets/images/hero/Software_engineering_workspace_52fe8ba5.png';
import slide2 from '@assets/images/hero/AI_machine_learning_visualization_22a86411.png';
import slide3 from '@assets/images/hero/Creative_studio_production_setup_196764bc.png';
import slide4 from '@assets/images/hero/IoT_enterprise_automation_11610dcb.png';

interface HeroSliderProps {
  language: Language;
}

const slides = [
  { id: 1, image: slide1, key: 'slide1' },
  { id: 2, image: slide2, key: 'slide2' },
  { id: 3, image: slide3, key: 'slide3' },
  { id: 4, image: slide4, key: 'slide4' }
];

export default function HeroSlider({ language }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slideContent = {
    en: [
      {
        category: "SOFTWARE ENGINEERING EXCELLENCE",
        title: "Transform Your Vision",
        subtitle: "Into Digital Reality",
        description: "Enterprise-grade software solutions including ERP, HRMS, Payment Systems & E-Commerce Platforms"
      },
      {
        category: "ARTIFICIAL INTELLIGENCE & ML",
        title: "Powered By Intelligence",
        subtitle: "Driven By Innovation",
        description: "Advanced AI solutions with Machine Learning, Predictive Analytics & Smart Systems"
      },
      {
        category: "CREATIVE STUDIO SERVICES",
        title: "Where Technology",
        subtitle: "Meets Creativity",
        description: "Professional Photography, Video Production, 3D Animation & AR/VR Development"
      },
      {
        category: "ENTERPRISE AUTOMATION",
        title: "Automation That",
        subtitle: "Transforms Business",
        description: "IoT Integration, Smart Systems & RPA Solutions for Operational Excellence"
      }
    ],
    ar: [
      {
        category: "التميز في هندسة البرمجيات",
        title: "حوّل رؤيتك",
        subtitle: "إلى واقع رقمي",
        description: "حلول برمجية على مستوى المؤسسات بما في ذلك أنظمة تخطيط الموارد والموارد البشرية والدفع والتجارة الإلكترونية"
      },
      {
        category: "الذكاء الاصطناعي والتعلم الآلي",
        title: "مدعوم بالذكاء",
        subtitle: "مدفوع بالابتكار",
        description: "حلول ذكاء اصطناعي متقدمة مع التعلم الآلي والتحليلات التنبؤية والأنظمة الذكية"
      },
      {
        category: "خدمات الاستوديو الإبداعي",
        title: "حيث تلتقي التكنولوجيا",
        subtitle: "بالإبداع",
        description: "تصوير احترافي، إنتاج فيديو، رسوم متحركة ثلاثية الأبعاد وتطوير الواقع المعزز والافتراضي"
      },
      {
        category: "أتمتة المؤسسات",
        title: "أتمتة تحول",
        subtitle: "الأعمال",
        description: "تكامل إنترنت الأشياء والأنظمة الذكية وحلول RPA للتميز التشغيلي"
      }
    ]
  };

  const content = slideContent[language][currentIndex];

  return (
    <section 
      id="home"
      className="relative w-full h-screen overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src={slides[currentIndex].image} 
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/60" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-400/20 backdrop-blur-2xl border border-blue-500/30">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-sm lg:text-base text-white tracking-[0.2em] uppercase font-bold">
                    {content.category}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              >
                {content.title}
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  {content.subtitle}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg lg:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                {content.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    data-testid="button-hero-primary"
                    className="group relative bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-5 text-base font-semibold rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 overflow-hidden"
                    onClick={() => console.log('Primary CTA clicked')}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {language === 'en' ? 'View Our Work' : 'شاهد أعمالنا'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    data-testid="button-hero-secondary"
                    className="group relative border-2 border-white/40 text-white hover:border-white/60 hover:bg-white/10 backdrop-blur-md px-8 py-5 text-base font-semibold rounded-full transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-white/10 bg-white/5"
                    onClick={() => console.log('Secondary CTA clicked')}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {language === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            data-testid={`button-slide-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-12 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <Button
        size="icon"
        variant="ghost"
        data-testid="button-prev-slide"
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/10 backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        data-testid="button-next-slide"
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/10 backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>
    </section>
  );
}
