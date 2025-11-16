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
    ? ['Home', 'Services', 'Portfolio', 'About', 'Contact']
    : ['الرئيسية', 'الخدمات', 'معرض الأعمال', 'من نحن', 'اتصل بنا'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-white font-bold text-xl">Haditra</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                data-testid={`link-nav-${item.toLowerCase()}`}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium hover-elevate px-3 py-2 rounded-md"
                onClick={() => console.log(`Navigate to ${item}`)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              data-testid="button-language-toggle"
              onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
              className="text-white hover:bg-white/10"
            >
              <Globe className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              data-testid="button-menu-toggle"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="lg:hidden bg-slate-900 border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  data-testid={`link-mobile-${item.toLowerCase()}`}
                  className="block w-full text-left text-white/80 hover:text-white transition-colors text-base font-medium py-2 hover-elevate px-4 rounded-md"
                  onClick={() => {
                    console.log(`Navigate to ${item}`);
                    setIsMenuOpen(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
