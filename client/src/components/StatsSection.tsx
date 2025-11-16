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
    <div ref={ref} className="text-5xl lg:text-6xl font-bold text-blue-600">
      {count}{suffix}
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
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {language === 'en' ? 'Our Impact' : 'تأثيرنا'}
          </h2>
          <p className="text-lg text-slate-600">
            {language === 'en' ? 'Delivering Excellence Across Industries' : 'تقديم التميز عبر الصناعات'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats[language].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`stat-${index}`}
              className="bg-white rounded-lg p-8 text-center hover-elevate"
            >
              <CountUpAnimation end={stat.value} suffix={stat.suffix} />
              <p className="text-slate-600 mt-3 text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
