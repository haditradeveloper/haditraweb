import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language } from '@/lib/i18n';
import BackgroundGraphics from '@/components/BackgroundGraphics';

import slide1 from '@assets/images/hero/Software_engineering_workspace_52fe8ba5.png';
import slide2 from '@assets/images/hero/AI_machine_learning_visualization_22a86411.png';
import slide3 from '@assets/images/hero/Creative_studio_production_setup_196764bc.png';
import slide4 from '@assets/images/hero/IoT_enterprise_automation_11610dcb.png';

interface HeroSliderProps {
  language: Language;
  onOpenChatbot?: () => void;
}

const NAVIGATION_OFFSET = 48; // Navigation bar height

const slides = [
  { id: 1, image: slide1, key: 'slide1' },
  { id: 2, image: slide2, key: 'slide2' },
  { id: 3, image: slide3, key: 'slide3' },
  { id: 4, image: slide4, key: 'slide4' }
];

export default function HeroSlider({ language, onOpenChatbot }: HeroSliderProps) {
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
        title: "Technology & Creative Excellence",
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

  const services = {
    en: [
      'Software Engineering',
      'AI & Technologies',
      'Creative Studio',
      'Digital Marketing',
      'SEO Management',
      'Social Media',
      'Content Creation',
      'Photography & Video'
    ],
    ar: [
      'هندسة البرمجيات',
      'الذكاء الاصطناعي',
      'الاستوديو الإبداعي',
      'التسويق الرقمي',
      'إدارة SEO',
      'وسائل التواصل',
      'إنشاء المحتوى',
      'التصوير والفيديو'
    ]
  };

  const content = slideContent[language][currentIndex];

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - NAVIGATION_OFFSET;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section 
      id="home"
      className="relative w-full h-screen overflow-hidden bg-background flex flex-col lg:flex-row"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
        {/* Abstract Background Graphics */}
        <BackgroundGraphics variant="hero" className="z-0" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-10"
          >
            <div className="absolute inset-0">
              <motion.img 
                src={slides[currentIndex].image} 
                alt={content.title}
                className="w-full h-full object-cover"
                style={{ 
                  filter: 'brightness(0.3) contrast(1.2) saturate(0.8)',
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              {/* Animated primary color lighting overlay from right */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 z-30">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wider"
                >
                  {language === 'en' ? 'Hi there! this is' : 'مرحباً! هذا هو'}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-3 sm:mb-4 leading-[1.1] tracking-tight"
                >
                  <motion.span 
                    className="block mb-1 sm:mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {content.title}
                  </motion.span>
                  <motion.span 
                    className="block gradient-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {content.subtitle}
                  </motion.span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed max-w-xl"
                >
                  {content.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    data-testid="button-hero-primary"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-medium rounded-none transition-colors duration-200 group"
                    onClick={() => scrollToSection('portfolio')}
                  >
                    <span className="flex items-center gap-2">
                      {language === 'en' ? 'View Our Work' : 'شاهد أعمالنا'}
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      <motion.div 
        className="w-full lg:w-1/4 bg-background/95 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-border px-6 sm:px-8 md:px-10 pt-8 sm:pt-12 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 flex flex-col justify-between relative z-20 overflow-hidden"
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        {/* Animated background gradients - Multiple layers for depth */}
        {/* Primary gradient layer with rotation */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(251, 191, 36, 0.1) 50%, rgba(59, 130, 246, 0.15) 100%)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />

        {/* Secondary gradient layer with pulsing effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.2), rgba(251, 191, 36, 0.15), transparent 60%)',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.15, 0.3, 0.2, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Tertiary gradient layer with wave effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            transformOrigin: 'center center',
            background: 'linear-gradient(54.46deg, transparent 0%, rgba(58, 133, 241, 0.1) 25%, rgba(230, 76, 159, 0.1) 50%, rgba(56, 181, 130, 0.1) 75%, transparent 100%)',
          }}
          animate={{
            rotate: [0, 360],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            },
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />

        {/* Accent gradient overlay with shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.15) 50%, transparent 100%)',
          }}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 2,
          }}
        />

        <div className="relative z-10 text-left">
          <motion.h3 
            className="text-foreground font-medium mb-4 sm:mb-6 text-xs uppercase tracking-wider text-muted-foreground relative"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.1, 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            {language === 'en' ? 'Services' : 'الخدمات'}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            />
          </motion.h3>
          <ul className="space-y-2 sm:space-y-3 mt-2">
            {services[language].slice(0, 4).map((service, index) => (
              <motion.li 
                  key={index} 
                  className="relative text-muted-foreground text-xs sm:text-sm cursor-pointer group text-left"
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ 
                    delay: 0.15 + (index * 0.05),
                    duration: 0.25,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ 
                    x: 8,
                    scale: 1.02,
                    color: "hsl(var(--primary))"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('services')}
                >
                  <span className="relative z-10 block transition-colors duration-200">
                    {service}
                  </span>
                  <motion.div
                    className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2"
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute -left-2 top-1/2 w-1 h-1 rounded-full bg-primary -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 0.3, 
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="ghost"
              className="mb-4 sm:mb-6 text-foreground hover:text-primary p-0 h-auto font-normal text-xs sm:text-sm group relative overflow-hidden"
              onClick={() => onOpenChatbot?.()}
            >
              <motion.span
                className="flex items-center gap-2 relative z-10"
                whileHover={{ x: 2 }}
              >
                {language === 'en' ? "Let's talk" : 'دعنا نتحدث'}
                <motion.div
                  whileHover={{ x: 4, rotate: 0 }}
                  initial={{ rotate: 0 }}
                >
                  <ArrowRight className="w-4 h-4 transition-transform" />
                </motion.div>
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </Button>
          </motion.div>
          <motion.p 
            className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.4, 
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            {language === 'en' 
              ? "Award winning technology and creative solutions provider."
              : 'مزود حلول تقنية وإبداعية حائز على جوائز.'}
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            data-testid={`button-slide-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-200 ${
              index === currentIndex 
                ? 'w-10 h-0.5 bg-primary' 
                : 'w-6 h-0.5 bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
