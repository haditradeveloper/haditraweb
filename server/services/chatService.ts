import Groq from 'groq-sdk';

type Language = 'en' | 'ar';

interface ChatRequest {
  message: string;
  language: Language;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

interface ChatResponse {
  response: string;
  success: boolean;
  error?: string;
}

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});

const MODEL = 'llama-3.1-8b-instant';

const getSystemPrompt = (language: Language): string => {
  const prompts = {
    en: `You are a helpful AI assistant for Haditra, a technology and creative solutions provider based in the UAE.

Company Information:
- Services: Software Engineering (ERP, HRMS, Payment Systems, E-Commerce), AI & Technologies (Machine Learning, IoT, Smart Systems), Creative Studio (Photography, Video Production, 3D Animation)
- Contact: Email info@haditra.com, Phone +971 XX XXX XXXX, Location Dubai, UAE
- Portfolio: Available on the website homepage

Guidelines:
- Provide concise, professional, and helpful responses
- Answer questions about services, pricing, contact information, portfolio, and company information
- If you don't know something, direct users to contact the company
- Keep responses under 200 words
- Be friendly and professional`,

    ar: `أنت مساعد ذكي مفيد لشركة هادترا، مزود حلول تقنية وإبداعية مقرها في الإمارات العربية المتحدة.

معلومات الشركة:
- الخدمات: هندسة البرمجيات (أنظمة تخطيط الموارد، الموارد البشرية، أنظمة الدفع، التجارة الإلكترونية)، الذكاء الاصطناعي والتقنيات (التعلم الآلي، إنترنت الأشياء، الأنظمة الذكية)، الاستوديو الإبداعي (التصوير، إنتاج الفيديو، الرسوم المتحركة ثلاثية الأبعاد)
- الاتصال: البريد الإلكتروني info@haditra.com، الهاتف +971 XX XXX XXXX، الموقع دبي، الإمارات العربية المتحدة
- معرض الأعمال: متاح على الصفحة الرئيسية للموقع

الإرشادات:
- قدم إجابات مختصرة ومهنية ومفيدة
- أجب على الأسئلة حول الخدمات والأسعار ومعلومات الاتصال ومعرض الأعمال ومعلومات الشركة
- إذا كنت لا تعرف شيئاً، وجه المستخدمين للاتصال بالشركة
- حافظ على الإجابات أقل من 200 كلمة
- كن ودوداً ومهنياً`
  };

  return prompts[language];
};

