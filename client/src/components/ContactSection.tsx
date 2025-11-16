import { useState } from 'react';
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
        email: 'info@haditra.com',
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
        email: 'info@haditra.com',
        phone: '+971 XX XXX XXXX',
        location: 'دبي، الإمارات'
      },
      success: 'شكراً لك! سنتواصل معك قريباً.',
      error: 'يرجى ملء جميع الحقول بشكل صحيح.'
    }
  };

  const c = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: c.error,
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: language === 'en' ? 'Success!' : 'نجح!',
        description: c.success
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-slate-50">
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
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {c.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {c.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white rounded-lg p-6 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </h4>
                  <a 
                    href={`mailto:${c.contact.email}`}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {c.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    {language === 'en' ? 'Phone' : 'الهاتف'}
                  </h4>
                  <a 
                    href={`tel:${c.contact.phone.replace(/\s/g, '')}`}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {c.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">
                    {language === 'en' ? 'Location' : 'الموقع'}
                  </h4>
                  <p className="text-slate-600">{c.contact.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  {c.form.name}
                </label>
                <Input
                  type="text"
                  data-testid="input-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={c.form.name}
                  className="w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    {c.form.email}
                  </label>
                  <Input
                    type="email"
                    data-testid="input-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={c.form.email}
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    {c.form.phone}
                  </label>
                  <Input
                    type="tel"
                    data-testid="input-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={c.form.phone}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  {c.form.message}
                </label>
                <Textarea
                  data-testid="input-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={c.form.message}
                  rows={6}
                  className="w-full resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                data-testid="button-submit-contact"
                disabled={isSubmitting}
                className="w-full gap-2"
              >
                {isSubmitting ? c.form.sending : c.form.submit}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
