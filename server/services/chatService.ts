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

// Initialize Groq client - will be recreated with API key if needed
let groqClient: Groq | null = null;

const MODEL = 'llama-3.1-8b-instant';

const getGroqClient = (): Groq => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('GROQ_API_KEY is not configured');
  }
  
  // Create new client if not exists or if API key changed
  if (!groqClient) {
    groqClient = new Groq({
      apiKey: apiKey
    });
  }
  
  return groqClient;
};

const getSystemPrompt = (language: Language): string => {
  const prompts = {
    en: `You are a professional AI assistant for Heditra, a leading technology and creative solutions provider based in Dubai, UAE.

COMPANY OVERVIEW:
- Company Name: Heditra (Technologies & Creative Design)
- Founded: 2020
- Location: Dubai, United Arab Emirates
- Tagline: "Technology & Creative Excellence"

SERVICES (Three Main Categories):
1. Software Engineering:
   - Enterprise Resource Planning (ERP) Systems
   - Human Resource Management Systems (HRMS)
   - Payment Systems & Gateways
   - E-Commerce Platforms & Multi-vendor Marketplaces

2. AI & Technologies:
   - Machine Learning Solutions
   - IoT Integration & Smart Systems
   - Predictive Analytics
   - Computer Vision & AI-Powered Analytics

3. Creative Studio:
   - Professional Photography
   - Video Production (Corporate, Brand, Commercial)
   - 3D Animation & Visualization
   - AR/VR Content Creation

COMPANY STATISTICS:
- 500+ Projects Delivered
- 200+ Happy Clients
- 50+ Team Members (Software Engineers, AI Specialists, Creative Directors, Project Managers)
- 98% Client Satisfaction Rate

PORTFOLIO HIGHLIGHTS:
- Enterprise ERP Systems for manufacturing
- AI-Powered CCTV Analytics with computer vision
- Corporate Brand Videos (4K production)
- E-Commerce Platforms with multi-vendor support
- Predictive Maintenance AI for industrial equipment
- 3D Product Visualization with AR integration

COMPANY VALUES:
- Innovation First: Staying ahead of technology trends
- Client-Centric: Building lasting partnerships
- Quality Excellence: Meeting highest standards
- Agile Delivery: Fast, flexible, and responsive

CONTACT INFORMATION:
- Email: info@Heditra.com
- Phone: +971 XX XXX XXXX
- Location: Dubai, UAE
- Website: Available sections include Home, About, Services, Portfolio, Contact

CONVERSATION & CONTEXT MANAGEMENT:
- ALWAYS remember and reference information from previous messages in the conversation
- If the user tells you their name, remember it and use it in future responses
- If the user asks "what was my name?" or similar, recall their name from earlier in the conversation
- Pay attention to the conversation history provided - use it to give context-aware responses
- Remember user preferences, questions asked, and information shared
- Reference previous parts of the conversation when relevant

RESPONSE GUIDELINES:
- CRITICAL: Write responses as if you're a real person having a natural conversation, NOT a chatbot
- NEVER use bullet points, numbered lists, or formatted text unless specifically asked
- Write in a flowing, natural paragraph style - like you're texting a friend who works at the company
- Be warm, personable, and genuinely helpful - show personality
- When someone says "I am [name]", acknowledge them by name in your response naturally
- When asked "how can I communicate with you", explain that you're the chatbot and they can ask you anything, or contact the company directly
- Answer questions in complete sentences with natural flow, not structured lists
- Use contractions naturally (I'm, you're, we've, etc.) to sound more human
- Vary your responses - don't repeat the same phrases
- When someone introduces themselves, say something like "Nice to meet you, [name]!" and continue naturally
- Keep responses conversational and brief (2-4 sentences typically)
- Always be professional, friendly, and helpful
- Provide accurate information based on the company details above
- For pricing inquiries, naturally explain that pricing is customized and they should contact the company
- Use the company name "Heditra" consistently
- IMPORTANT: Use the conversation history to remember user information and provide context-aware responses
- Remember: You're having a conversation, not providing a FAQ page`,

    ar: `أنت مساعد ذكي احترافي لشركة هادترا، مزود رائد للحلول التقنية والإبداعية مقرها في دبي، الإمارات العربية المتحدة.

نظرة عامة على الشركة:
- اسم الشركة: هادترا (التقنيات والتصميم الإبداعي)
- تأسست: 2020
- الموقع: دبي، الإمارات العربية المتحدة
- الشعار: "التميز التقني والإبداعي"

الخدمات (ثلاث فئات رئيسية):
1. هندسة البرمجيات:
   - أنظمة تخطيط موارد المؤسسات (ERP)
   - أنظمة إدارة الموارد البشرية (HRMS)
   - أنظمة الدفع والبوابات
   - منصات التجارة الإلكترونية والأسواق متعددة البائعين

2. الذكاء الاصطناعي والتقنيات:
   - حلول التعلم الآلي
   - تكامل إنترنت الأشياء والأنظمة الذكية
   - التحليلات التنبؤية
   - الرؤية الحاسوبية والتحليلات المدعومة بالذكاء الاصطناعي

3. الاستوديو الإبداعي:
   - التصوير الفوتوغرافي الاحترافي
   - إنتاج الفيديو (الشركات، العلامات التجارية، التجاري)
   - الرسوم المتحركة ثلاثية الأبعاد والتصور
   - إنشاء محتوى الواقع المعزز والافتراضي

إحصائيات الشركة:
- أكثر من 500 مشروع منجز
- أكثر من 200 عميل سعيد
- أكثر من 50 عضو فريق (مهندسو برمجيات، أخصائيو ذكاء اصطناعي، مدراء إبداعيون، مدراء مشاريع)
- معدل رضا العملاء 98%

أبرز أعمال المحفظة:
- أنظمة تخطيط موارد المؤسسات للتصنيع
- تحليلات كاميرات المراقبة المدعومة بالذكاء الاصطناعي مع الرؤية الحاسوبية
- فيديوهات العلامات التجارية للشركات (إنتاج بدقة 4K)
- منصات التجارة الإلكترونية مع دعم متعدد البائعين
- الذكاء الاصطناعي للصيانة التنبؤية للمعدات الصناعية
- تصور المنتجات ثلاثية الأبعاد مع تكامل الواقع المعزز

قيم الشركة:
- الابتكار أولاً: البقاء في صدارة اتجاهات التكنولوجيا
- التركيز على العميل: بناء شراكات دائمة
- التميز في الجودة: تلبية أعلى المعايير
- التسليم السريع: سريع ومرن ومستجيب

معلومات الاتصال:
- البريد الإلكتروني: info@Heditra.com
- الهاتف: +971 XX XXX XXXX
- الموقع: دبي، الإمارات العربية المتحدة
- الموقع الإلكتروني: الأقسام المتاحة تشمل الرئيسية، من نحن، الخدمات، المحفظة، الاتصال

إدارة المحادثة والسياق:
- تذكر دائماً وارجع إلى المعلومات من الرسائل السابقة في المحادثة
- إذا أخبرك المستخدم باسمه، تذكره واستخدمه في الردود المستقبلية
- إذا سأل المستخدم "ما كان اسمي؟" أو ما شابه، استرجع اسمه من وقت سابق في المحادثة
- انتبه إلى تاريخ المحادثة المقدم - استخدمه لإعطاء ردود واعية بالسياق
- تذكر تفضيلات المستخدم والأسئلة المطروحة والمعلومات المشتركة
- ارجع إلى أجزاء سابقة من المحادثة عند الاقتضاء

إرشادات الرد:
- مهم جداً: اكتب الردود كما لو كنت شخصاً حقيقياً تجري محادثة طبيعية، وليس روبوت محادثة
- لا تستخدم النقاط النقطية أو القوائم المرقمة أو النص المنسق إلا إذا طُلب منك ذلك
- اكتب بأسلوب طبيعي متدفق - كما لو كنت تراسل صديقاً يعمل في الشركة
- كن دافئاً وودوداً ومفيداً بصدق - أظهر الشخصية
- عندما يقول شخص "أنا [اسم]"، اعترف به بالاسم في ردك بشكل طبيعي
- عندما يُسأل "كيف يمكنني التواصل معك"، اشرح أنك روبوت المحادثة ويمكنهم سؤالك أي شيء، أو الاتصال بالشركة مباشرة
- أجب على الأسئلة بجمل كاملة بتدفق طبيعي، وليس بقوائم منظمة
- استخدم الاختصارات بشكل طبيعي (أنا، أنت، نحن، إلخ) لتكون أكثر إنسانية
- تنوّع في ردودك - لا تكرر نفس العبارات
- عندما يعرّف شخص نفسه، قل شيئاً مثل "سعيد بلقائك، [الاسم]!" واستمر بشكل طبيعي
- حافظ على الردود محادثية وموجزة (عادة 2-4 جمل)
- كن دائماً مهنياً وودوداً ومفيداً
- قدم معلومات دقيقة بناءً على تفاصيل الشركة أعلاه
- لاستفسارات الأسعار، اشرح بشكل طبيعي أن الأسعار مخصصة ويجب عليهم الاتصال بالشركة
- استخدم اسم الشركة "هادترا" بشكل متسق
- مهم: استخدم تاريخ المحادثة لتذكر معلومات المستخدم وتقديم ردود واعية بالسياق
- تذكر: أنت تجري محادثة، وليس تقدم صفحة أسئلة شائعة`
  };

  return prompts[language];
};

