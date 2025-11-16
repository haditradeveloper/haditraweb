import { Mail, Phone, MapPin } from 'lucide-react';
import { type Language } from '@/lib/i18n';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const content = {
    en: {
      brand: 'Haditra',
      tagline: 'Technology & Creative Excellence',
      description: 'Delivering exceptional digital solutions that exceed expectations and drive meaningful results.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contact: 'Contact',
      links: ['Home', 'About', 'Portfolio', 'Blog'],
      serviceLinks: ['Software Engineering', 'AI & Technologies', 'Creative Studio', 'Consulting'],
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
      links: ['الرئيسية', 'من نحن', 'معرض الأعمال', 'المدونة'],
      serviceLinks: ['هندسة البرمجيات', 'الذكاء الاصطناعي', 'الاستوديو الإبداعي', 'الاستشارات'],
      copyright: 'جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة'
    }
  };

  const c = content[language];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">{c.brand}</h3>
                <p className="text-white/60 text-xs">{c.tagline}</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{c.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{c.quickLinks}</h4>
            <ul className="space-y-3">
              {c.links.map((link, index) => (
                <li key={index}>
                  <button
                    data-testid={`link-footer-${link.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors text-sm hover-elevate px-2 py-1 rounded-md -ml-2"
                    onClick={() => console.log(`Navigate to ${link}`)}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{c.services}</h4>
            <ul className="space-y-3">
              {c.serviceLinks.map((service, index) => (
                <li key={index}>
                  <button
                    data-testid={`link-service-${index}`}
                    className="text-white/60 hover:text-white transition-colors text-sm hover-elevate px-2 py-1 rounded-md -ml-2"
                    onClick={() => console.log(`Navigate to ${service}`)}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{c.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:info@haditra.com" 
                  data-testid="link-email"
                  className="text-white/60 hover:text-white transition-colors text-sm hover-elevate"
                >
                  info@haditra.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+971XXXXXXXX" 
                  data-testid="link-phone"
                  className="text-white/60 hover:text-white transition-colors text-sm hover-elevate"
                >
                  +971 XX XXX XXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  {language === 'en' ? 'Dubai, UAE' : 'دبي، الإمارات'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © 2024 {c.brand}. {c.copyright}
            </p>
            <div className="flex items-center gap-6">
              <button
                data-testid="link-privacy"
                className="text-white/60 hover:text-white transition-colors text-sm hover-elevate px-2 py-1 rounded-md"
                onClick={() => console.log('Privacy policy clicked')}
              >
                {c.privacy}
              </button>
              <button
                data-testid="link-terms"
                className="text-white/60 hover:text-white transition-colors text-sm hover-elevate px-2 py-1 rounded-md"
                onClick={() => console.log('Terms clicked')}
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