const getFallbackResponse = (message: string, language: Language): string => {
  const lowerMessage = message.toLowerCase().trim();
  
  const responses: Record<Language, Record<string, string>> = {
    en: {
      'hello': 'Hi! 👋 How can I help you today?',
      'hi': 'Hello! 👋 Welcome to Haditra. How can I assist you?',
      'service': 'We offer three main services:\n\n1. **Software Engineering** - ERP, HRMS, Payment Systems & E-Commerce\n2. **AI & Technologies** - Machine Learning, IoT, Smart Systems\n3. **Creative Studio** - Photography, Video Production, 3D Animation\n\nWhich one interests you?',
      'services': 'We offer three main services:\n\n1. **Software Engineering** - ERP, HRMS, Payment Systems & E-Commerce\n2. **AI & Technologies** - Machine Learning, IoT, Smart Systems\n3. **Creative Studio** - Photography, Video Production, 3D Animation\n\nWhich one interests you?',
      'price': 'For pricing information, please contact us through our contact form or email us at info@haditra.com. We provide customized quotes based on your specific needs.',
      'contact': 'You can reach us through:\n\n📧 Email: info@haditra.com\n📞 Phone: +971 XX XXX XXXX\n📍 Location: Dubai, UAE\n\nOr fill out our contact form on the website!',
      'portfolio': 'You can view our portfolio by scrolling down to the "Portfolio" section on our homepage. We showcase our latest projects across different industries.',
      'about': 'Haditra is a technology and creative solutions provider based in the UAE. We specialize in software engineering, AI technologies, and creative studio services.',
      'default': 'I\'m here to help! You can ask me about:\n\n• Our services\n• Pricing\n• Contact information\n• Portfolio\n• About us\n\nWhat would you like to know?'
    },
    ar: {
      'مرحبا': 'مرحباً! 👋 كيف يمكنني مساعدتك اليوم؟',
      'السلام': 'السلام عليكم! 👋 مرحباً بك في هادترا. كيف يمكنني مساعدتك؟',
      'خدمة': 'نقدم ثلاث خدمات رئيسية:\n\n1. **هندسة البرمجيات** - أنظمة تخطيط الموارد، الموارد البشرية، أنظمة الدفع والتجارة الإلكترونية\n2. **الذكاء الاصطناعي والتقنيات** - التعلم الآلي، إنترنت الأشياء، الأنظمة الذكية\n3. **الاستوديو الإبداعي** - التصوير، إنتاج الفيديو، الرسوم المتحركة ثلاثية الأبعاد\n\nأي منها يهمك؟',
      'خدمات': 'نقدم ثلاث خدمات رئيسية:\n\n1. **هندسة البرمجيات** - أنظمة تخطيط الموارد، الموارد البشرية، أنظمة الدفع والتجارة الإلكترونية\n2. **الذكاء الاصطناعي والتقنيات** - التعلم الآلي، إنترنت الأشياء، الأنظمة الذكية\n3. **الاستوديو الإبداعي** - التصوير، إنتاج الفيديو، الرسوم المتحركة ثلاثية الأبعاد\n\nأي منها يهمك؟',
      'سعر': 'للحصول على معلومات الأسعار، يرجى التواصل معنا من خلال نموذج الاتصال أو البريد الإلكتروني info@haditra.com. نقدم عروض أسعار مخصصة حسب احتياجاتك.',
      'اتصال': 'يمكنك التواصل معنا من خلال:\n\n📧 البريد الإلكتروني: info@haditra.com\n📞 الهاتف: +971 XX XXX XXXX\n📍 الموقع: دبي، الإمارات العربية المتحدة\n\nأو املأ نموذج الاتصال على موقعنا!',
      'معرض': 'يمكنك عرض معرض أعمالنا عن طريق التمرير لأسفل إلى قسم "معرض الأعمال" على الصفحة الرئيسية. نعرض أحدث مشاريعنا عبر مختلف الصناعات.',
      'من نحن': 'هادترا هي مزود حلول تقنية وإبداعية مقرها في الإمارات العربية المتحدة. نتخصص في هندسة البرمجيات وتقنيات الذكاء الاصطناعي وخدمات الاستوديو الإبداعي.',
      'default': 'أنا هنا للمساعدة! يمكنك أن تسألني عن:\n\n• خدماتنا\n• الأسعار\n• معلومات الاتصال\n• معرض الأعمال\n• من نحن\n\nماذا تريد أن تعرف؟'
    }
  };

  const langResponses = responses[language];
  
  for (const [keyword, response] of Object.entries(langResponses)) {
    if (keyword !== 'default' && lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return langResponses.default;
};

export const generateChatResponse = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return {
        response: getFallbackResponse(request.message, request.language),
        success: false,
        error: 'API key not configured'
      };
    }

    const systemPrompt = getSystemPrompt(request.language);
    const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
      { role: 'system', content: systemPrompt }
    ];

    if (request.conversationHistory && request.conversationHistory.length > 0) {
      const recentHistory = request.conversationHistory.slice(-6);
      recentHistory.forEach(msg => {
        messages.push({ role: msg.role, content: msg.content });
      });
    }

    messages.push({ role: 'user', content: request.message });

    const completion = await groqClient.chat.completions.create({
      model: MODEL,
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 300,
      stream: false
    });

    const response = completion.choices[0]?.message?.content?.trim() || '';

    if (!response) {
      return {
        response: getFallbackResponse(request.message, request.language),
        success: false,
        error: 'Empty response from API'
      };
    }

    return {
      response,
      success: true
    };
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error';
    
    return {
      response: getFallbackResponse(request.message, request.language),
      success: false,
      error: errorMessage
    };
  }
};

