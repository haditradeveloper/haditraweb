import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { type Language } from '@/lib/i18n';

interface ContactSectionProps {
  language: Language;
}

const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '').slice(0, 2000);
};

const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string' || !email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return true;
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
};

export default function ContactSection({ language }: ContactSectionProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      subtitle: 'Get In Touch',
      title: 'Start Your Project Today',
      description: 'Have a project in mind? Let\'s discuss how we can help you achieve your goals.',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        message: 'Project Details',
        submit: 'Send Message',
        sending: 'Sending...'
      },
      contact: {
        email: 'info@Heditra.com',
        phone: '+971 XX XXX XXXX',
        location: 'Dubai, UAE'
      },
      success: 'Thank you! We\'ll get back to you soon.',
      error: 'Please fill in all fields correctly.'
    },
    ar: {
      subtitle: 'تواصل معنا',
      title: 'ابدأ مشروعك اليوم',
      description: 'لديك مشروع في ذهنك؟ دعنا نناقش كيف يمكننا مساعدتك في تحقيق أهدافك.',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        message: 'تفاصيل المشروع',
        submit: 'إرسال الرسالة',
        sending: 'جاري الإرسال...'
      },
      contact: {
        email: 'info@Heditra.com',
        phone: '+971 XX XXX XXXX',
        location: 'دبي، الإمارات'
      },
      success: 'شكراً لك! سنتواصل معك قريباً.',
      error: 'يرجى ملء جميع الحقول بشكل صحيح.'
    }
  };

  const c = useMemo(() => content[language], [language]);

  const contactItems = useMemo(() => [
    { icon: Mail, title: language === 'en' ? 'Email' : 'البريد الإلكتروني', content: c.contact.email, href: `mailto:${c.contact.email}` },
    { icon: Phone, title: language === 'en' ? 'Phone' : 'الهاتف', content: c.contact.phone, href: `tel:${c.contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, title: language === 'en' ? 'Location' : 'الموقع', content: c.contact.location }
  ], [language, c]);

  const handleInputChange = useCallback((field: keyof typeof formData) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const value = sanitizeInput(e.target.value);
      setFormData(prev => ({ ...prev, [field]: value }));
    };
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedMessage = sanitizeInput(formData.message);
    const sanitizedPhone = sanitizeInput(formData.phone);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: c.error,
        variant: 'destructive'
      });
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: language === 'en' ? 'Please enter a valid email address.' : 'يرجى إدخال عنوان بريد إلكتروني صحيح.',
        variant: 'destructive'
      });
      return;
    }

    if (sanitizedPhone && !validatePhone(sanitizedPhone)) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: language === 'en' ? 'Please enter a valid phone number.' : 'يرجى إدخال رقم هاتف صحيح.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: language === 'en' ? 'Success!' : 'نجح!',
        description: c.success
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  }, [formData, language, c, toast]);

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 xl:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-primary text-xs uppercase tracking-wider mb-3 sm:mb-4">
            {c.subtitle}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            {c.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
            {c.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <address className="space-y-4 sm:space-y-6 not-italic">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1 text-xs sm:text-sm">
                    {item.title}
                  </h4>
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm break-all"
                      rel="noopener noreferrer"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-xs sm:text-sm">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </address>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" aria-label="Contact form">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  {c.form.name}
                </label>
                <Input
                  type="text"
                  data-testid="input-name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder={c.form.name}
                  className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground text-sm"
                  required
                  maxLength={100}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                    {c.form.email}
                  </label>
                  <Input
                    type="email"
                    data-testid="input-email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder={c.form.email}
                    className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground text-sm"
                    required
                    maxLength={255}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                    {c.form.phone}
                  </label>
                  <Input
                    type="tel"
                    data-testid="input-phone"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    placeholder={c.form.phone}
                    className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground text-sm"
                    maxLength={20}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                  {c.form.message}
                </label>
                <Textarea
                  data-testid="input-message"
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  placeholder={c.form.message}
                  rows={5}
                  className="w-full resize-none bg-background border-border text-foreground placeholder:text-muted-foreground text-sm"
                  required
                  maxLength={2000}
                />
              </div>

            <Button
              type="submit"
              size="lg"
              data-testid="button-submit-contact"
              disabled={isSubmitting}
              className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none py-4 sm:py-5 text-sm sm:text-base font-medium transition-all duration-300"
            >
              {isSubmitting ? c.form.sending : c.form.submit}
              {!isSubmitting && <Send className="w-3 h-3 sm:w-4 sm:h-4" />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
