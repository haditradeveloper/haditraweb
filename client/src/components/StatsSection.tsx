import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { type Language } from '@/lib/i18n';

interface StatsSectionProps {
  language: Language;
}

function CountUpAnimation({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = end / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <div ref={ref} className="relative">
      <div className="text-6xl lg:text-7xl font-semibold bg-gradient-to-br from-white via-gray-200 to-[#ff6b35] bg-clip-text text-transparent">
        {count}{suffix}
      </div>
    </div>
  );
}

export default function StatsSection({ language }: StatsSectionProps) {
  const stats = {
    en: [
      { value: 500, suffix: '+', label: 'Projects Delivered' },
      { value: 200, suffix: '+', label: 'Happy Clients' },
      { value: 50, suffix: '+', label: 'Team Members' },
      { value: 98, suffix: '%', label: 'Client Satisfaction' }
    ],
    ar: [
      { value: 500, suffix: '+', label: 'مشروع منجز' },
      { value: 200, suffix: '+', label: 'عميل سعيد' },
      { value: 50, suffix: '+', label: 'عضو فريق' },
      { value: 98, suffix: '%', label: 'رضا العملاء' }
    ]
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-32 bg-background border-t border-border relative overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            {language === 'en' ? 'Our Impact' : 'تأثيرنا'}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {language === 'en' ? 'Delivering Excellence Across Industries' : 'تقديم التميز عبر الصناعات'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats[language].map((stat, index) => (
            <div
              key={index}
              data-testid={`stat-${index}`}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                {stat.value}{stat.suffix}
              </div>
              <p className="text-muted-foreground text-[10px] sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
