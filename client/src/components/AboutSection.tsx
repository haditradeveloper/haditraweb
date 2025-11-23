import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';
import { type Language } from '@/lib/i18n';
import BackgroundGraphics from '@/components/BackgroundGraphics';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const content = {
    en: {
      subtitle: 'About Us',
      title: 'Transforming Ideas Into Reality',
      description: 'Founded in 2020, Heditra has grown into a leading technology and creative solutions provider. We combine technical excellence with creative innovation to deliver exceptional results for our clients across the UAE and beyond.',
      mission: {
        title: 'Our Mission',
        text: 'To empower businesses with cutting-edge technology and creative solutions that drive growth, efficiency, and innovation.'
      },
      values: [
        {
          icon: Target,
          title: 'Innovation First',
          description: 'We stay ahead of technology trends to deliver future-ready solutions'
        },
        {
          icon: Users,
          title: 'Client-Centric',
          description: 'Your success is our success. We build lasting partnerships'
        },
        {
          icon: Award,
          title: 'Quality Excellence',
          description: 'Every project meets the highest standards of quality and performance'
        },
        {
          icon: Zap,
          title: 'Agile Delivery',
          description: 'Fast, flexible, and responsive to your evolving needs'
        }
      ],
      team: {
        title: 'Expert Team',
        description: '50+ professionals including software engineers, AI specialists, creative directors, and project managers'
      }
    },
    ar: {
      subtitle: 'من نحن',
      title: 'تحويل الأفكار إلى واقع',
      description: 'تأسست حديترا في عام 2020، ونمت لتصبح مزودًا رائدًا للحلول التقنية والإبداعية. نجمع بين التميز التقني والابتكار الإبداعي لتقديم نتائج استثنائية لعملائنا في جميع أنحاء الإمارات وخارجها.',
      mission: {
        title: 'مهمتنا',
        text: 'تمكين الشركات بالتكنولوجيا المتطورة والحلول الإبداعية التي تدفع النمو والكفاءة والابتكار.'
      },
      values: [
        {
          icon: Target,
          title: 'الابتكار أولاً',
          description: 'نبقى في صدارة اتجاهات التكنولوجيا لتقديم حلول جاهزة للمستقبل'
        },
        {
          icon: Users,
          title: 'التركيز على العميل',
          description: 'نجاحك هو نجاحنا. نحن نبني شراكات دائمة'
        },
        {
          icon: Award,
          title: 'التميز في الجودة',
          description: 'كل مشروع يلبي أعلى معايير الجودة والأداء'
        },
        {
          icon: Zap,
          title: 'التسليم السريع',
          description: 'سريع ومرن ومستجيب لاحتياجاتك المتطورة'
        }
      ],
      team: {
        title: 'فريق خبراء',
        description: 'أكثر من 50 محترفًا بما في ذلك مهندسو برمجيات وأخصائيو ذكاء اصطناعي ومدراء إبداعيين ومدراء مشاريع'
      }
    }
  };

  const c = content[language];

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-background border-t border-border overflow-hidden">
      <BackgroundGraphics variant="default" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-xs uppercase tracking-wider mb-4">
            {c.subtitle}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            {c.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
            {c.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            className="bg-primary p-10 text-primary-foreground"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-12 h-12 bg-white/20 flex items-center justify-center mb-6"
              initial={{ rotate: -180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Target className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3">{c.mission.title}</h3>
            <p className="text-foreground/90 leading-relaxed text-sm">{c.mission.text}</p>
          </motion.div>

          <motion.div 
            className="bg-card border border-border p-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
          >
            <motion.div 
              className="w-12 h-12 bg-primary/20 flex items-center justify-center mb-6"
              initial={{ rotate: 180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Users className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold text-foreground mb-3">{c.team.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{c.team.description}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.values.map((value, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-10 h-10 bg-primary/20 flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1 + 0.2,
                  type: "spring"
                }}
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: 'hsl(var(--primary) / 0.3)'
                }}
              >
                <value.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <h4 className="text-base font-semibold text-foreground mb-2">{value.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
