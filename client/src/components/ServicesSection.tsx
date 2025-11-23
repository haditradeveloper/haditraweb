import { motion } from 'framer-motion';
import { Code, Brain, Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language } from '@/lib/i18n';
import BackgroundGraphics from '@/components/BackgroundGraphics';

interface ServicesSectionProps {
  language: Language;
}

export default function ServicesSection({ language }: ServicesSectionProps) {
  const services = {
    en: [
      {
        icon: Code,
        title: 'Software Engineering',
        description: 'Enterprise-grade custom software solutions including payment systems, ERP, HR systems.',
        features: ['Payment Systems', 'ERP & HRMS', 'E-Commerce Platforms']
      },
      {
        icon: Brain,
        title: 'AI & Technologies',
        description: 'Cutting-edge AI, machine learning, IoT systems, and predictive analytics solutions.',
        features: ['Machine Learning', 'IoT Integration', 'Smart Systems']
      },
      {
        icon: Camera,
        title: 'Creative Studio',
        description: 'Professional photography, video production, 3D animation, and AR/VR content.',
        features: ['Video Production', '3D Animation', 'Photography']
      }
    ],
    ar: [
      {
        icon: Code,
        title: 'هندسة البرمجيات',
        description: 'حلول برمجية مخصصة على مستوى المؤسسات بما في ذلك أنظمة الدفع وتخطيط الموارد والموارد البشرية.',
        features: ['أنظمة الدفع', 'تخطيط الموارد والموارد البشرية', 'منصات التجارة الإلكترونية']
      },
      {
        icon: Brain,
        title: 'الذكاء الاصطناعي والتقنيات',
        description: 'حلول ذكاء اصطناعي متطورة وتعلم آلي وأنظمة إنترنت الأشياء وتحليلات تنبؤية.',
        features: ['التعلم الآلي', 'تكامل إنترنت الأشياء', 'الأنظمة الذكية']
      },
      {
        icon: Camera,
        title: 'الاستوديو الإبداعي',
        description: 'تصوير احترافي، إنتاج فيديو، رسوم متحركة ثلاثية الأبعاد ومحتوى الواقع المعزز والافتراضي.',
        features: ['إنتاج الفيديو', 'الرسوم المتحركة ثلاثية الأبعاد', 'التصوير الفوتوغرافي']
      }
    ]
  };

  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 xl:py-32 bg-background border-t border-border overflow-hidden">
      <BackgroundGraphics variant="services" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-xs uppercase tracking-wider mb-3 sm:mb-4">
            {language === 'en' ? 'Our Services' : 'خدماتنا'}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
            <span className="text-foreground">
              {language === 'en' ? 'Explore Our Range of' : 'استكشف مجموعة'}
            </span>
            <br />
            <span className="gradient-text text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              {language === 'en' ? 'SERVICES' : 'الخدمات'}
            </span>
          </h2>
        </motion.div>

        <div className="space-y-12 sm:space-y-14 lg:space-y-16">
          {services[language].map((service, index) => (
            <motion.div
              key={index}
              data-testid={`service-card-${index}`}
              className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 
              }}
              whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
            >
              <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2 + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-foreground" />
              </motion.div>

              <div className="flex-1">
                <motion.h3 
                  className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <span className="text-primary/70 text-base sm:text-lg font-light">
                    {String(index + 1).padStart(2, '0')} -
                  </span>
                  {' '}
                  <span className="text-foreground">
                    {service.title.split(' ').slice(0, -1).join(' ')}
                  </span>
                  {' '}
                  <span className="gradient-text font-extrabold">
                    {service.title.split(' ').slice(-1)[0].toUpperCase()}
                  </span>
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  {service.description}
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {service.features.map((feature, i) => (
                    <motion.span 
                      key={i} 
                      className="text-xs sm:text-sm text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5 + (i * 0.1) }}
                      whileHover={{ color: 'hsl(var(--primary))' }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                  whileHover={{ x: 5 }}
                >
                  <Button
                  variant="ghost"
                  data-testid={`button-service-${index}`}
                  className="text-primary hover:text-primary/80 p-0 h-auto font-medium text-xs group/btn"
                  onClick={() => {
                    const element = document.getElementById('contact');
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
                  {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
                  <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