const getFallbackResponse = (message: string, language: Language, conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>): string => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Try to extract user name from conversation history
  let userName: string | null = null;
  if (conversationHistory && conversationHistory.length > 0) {
    // Check messages in reverse order (most recent first)
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
      const msg = conversationHistory[i];
      if (msg.role === 'user') {
        // Try multiple patterns for name extraction
        const patterns = [
          /(?:my name is|i'm|i am|call me|اسمي|أنا|اسمي هو)\s+([A-Za-z\u0600-\u06FF\s]+?)(?:[!.,\?]|$)/i,
          /(?:^|\s)([A-Z][a-z]+)(?:\s+said|$)/, // Simple capitalized name
        ];
        
        for (const pattern of patterns) {
          const nameMatch = msg.content.match(pattern);
          if (nameMatch && nameMatch[1]) {
            userName = nameMatch[1].trim();
            // Validate it's a reasonable name (not too long, not common words)
            if (userName.length > 1 && userName.length < 30 && !/^(the|a|an|is|are|was|were|this|that|what|how|when|where|why)$/i.test(userName)) {
              break;
            }
          }
        }
        if (userName) break;
      }
    }
  }
  
  const responses: Record<Language, Record<string, string>> = {
    en: {
      'hello': 'Hello! 👋 Welcome to Heditra. I\'m here to help you learn about our technology and creative solutions. How can I assist you today?',
      'hi': 'Hi there! 👋 Welcome to Heditra. We\'re a leading technology and creative solutions provider based in Dubai, UAE. What would you like to know?',
      'hey': 'Hey! 👋 Thanks for reaching out to Heditra. I\'m here to answer your questions about our services, portfolio, or company. What can I help with?',
      'how are you': 'I\'m doing great, thank you for asking! 😊 I\'m here and ready to help you learn about Heditra\'s services and solutions. How can I assist you today?',
      'what is your name': 'I\'m the Heditra AI assistant! I\'m here to help you learn about our technology and creative solutions. What would you like to know?',
      'what\'s your name': 'I\'m the Heditra AI assistant! I\'m here to help you learn about our technology and creative solutions. What would you like to know?',
      'who are you': 'I\'m the Heditra AI assistant! I help visitors learn about Heditra\'s services, portfolio, and company information. How can I help you today?',
      'what was my name': userName ? `Your name is ${userName}! Nice to meet you, ${userName}. How can I help you today?` : 'I don\'t recall you telling me your name yet. What\'s your name?',
      'what is my name': userName ? `Your name is ${userName}! How can I assist you today, ${userName}?` : 'I don\'t think you\'ve told me your name yet. What should I call you?',
      'do you remember my name': userName ? `Yes, of course! Your name is ${userName}. How can I help you today, ${userName}?` : 'I\'m sorry, I don\'t think you\'ve told me your name yet. What\'s your name?',
      'what do you have': 'Heditra offers three main service areas: Software Engineering (ERP, HRMS, Payment Systems, E-Commerce), AI & Technologies (Machine Learning, IoT, Smart Systems), and Creative Studio (Photography, Video Production, 3D Animation). Which one interests you?',
      'what do you offer': 'We offer Software Engineering solutions like ERP and HRMS systems, AI & Technologies including Machine Learning and IoT, plus Creative Studio services for photography, video production, and 3D animation. What are you looking for?',
      'what can you do': 'I can help you learn about Heditra\'s services, portfolio projects, company information, pricing, and contact details. I\'m here to answer any questions you have about our technology and creative solutions!',
      'what services': 'Heditra provides three main services: Software Engineering (ERP, HRMS, Payment Systems, E-Commerce), AI & Technologies (Machine Learning, IoT, Smart Systems), and Creative Studio (Photography, Video, 3D Animation). Which area interests you?',
      'service': 'Heditra offers three main service categories:\n\n**1. Software Engineering**\n• ERP Systems\n• HRMS Solutions\n• Payment Systems & Gateways\n• E-Commerce Platforms\n\n**2. AI & Technologies**\n• Machine Learning Solutions\n• IoT Integration\n• Smart Systems\n• Predictive Analytics\n\n**3. Creative Studio**\n• Professional Photography\n• Video Production\n• 3D Animation\n• AR/VR Content\n\nWhich service interests you most?',
      'services': 'Heditra offers three main service categories:\n\n**1. Software Engineering**\n• ERP Systems\n• HRMS Solutions\n• Payment Systems & Gateways\n• E-Commerce Platforms\n\n**2. AI & Technologies**\n• Machine Learning Solutions\n• IoT Integration\n• Smart Systems\n• Predictive Analytics\n\n**3. Creative Studio**\n• Professional Photography\n• Video Production\n• 3D Animation\n• AR/VR Content\n\nWhich service interests you most?',
      'software': 'Our **Software Engineering** services include:\n\n• Enterprise Resource Planning (ERP) Systems\n• Human Resource Management Systems (HRMS)\n• Payment Systems & Payment Gateways\n• E-Commerce Platforms & Multi-vendor Marketplaces\n\nWe\'ve delivered 500+ projects with 98% client satisfaction. Would you like to know more about a specific service?',
      'ai': 'Our **AI & Technologies** solutions include:\n\n• Machine Learning & Predictive Analytics\n• IoT Integration & Smart Systems\n• Computer Vision & AI-Powered Analytics\n• Custom AI Solutions\n\nWe\'ve worked on projects like AI-powered CCTV analytics and predictive maintenance systems. Interested in learning more?',
      'creative': 'Our **Creative Studio** offers:\n\n• Professional Photography Services\n• Corporate & Brand Video Production (4K)\n• 3D Animation & Visualization\n• AR/VR Content Creation\n\nWe create high-quality visual content for brands and businesses. What type of creative project are you considering?',
      'price': 'For pricing information, please contact us directly. We provide customized quotes based on your specific project requirements and needs.\n\n📧 Email: info@Heditra.com\n📞 Phone: +971 XX XXX XXXX\n\nYou can also fill out our contact form on the website for a faster response!',
      'pricing': 'Pricing varies based on project scope and requirements. We offer customized solutions tailored to each client\'s needs.\n\nFor a detailed quote, please contact us:\n📧 info@Heditra.com\n📞 +971 XX XXX XXXX\n\nWe\'d be happy to discuss your project and provide a personalized estimate.',
      'cost': 'Our pricing is customized for each project. To get an accurate quote, please share your project details with us.\n\nContact us at:\n📧 info@Heditra.com\n📞 +971 XX XXX XXXX\n\nWe\'ll provide a detailed estimate based on your specific requirements.',
      'contact': 'You can reach Heditra through:\n\n📧 **Email:** info@Heditra.com\n📞 **Phone:** +971 XX XXX XXXX\n📍 **Location:** Dubai, United Arab Emirates\n\nYou can also fill out our contact form on the website for inquiries about services, pricing, or project discussions.',
      'email': 'Our email address is **info@Heditra.com**\n\nFeel free to reach out for:\n• Service inquiries\n• Project discussions\n• Pricing information\n• General questions\n\nWe typically respond within 24 hours.',
      'phone': 'You can reach us by phone at **+971 XX XXX XXXX**\n\nOur team is available to discuss:\n• Your project requirements\n• Service details\n• Consultation appointments\n• Any questions you may have',
      'location': 'Heditra is located in **Dubai, United Arab Emirates**.\n\n📍 Dubai, UAE\n\nWe serve clients across the UAE and internationally. For specific address details or to schedule a visit, please contact us at info@Heditra.com.',
      'portfolio': 'Our portfolio showcases 500+ successful projects across Software, AI, and Creative categories.\n\n**Featured Projects:**\n• Enterprise ERP Systems\n• AI-Powered CCTV Analytics\n• Corporate Brand Videos\n• E-Commerce Platforms\n• Predictive Maintenance AI\n• 3D Product Visualization\n\nYou can view detailed case studies in the Portfolio section on our homepage. Which type of project interests you?',
      'projects': 'We\'ve delivered **500+ projects** with a **98% client satisfaction rate**.\n\nOur portfolio includes:\n• Enterprise software solutions\n• AI and machine learning systems\n• Creative production work\n\nBrowse our Portfolio section on the website to see detailed case studies. What type of project are you interested in?',
      'about': '**Heditra** is a leading technology and creative solutions provider founded in 2020, based in Dubai, UAE.\n\n**Our Mission:** Empower businesses with cutting-edge technology and creative solutions that drive growth, efficiency, and innovation.\n\n**Our Impact:**\n• 500+ Projects Delivered\n• 200+ Happy Clients\n• 50+ Team Members\n• 98% Client Satisfaction\n\n**Our Values:** Innovation First, Client-Centric, Quality Excellence, Agile Delivery',
      'company': '**Heditra** (Technologies & Creative Design) is a technology and creative solutions provider based in Dubai, UAE, founded in 2020.\n\nWe specialize in:\n• Software Engineering (ERP, HRMS, Payment Systems, E-Commerce)\n• AI & Technologies (Machine Learning, IoT, Smart Systems)\n• Creative Studio (Photography, Video, 3D Animation)\n\nWith 500+ projects delivered and 98% client satisfaction, we\'re committed to delivering excellence.',
      'team': 'Heditra has a team of **50+ professionals** including:\n\n• Software Engineers\n• AI Specialists\n• Creative Directors\n• Project Managers\n\nOur diverse team brings together technical excellence and creative innovation to deliver exceptional results for our clients.',
      'experience': 'Heditra has extensive experience:\n\n• **500+ Projects Delivered**\n• **200+ Happy Clients**\n• **98% Client Satisfaction Rate**\n• **50+ Team Members**\n\nFounded in 2020, we\'ve grown into a leading provider of technology and creative solutions in the UAE and beyond.',
      'stats': '**Heditra by the Numbers:**\n\n📊 500+ Projects Delivered\n👥 200+ Happy Clients\n🤝 50+ Team Members\n⭐ 98% Client Satisfaction Rate\n\nThese numbers reflect our commitment to excellence and client success.',
      'default': 'I\'m here to help! I can answer questions about:\n\n**Services:**\n• Software Engineering (ERP, HRMS, Payment Systems, E-Commerce)\n• AI & Technologies (Machine Learning, IoT, Smart Systems)\n• Creative Studio (Photography, Video, 3D Animation)\n\n**Company Info:**\n• About Heditra\n• Portfolio & Projects\n• Contact Information\n• Pricing\n\nWhat would you like to know?'
    },
    ar: {
      'مرحبا': 'مرحباً! 👋 أهلاً بك في هادترا. أنا هنا لمساعدتك في التعرف على حلولنا التقنية والإبداعية. كيف يمكنني مساعدتك اليوم؟',
      'السلام': 'السلام عليكم! 👋 أهلاً بك في هادترا. نحن مزود رائد للحلول التقنية والإبداعية مقرنا في دبي، الإمارات العربية المتحدة. ماذا تريد أن تعرف؟',
      'أهلا': 'أهلاً وسهلاً! 👋 شكراً لتواصلك مع هادترا. أنا هنا للإجابة على أسئلتك حول خدماتنا أو محفظتنا أو الشركة. كيف يمكنني المساعدة؟',
      'كيف حالك': 'أنا بخير، شكراً لسؤالك! 😊 أنا هنا ومستعد لمساعدتك في التعرف على خدمات وحلول هادترا. كيف يمكنني مساعدتك اليوم؟',
      'ما اسمك': 'أنا مساعد هادترا الذكي! أنا هنا لمساعدتك في التعرف على حلولنا التقنية والإبداعية. ماذا تريد أن تعرف؟',
      'من أنت': 'أنا مساعد هادترا الذكي! أساعد الزوار في التعرف على خدمات هادترا ومحفظتها ومعلومات الشركة. كيف يمكنني مساعدتك اليوم؟',
      'ما كان اسمي': userName ? `اسمك ${userName}! سعيد بلقائك، ${userName}. كيف يمكنني مساعدتك اليوم؟` : 'لا أتذكر أنك أخبرتني باسمك بعد. ما اسمك؟',
      'ما اسمي': userName ? `اسمك ${userName}! كيف يمكنني مساعدتك اليوم، ${userName}؟` : 'لا أعتقد أنك أخبرتني باسمك بعد. ماذا يجب أن أناديك؟',
      'هل تتذكر اسمي': userName ? `نعم، بالطبع! اسمك ${userName}. كيف يمكنني مساعدتك اليوم، ${userName}؟` : 'أعتذر، لا أعتقد أنك أخبرتني باسمك بعد. ما اسمك؟',
      'ماذا لديك': 'تقدم هادترا ثلاث مجالات خدمات رئيسية: هندسة البرمجيات (تخطيط الموارد، الموارد البشرية، أنظمة الدفع، التجارة الإلكترونية)، الذكاء الاصطناعي والتقنيات (التعلم الآلي، إنترنت الأشياء، الأنظمة الذكية)، والاستوديو الإبداعي (التصوير، إنتاج الفيديو، الرسوم المتحركة ثلاثية الأبعاد). أي منها يهمك؟',
      'ماذا تقدم': 'نقدم حلول هندسة البرمجيات مثل أنظمة تخطيط الموارد والموارد البشرية، الذكاء الاصطناعي والتقنيات بما في ذلك التعلم الآلي وإنترنت الأشياء، بالإضافة إلى خدمات الاستوديو الإبداعي للتصوير وإنتاج الفيديو والرسوم المتحركة ثلاثية الأبعاد. ماذا تبحث عنه؟',
      'ماذا يمكنك أن تفعل': 'يمكنني مساعدتك في التعرف على خدمات هادترا ومشاريع المحفظة ومعلومات الشركة والأسعار وتفاصيل الاتصال. أنا هنا للإجابة على أي أسئلة لديك حول حلولنا التقنية والإبداعية!',
      'ما الخدمات': 'تقدم هادترا ثلاث خدمات رئيسية: هندسة البرمجيات (تخطيط الموارد، الموارد البشرية، أنظمة الدفع، التجارة الإلكترونية)، الذكاء الاصطناعي والتقنيات (التعلم الآلي، إنترنت الأشياء، الأنظمة الذكية)، والاستوديو الإبداعي (التصوير، الفيديو، الرسوم المتحركة ثلاثية الأبعاد). أي مجال يهمك؟',
      'خدمة': 'تقدم هادترا ثلاث فئات خدمات رئيسية:\n\n**1. هندسة البرمجيات**\n• أنظمة تخطيط موارد المؤسسات\n• حلول إدارة الموارد البشرية\n• أنظمة الدفع والبوابات\n• منصات التجارة الإلكترونية\n\n**2. الذكاء الاصطناعي والتقنيات**\n• حلول التعلم الآلي\n• تكامل إنترنت الأشياء\n• الأنظمة الذكية\n• التحليلات التنبؤية\n\n**3. الاستوديو الإبداعي**\n• التصوير الفوتوغرافي الاحترافي\n• إنتاج الفيديو\n• الرسوم المتحركة ثلاثية الأبعاد\n• محتوى الواقع المعزز والافتراضي\n\nأي خدمة تهمك أكثر؟',
      'خدمات': 'تقدم هادترا ثلاث فئات خدمات رئيسية:\n\n**1. هندسة البرمجيات**\n• أنظمة تخطيط موارد المؤسسات\n• حلول إدارة الموارد البشرية\n• أنظمة الدفع والبوابات\n• منصات التجارة الإلكترونية\n\n**2. الذكاء الاصطناعي والتقنيات**\n• حلول التعلم الآلي\n• تكامل إنترنت الأشياء\n• الأنظمة الذكية\n• التحليلات التنبؤية\n\n**3. الاستوديو الإبداعي**\n• التصوير الفوتوغرافي الاحترافي\n• إنتاج الفيديو\n• الرسوم المتحركة ثلاثية الأبعاد\n• محتوى الواقع المعزز والافتراضي\n\nأي خدمة تهمك أكثر؟',
      'برمجيات': 'خدمات **هندسة البرمجيات** لدينا تشمل:\n\n• أنظمة تخطيط موارد المؤسسات (ERP)\n• أنظمة إدارة الموارد البشرية (HRMS)\n• أنظمة الدفع وبوابات الدفع\n• منصات التجارة الإلكترونية والأسواق متعددة البائعين\n\nلقد أنجزنا أكثر من 500 مشروع مع معدل رضا عملاء 98%. هل تريد معرفة المزيد عن خدمة محددة؟',
      'ذكاء': 'حلول **الذكاء الاصطناعي والتقنيات** لدينا تشمل:\n\n• التعلم الآلي والتحليلات التنبؤية\n• تكامل إنترنت الأشياء والأنظمة الذكية\n• الرؤية الحاسوبية والتحليلات المدعومة بالذكاء الاصطناعي\n• حلول ذكاء اصطناعي مخصصة\n\nلقد عملنا على مشاريع مثل تحليلات كاميرات المراقبة المدعومة بالذكاء الاصطناعي وأنظمة الصيانة التنبؤية. هل أنت مهتم بمعرفة المزيد؟',
      'إبداعي': '**الاستوديو الإبداعي** لدينا يقدم:\n\n• خدمات التصوير الفوتوغرافي الاحترافية\n• إنتاج فيديو الشركات والعلامات التجارية (4K)\n• الرسوم المتحركة ثلاثية الأبعاد والتصور\n• إنشاء محتوى الواقع المعزز والافتراضي\n\nننشئ محتوى بصري عالي الجودة للعلامات التجارية والشركات. ما نوع المشروع الإبداعي الذي تفكر فيه؟',
      'سعر': 'للحصول على معلومات الأسعار، يرجى التواصل معنا مباشرة. نقدم عروض أسعار مخصصة بناءً على متطلبات واحتياجات مشروعك المحددة.\n\n📧 البريد الإلكتروني: info@Heditra.com\n📞 الهاتف: +971 XX XXX XXXX\n\nيمكنك أيضاً ملء نموذج الاتصال على موقعنا للحصول على رد أسرع!',
      'أسعار': 'تختلف الأسعار حسب نطاق المشروع والمتطلبات. نقدم حلولاً مخصصة مصممة حسب احتياجات كل عميل.\n\nللحصول على عرض أسعار مفصل، يرجى التواصل معنا:\n📧 info@Heditra.com\n📞 +971 XX XXX XXXX\n\nسنكون سعداء لمناقشة مشروعك وتقديم تقدير مخصص.',
      'تكلفة': 'أسعارنا مخصصة لكل مشروع. للحصول على عرض أسعار دقيق، يرجى مشاركة تفاصيل مشروعك معنا.\n\nتواصل معنا على:\n📧 info@Heditra.com\n📞 +971 XX XXX XXXX\n\nسنقدم تقديراً مفصلاً بناءً على متطلباتك المحددة.',
      'اتصال': 'يمكنك التواصل مع هادترا من خلال:\n\n📧 **البريد الإلكتروني:** info@Heditra.com\n📞 **الهاتف:** +971 XX XXX XXXX\n📍 **الموقع:** دبي، الإمارات العربية المتحدة\n\nيمكنك أيضاً ملء نموذج الاتصال على موقعنا للاستفسارات حول الخدمات أو الأسعار أو مناقشة المشاريع.',
      'بريد': 'عنوان بريدنا الإلكتروني هو **info@Heditra.com**\n\nلا تتردد في التواصل من أجل:\n• استفسارات الخدمات\n• مناقشة المشاريع\n• معلومات الأسعار\n• أسئلة عامة\n\nنرد عادة خلال 24 ساعة.',
      'هاتف': 'يمكنك التواصل معنا عبر الهاتف على **+971 XX XXX XXXX**\n\nفريقنا متاح لمناقشة:\n• متطلبات مشروعك\n• تفاصيل الخدمات\n• مواعيد الاستشارات\n• أي أسئلة قد تكون لديك',
      'موقع': 'هادترا موجودة في **دبي، الإمارات العربية المتحدة**.\n\n📍 دبي، الإمارات\n\nنخدم العملاء في جميع أنحاء الإمارات ودولياً. للحصول على تفاصيل العنوان المحدد أو لجدولة زيارة، يرجى التواصل معنا على info@Heditra.com.',
      'معرض': 'تعرض محفظتنا أكثر من 500 مشروع ناجح عبر فئات البرمجيات والذكاء الاصطناعي والإبداعي.\n\n**مشاريع مميزة:**\n• أنظمة تخطيط موارد المؤسسات\n• تحليلات كاميرات المراقبة المدعومة بالذكاء الاصطناعي\n• فيديوهات العلامات التجارية للشركات\n• منصات التجارة الإلكترونية\n• الذكاء الاصطناعي للصيانة التنبؤية\n• تصور المنتجات ثلاثية الأبعاد\n\nيمكنك عرض دراسات الحالة التفصيلية في قسم المحفظة على الصفحة الرئيسية. ما نوع المشروع الذي يهمك؟',
      'مشاريع': 'لقد أنجزنا **أكثر من 500 مشروع** مع **معدل رضا عملاء 98%**.\n\nمحفظتنا تشمل:\n• حلول برمجيات المؤسسات\n• أنظمة الذكاء الاصطناعي والتعلم الآلي\n• أعمال الإنتاج الإبداعي\n\nتصفح قسم المحفظة على الموقع لمشاهدة دراسات الحالة التفصيلية. ما نوع المشروع الذي يهمك؟',
      'من نحن': '**هادترا** هي مزود رائد للحلول التقنية والإبداعية تأسست في عام 2020، مقرها في دبي، الإمارات العربية المتحدة.\n\n**مهمتنا:** تمكين الشركات بالتكنولوجيا المتطورة والحلول الإبداعية التي تدفع النمو والكفاءة والابتكار.\n\n**تأثيرنا:**\n• أكثر من 500 مشروع منجز\n• أكثر من 200 عميل سعيد\n• أكثر من 50 عضو فريق\n• معدل رضا العملاء 98%\n\n**قيمنا:** الابتكار أولاً، التركيز على العميل، التميز في الجودة، التسليم السريع',
      'شركة': '**هادترا** (التقنيات والتصميم الإبداعي) هي مزود حلول تقنية وإبداعية مقرها في دبي، الإمارات العربية المتحدة، تأسست في عام 2020.\n\nنتخصص في:\n• هندسة البرمجيات (تخطيط الموارد، الموارد البشرية، أنظمة الدفع، التجارة الإلكترونية)\n• الذكاء الاصطناعي والتقنيات (التعلم الآلي، إنترنت الأشياء، الأنظمة الذكية)\n• الاستوديو الإبداعي (التصوير، الفيديو، الرسوم المتحركة ثلاثية الأبعاد)\n\nمع أكثر من 500 مشروع منجز و98% رضا العملاء، نحن ملتزمون بتقديم التميز.',
      'فريق': 'هادترا لديها فريق من **أكثر من 50 محترفاً** بما في ذلك:\n\n• مهندسو برمجيات\n• أخصائيو ذكاء اصطناعي\n• مدراء إبداعيون\n• مدراء مشاريع\n\nفريقنا المتنوع يجمع بين التميز التقني والابتكار الإبداعي لتقديم نتائج استثنائية لعملائنا.',
      'خبرة': 'هادترا لديها خبرة واسعة:\n\n• **أكثر من 500 مشروع منجز**\n• **أكثر من 200 عميل سعيد**\n• **معدل رضا العملاء 98%**\n• **أكثر من 50 عضو فريق**\n\nتأسست في عام 2020، نمت لتصبح مزوداً رائداً للحلول التقنية والإبداعية في الإمارات وخارجها.',
      'إحصائيات': '**هادترا بالأرقام:**\n\n📊 أكثر من 500 مشروع منجز\n👥 أكثر من 200 عميل سعيد\n🤝 أكثر من 50 عضو فريق\n⭐ معدل رضا العملاء 98%\n\nهذه الأرقام تعكس التزامنا بالتميز ونجاح العملاء.',
      'default': 'أنا هنا للمساعدة! يمكنني الإجابة على الأسئلة حول:\n\n**الخدمات:**\n• هندسة البرمجيات (تخطيط الموارد، الموارد البشرية، أنظمة الدفع، التجارة الإلكترونية)\n• الذكاء الاصطناعي والتقنيات (التعلم الآلي، إنترنت الأشياء، الأنظمة الذكية)\n• الاستوديو الإبداعي (التصوير، الفيديو، الرسوم المتحركة ثلاثية الأبعاد)\n\n**معلومات الشركة:**\n• حول هادترا\n• المحفظة والمشاريع\n• معلومات الاتصال\n• الأسعار\n\nماذا تريد أن تعرف؟'
    }
  };

  const langResponses = responses[language];
  
  // Check for exact phrase matches first (longer phrases have priority)
  const sortedKeywords = Object.keys(langResponses)
    .filter(k => k !== 'default')
    .sort((a, b) => b.length - a.length); // Sort by length, longest first
  
  for (const keyword of sortedKeywords) {
    if (lowerMessage.includes(keyword)) {
      return langResponses[keyword];
    }
  }
  
  return langResponses.default;
};

