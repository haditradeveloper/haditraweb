import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language } from '@/lib/i18n';

import slide1 from '@assets/generated_images/Software_engineering_workspace_52fe8ba5.png';
import slide2 from '@assets/generated_images/AI_machine_learning_visualization_22a86411.png';
import slide3 from '@assets/generated_images/Creative_studio_production_setup_196764bc.png';
import slide4 from '@assets/generated_images/IoT_enterprise_automation_11610dcb.png';

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
    const interval = setInterval(nextSlide, 7000);
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
                <Button
                  size="lg"
                  data-testid="button-hero-primary"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-base"
                  onClick={() => console.log('Primary CTA clicked')}
                >
                  {language === 'en' ? 'View Our Work' : 'شاهد أعمالنا'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="button-hero-secondary"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-base"
                  onClick={() => console.log('Secondary CTA clicked')}
                >
                  {language === 'en' ? 'Start Your Project' : 'ابدأ مشروعك'}
                </Button>
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
