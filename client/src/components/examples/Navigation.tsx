import { useState } from 'react';
import Navigation from '../Navigation';
import { type Language } from '@/lib/i18n';

export default function NavigationExample() {
  const [language, setLanguage] = useState<Language>('en');
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Navigation language={language} onLanguageChange={setLanguage} />
      <div className="pt-32 px-6">
        <p className="text-center text-muted-foreground">Navigation component demo</p>
      </div>
    </div>
  );
}
