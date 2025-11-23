import { useState, useCallback, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Language } from '@/lib/i18n';
import Logo from '@/components/Logo';

interface NavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

interface NavItem {
  readonly label: string;
  readonly id: string;
}

export default function Navigation({ language, onLanguageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = useMemo<readonly NavItem[]>(() => language === 'en' 
    ? [
        { label: 'Home', id: 'home' },
        { label: 'Services', id: 'services' },
        { label: 'Portfolio', id: 'portfolio' },
        { label: 'About', id: 'about' },
        { label: 'Contact', id: 'contact' }
      ] as const
    : [
        { label: 'الرئيسية', id: 'home' },
        { label: 'الخدمات', id: 'services' },
        { label: 'معرض الأعمال', id: 'portfolio' },
        { label: 'من نحن', id: 'about' },
        { label: 'اتصل بنا', id: 'contact' }
      ] as const, [language]);

  const sectionCacheRef = useRef<Map<string, HTMLElement>>(new Map());

  const scrollToSection = useCallback((id: string): void => {
    if (typeof document === 'undefined') return;
    let element = sectionCacheRef.current.get(id);
    if (!element) {
      element = document.getElementById(id);
      if (element) {
        sectionCacheRef.current.set(id, element);
      }
    }
    if (element) {
      const offset = 48;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-lg border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 sm:gap-3 hover-elevate rounded-none px-0 py-1.5 group relative"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Go to home"
          >
            <Logo 
              size="lg" 
              showGlow={false}
              className="flex-shrink-0"
            />

            <div className="flex flex-col items-start">
              <span className="text-foreground font-semibold text-sm sm:text-base lg:text-lg leading-none tracking-normal">
                HEDITRA
              </span>
              <span className="text-muted-foreground text-[6px] sm:text-[7px] lg:text-[8px] leading-tight tracking-[0.2em] uppercase hidden sm:block mt-0.5 font-normal">
                Technologies & Creative Design
              </span>
            </div>
          </motion.button>

          <div className="flex items-center gap-2 sm:gap-4">
            <ul className="hidden lg:flex items-center gap-4" role="list">
              {navItems.map((item, index) => (
                <li key={index} role="listitem">
                  <button
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                    className="text-foreground/80 hover:text-foreground transition-colors text-xs font-medium hover-elevate px-2 py-1 rounded-md"
                    onClick={() => scrollToSection(item.id)}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <Button
              size="icon"
              variant="ghost"
              data-testid="button-language-toggle"
              onClick={useCallback(() => onLanguageChange(language === 'en' ? 'ar' : 'en'), [language, onLanguageChange])}
              className="text-foreground hover:bg-primary/20 h-8 w-8 sm:h-8 sm:w-8"
              aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              data-testid="button-menu-toggle"
              className="lg:hidden text-foreground hover:bg-primary/20 h-8 w-8 sm:h-8 sm:w-8"
              onClick={useCallback(() => setIsMenuOpen(prev => !prev), [])}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
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
            className="lg:hidden bg-background/70 backdrop-blur-lg border-t border-border"
          >
            <ul className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4" role="list">
              {navItems.map((item, index) => (
                <li key={index} role="listitem">
                  <button
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors text-base font-medium py-2 hover-elevate px-4 rounded-md"
                    onClick={() => scrollToSection(item.id)}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
