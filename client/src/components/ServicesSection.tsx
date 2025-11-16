import { motion } from 'framer-motion';
import { Code, Brain, Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Language } from '@/lib/i18n';

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
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 font-semibold mb-3 uppercase tracking-wider text-sm">
            {language === 'en' ? 'Our Services' : 'خدماتنا'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {language === 'en' 
              ? 'Comprehensive Technology & Creative Solutions' 
              : 'حلول تقنية وإبداعية شاملة'}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {language === 'en'
              ? 'From enterprise software to AI-powered systems and professional creative production'
              : 'من برامج المؤسسات إلى الأنظمة المدعومة بالذكاء الاصطناعي والإنتاج الإبداعي الاحترافي'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services[language].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`service-card-${index}`}
              className="bg-white border border-slate-200 rounded-lg p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10 hover-elevate group"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="ghost"
                data-testid={`button-service-${index}`}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold group/btn"
                onClick={() => console.log(`Learn more about ${service.title}`)}
              >
                {language === 'en' ? 'Learn More' : 'اعرف المزيد'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
