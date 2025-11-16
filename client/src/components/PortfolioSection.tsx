import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ExternalLink } from 'lucide-react';
import { type Language } from '@/lib/i18n';

interface PortfolioSectionProps {
  language: Language;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  details: string;
}

export default function PortfolioSection({ language }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Reset category filter when language changes to prevent empty results
  useEffect(() => {
    setSelectedCategory('all');
  }, [language]);

  const categories = {
    en: ['All', 'Software', 'AI', 'Creative'],
    ar: ['الكل', 'البرمجيات', 'الذكاء الاصطناعي', 'الإبداعي']
  };

  const projects: { en: Project[], ar: Project[] } = {
    en: [
      {
        id: 1,
        title: 'Enterprise ERP System',
        category: 'Software',
        description: 'Complete enterprise resource planning solution for manufacturing industry',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        tags: ['ERP', 'Cloud', 'Enterprise'],
        details: 'Developed a comprehensive ERP system handling inventory, HR, finance, and production management for a large manufacturing company with 500+ users.'
      },
      {
        id: 2,
        title: 'AI-Powered CCTV Analytics',
        category: 'AI',
        description: 'Real-time surveillance with computer vision and threat detection',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
        tags: ['AI', 'Computer Vision', 'Security'],
        details: 'Implemented advanced computer vision algorithms for real-time threat detection, facial recognition, and behavioral analysis across 100+ cameras.'
      },
      {
        id: 3,
        title: 'Corporate Brand Video',
        category: 'Creative',
        description: 'High-end corporate video production for Fortune 500 company',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
        tags: ['Video', 'Production', '4K'],
        details: 'Produced a cinematic corporate brand video featuring 4K drone footage, professional interviews, and post-production effects.'
      },
      {
        id: 4,
        title: 'E-Commerce Platform',
        category: 'Software',
        description: 'Multi-vendor marketplace with advanced payment integration',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        tags: ['E-Commerce', 'Payment', 'Mobile'],
        details: 'Built a scalable multi-vendor marketplace supporting 1000+ sellers with integrated payment gateway, inventory management, and mobile apps.'
      },
      {
        id: 5,
        title: 'Predictive Maintenance AI',
        category: 'AI',
        description: 'Machine learning for industrial equipment failure prediction',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        tags: ['ML', 'IoT', 'Analytics'],
        details: 'Developed ML models analyzing sensor data to predict equipment failures 48 hours in advance, reducing downtime by 60%.'
      },
      {
        id: 6,
        title: '3D Product Visualization',
        category: 'Creative',
        description: 'Interactive 3D models and AR experiences for retail',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        tags: ['3D', 'AR', 'WebGL'],
        details: 'Created photorealistic 3D product models with AR integration allowing customers to visualize products in their space before purchase.'
      }
    ],
    ar: [
      {
        id: 1,
        title: 'نظام تخطيط موارد المؤسسات',
        category: 'البرمجيات',
        description: 'حل شامل لتخطيط موارد المؤسسات لصناعة التصنيع',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        tags: ['تخطيط الموارد', 'سحابي', 'مؤسسي'],
        details: 'تطوير نظام شامل لتخطيط موارد المؤسسات يتعامل مع المخزون والموارد البشرية والتمويل وإدارة الإنتاج لشركة تصنيع كبيرة تضم أكثر من 500 مستخدم.'
      },
      {
        id: 2,
        title: 'تحليلات كاميرات المراقبة بالذكاء الاصطناعي',
        category: 'الذكاء الاصطناعي',
        description: 'مراقبة في الوقت الفعلي مع الرؤية الحاسوبية واكتشاف التهديدات',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
        tags: ['ذكاء اصطناعي', 'رؤية حاسوبية', 'أمن'],
        details: 'تنفيذ خوارزميات رؤية حاسوبية متقدمة للكشف عن التهديدات في الوقت الفعلي والتعرف على الوجوه وتحليل السلوك عبر أكثر من 100 كاميرا.'
      },
      {
        id: 3,
        title: 'فيديو علامة تجارية للشركات',
        category: 'الإبداعي',
        description: 'إنتاج فيديو شركات راقي لشركة من قائمة Fortune 500',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
        tags: ['فيديو', 'إنتاج', '4K'],
        details: 'إنتاج فيديو سينمائي للعلامة التجارية للشركات يتضمن لقطات بدقة 4K بطائرة بدون طيار ومقابلات احترافية وتأثيرات ما بعد الإنتاج.'
      },
      {
        id: 4,
        title: 'منصة التجارة الإلكترونية',
        category: 'البرمجيات',
        description: 'سوق متعدد البائعين مع تكامل دفع متقدم',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        tags: ['تجارة إلكترونية', 'دفع', 'موبايل'],
        details: 'بناء سوق قابل للتوسع متعدد البائعين يدعم أكثر من 1000 بائع مع بوابة دفع متكاملة وإدارة المخزون وتطبيقات الهاتف المحمول.'
      },
      {
        id: 5,
        title: 'الذكاء الاصطناعي للصيانة التنبؤية',
        category: 'الذكاء الاصطناعي',
        description: 'التعلم الآلي للتنبؤ بفشل المعدات الصناعية',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        tags: ['تعلم آلي', 'إنترنت الأشياء', 'تحليلات'],
        details: 'تطوير نماذج تعلم آلي لتحليل بيانات المستشعرات للتنبؤ بأعطال المعدات قبل 48 ساعة، مما يقلل من وقت التوقف بنسبة 60٪.'
      },
      {
        id: 6,
        title: 'تصور المنتج ثلاثي الأبعاد',
        category: 'الإبداعي',
        description: 'نماذج ثلاثية الأبعاد تفاعلية وتجارب الواقع المعزز للبيع بالتجزئة',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        tags: ['ثلاثي الأبعاد', 'واقع معزز', 'WebGL'],
        details: 'إنشاء نماذج منتجات ثلاثية الأبعاد واقعية مع تكامل الواقع المعزز للسماح للعملاء بتصور المنتجات في مساحتهم قبل الشراء.'
      }
    ]
  };

  const categoryMap: { [key: string]: string } = {
    'All': 'all', 'الكل': 'all',
    'Software': 'Software', 'البرمجيات': 'Software',
    'AI': 'AI', 'الذكاء الاصطناعي': 'AI',
    'Creative': 'Creative', 'الإبداعي': 'Creative'
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects[language]
    : projects[language].filter(p => p.category === categoryMap[selectedCategory]);

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-semibold mb-3 uppercase tracking-wider text-sm">
            {language === 'en' ? 'Our Work' : 'أعمالنا'}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {language === 'en' ? 'Featured Projects' : 'المشاريع المميزة'}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Discover some of our most impactful solutions across diverse industries'
              : 'اكتشف بعضًا من حلولنا الأكثر تأثيرًا عبر صناعات متنوعة'}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories[language].map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === (categoryMap[category] || category.toLowerCase()) ? 'default' : 'outline'}
              data-testid={`button-category-${category.toLowerCase()}`}
              onClick={() => setSelectedCategory(categoryMap[category] || category.toLowerCase())}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`project-card-${project.id}`}
              className="group bg-white rounded-lg overflow-hidden hover-elevate cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white border-0">
                    {project.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onClick={() => setSelectedProject(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <Button
                size="icon"
                variant="ghost"
                data-testid="button-close-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-900"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-8">
              <Badge className="bg-blue-600 text-white border-0 mb-4">
                {selectedProject.category}
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedProject.title}</h2>
              <p className="text-slate-600 mb-6 text-lg leading-relaxed">{selectedProject.details}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button className="gap-2">
                <ExternalLink className="w-4 h-4" />
                {language === 'en' ? 'View Case Study' : 'عرض دراسة الحالة'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
