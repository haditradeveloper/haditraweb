import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';
import { type Language } from '@/lib/i18n';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const content = {
    en: {
      subtitle: 'About Us',
      title: 'Transforming Ideas Into Reality',
      description: 'Founded in 2020, Haditra has grown into a leading technology and creative solutions provider. We combine technical excellence with creative innovation to deliver exceptional results for our clients across the UAE and beyond.',
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
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 font-semibold mb-3 uppercase tracking-wider text-sm">
            {c.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {c.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {c.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 lg:p-12 text-white"
          >
            <Target className="w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">{c.mission.title}</h3>
            <p className="text-white/90 text-lg leading-relaxed">{c.mission.text}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 rounded-lg p-8 lg:p-12"
          >
            <Users className="w-12 h-12 mb-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{c.team.title}</h3>
            <p className="text-slate-600 text-lg leading-relaxed">{c.team.description}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-slate-200 rounded-lg p-6 hover-elevate"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