export const generateChatResponse = async (request: ChatRequest): Promise<ChatResponse> => {
  // Check if API key is configured
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey || apiKey.trim() === '') {
    console.warn('GROQ_API_KEY not configured, using fallback responses');
    console.warn('To enable AI responses, set GROQ_API_KEY environment variable');
    return {
      response: getFallbackResponse(request.message, request.language, request.conversationHistory),
      success: false,
      error: 'API key not configured. Please set GROQ_API_KEY environment variable to enable AI responses.'
    };
  }

  try {
    const systemPrompt = getSystemPrompt(request.language);
    const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [
      { role: 'system', content: systemPrompt }
    ];

    // Include conversation history for context awareness
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      // Include more history for better context (last 10 messages instead of 6)
      const recentHistory = request.conversationHistory.slice(-10);
      recentHistory.forEach(msg => {
        messages.push({ role: msg.role, content: msg.content });
      });
    }

    messages.push({ role: 'user', content: request.message });

    // Always try to use AI model when API key is available
    const client = getGroqClient();
    console.log('🤖 Calling Groq AI API with model:', MODEL);
    console.log('📝 Message:', request.message.substring(0, 50) + '...');
    console.log('💬 Conversation history length:', request.conversationHistory?.length || 0);
    
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: messages as any,
      temperature: 0.9, // Higher temperature for more natural, varied responses
      max_tokens: 300, // Shorter responses for more natural conversation
      top_p: 0.9, // Nucleus sampling for more diverse responses
      frequency_penalty: 0.3, // Reduce repetition
      presence_penalty: 0.3, // Encourage new topics
      stream: false
    });

    const response = completion.choices[0]?.message?.content?.trim() || '';

    if (!response) {
      console.warn('Empty response from Groq API, using fallback');
      return {
        response: getFallbackResponse(request.message, request.language, request.conversationHistory),
        success: false,
        error: 'Empty response from API'
      };
    }

    console.log('✅ Successfully received AI response:', response.substring(0, 50) + '...');
    return {
      response,
      success: true
    };
  } catch (error: any) {
    // Log the error for debugging
    console.error('❌ Error calling Groq API:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      type: error?.constructor?.name
    });
    const errorMessage = error?.message || 'Unknown error';
    
    // Only use fallback if there's an actual error
    console.warn('⚠️ Falling back to keyword-based responses due to API error');
    return {
      response: getFallbackResponse(request.message, request.language, request.conversationHistory),
      success: false,
      error: `AI API Error: ${errorMessage}. Using fallback response.`
    };
  }
};

