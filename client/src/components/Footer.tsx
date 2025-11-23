import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { type Language } from '@/lib/i18n';
import Logo from '@/components/Logo';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 56;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const content = {
    en: {
      brand: 'Heditra',
      tagline: 'Technology & Creative Excellence',
      description: 'Delivering exceptional digital solutions that exceed expectations and drive meaningful results.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      links: [
        { label: 'Home', id: 'home' },
        { label: 'About', id: 'about' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'Contact', id: 'contact' }
      ],
      serviceLinks: [
        { label: 'Software Engineering', id: 'services' },
        { label: 'AI & Technologies', id: 'services' },
        { label: 'Creative Studio', id: 'services' },
        { label: 'Consulting', id: 'services' }
      ],
      copyright: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    ar: {
      brand: 'حديترا',
      tagline: 'التميز التقني والإبداعي',
      description: 'تقديم حلول رقمية استثنائية تتجاوز التوقعات وتحقق نتائج ذات مغزى.',
      quickLinks: 'روابط سريعة',
      services: 'الخدمات',
      contact: 'اتصل',
      links: [
        { label: 'الرئيسية', id: 'home' },
        { label: 'من نحن', id: 'about' },
        { label: 'معرض الأعمال', id: 'portfolio' },
        { label: 'اتصل بنا', id: 'contact' }
      ],
      serviceLinks: [
        { label: 'هندسة البرمجيات', id: 'services' },
        { label: 'الذكاء الاصطناعي', id: 'services' },
        { label: 'الاستوديو الإبداعي', id: 'services' },
        { label: 'الاستشارات', id: 'services' }
      ],
      copyright: 'جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة'
    }
  };

  const c = content[language];

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <Logo 
                size="xl" 
                showGlow={false}
                onClick={() => scrollToSection('home')}
                className="flex-shrink-0 mt-1"
              />
              <div className="flex-1">
                <h3 className="text-foreground font-semibold text-xl lg:text-2xl tracking-normal mb-1.5 leading-none">
                  HEDITRA
                </h3>
                <p className="text-muted-foreground text-[10px] lg:text-xs font-normal mb-2 tracking-[0.2em] uppercase">
                  Technologies & Creative Design
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{c.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">{c.quickLinks}</h4>
            <ul className="space-y-3">
              {c.links.map((link, index) => (
                <li key={index}>
                  <button
                    data-testid={`link-footer-${link.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hover-elevate px-2 py-1 rounded-none -ml-2"
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">{c.services}</h4>
            <ul className="space-y-3">
              {c.serviceLinks.map((service, index) => (
                <li key={index}>
                  <button
                    data-testid={`link-service-${index}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm hover-elevate px-2 py-1 rounded-none -ml-2"
                    onClick={() => scrollToSection(typeof service === 'string' ? 'services' : service.id)}
                  >
                    {typeof service === 'string' ? service : service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{c.contact}</h4>
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:info@Heditra.com" 
                  data-testid="link-email"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover-elevate"
                >
                  info@Heditra.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+971XXXXXXXX" 
                  data-testid="link-phone"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm hover-elevate"
                >
                  +971 XX XXX XXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {language === 'en' ? 'Dubai, UAE' : 'دبي، الإمارات'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 {c.brand}. {c.copyright}
            </p>
            <div className="flex items-center gap-6">
              <button
                data-testid="link-privacy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm hover-elevate px-2 py-1 rounded-none"
              >
                {c.privacy}
              </button>
              <button
                data-testid="link-terms"
                className="text-muted-foreground hover:text-primary transition-colors text-sm hover-elevate px-2 py-1 rounded-none"
              >
                {c.terms}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
