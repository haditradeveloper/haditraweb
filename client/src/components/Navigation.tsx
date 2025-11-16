import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Language } from '@/lib/i18n';

interface NavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Navigation({ language, onLanguageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = language === 'en' 
    ? [
        { label: 'Home', id: 'home' },
        { label: 'Services', id: 'services' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'About', id: 'about' },
        { label: 'Contact', id: 'contact' }
      ]
    : [
        { label: 'الرئيسية', id: 'home' },
        { label: 'الخدمات', id: 'services' },
        { label: 'معرض الأعمال', id: 'portfolio' },
        { label: 'من نحن', id: 'about' },
        { label: 'اتصل بنا', id: 'contact' }
      ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 56; // Navigation height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 lg:px-6">
        <div className="flex items-center justify-between h-14">
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-1.5 hover-elevate rounded-md px-1.5 py-0.5"
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-white font-bold text-base">Haditra</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium hover-elevate px-2 py-1 rounded-md"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Button
              size="icon"
              variant="ghost"
              data-testid="button-language-toggle"
              onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
              className="text-white hover:bg-white/10 h-8 w-8"
            >
              <Globe className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              data-testid="button-menu-toggle"
              className="lg:hidden text-white hover:bg-white/10 h-8 w-8"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/20 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  className="block w-full text-left text-white/80 hover:text-white transition-colors text-base font-medium py-2 hover-elevate px-4 rounded-md"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
