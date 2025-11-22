import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import { type Language } from '@/lib/i18n';

interface ChatbotWidgetProps {
  language: Language;
  isOpenExternal?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const getApiUrl = (): string => {
  if (typeof window === 'undefined') return '';
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    return 'http://localhost:5000/api/chat';
  }
  
  const productionApiUrl = import.meta.env.VITE_API_URL || 'https://haditra.onrender.com';
  return `${productionApiUrl}/api/chat`;
};

export default function ChatbotWidget({ language, isOpenExternal, onOpenChange }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use external control if provided, otherwise use internal state
  const isOpenControlled = isOpenExternal !== undefined;
  const currentIsOpen = isOpenControlled ? isOpenExternal : isOpen;
  
  const handleToggle = (open: boolean) => {
    if (isOpenControlled && onOpenChange) {
      onOpenChange(open);
    } else {
      setIsOpen(open);
    }
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? 'Hi! 👋 How can I help you today?'
        : 'مرحباً! 👋 كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentIsOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIsOpen]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    const currentMessage = inputValue.trim();
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .filter(msg => msg.id !== '1')
        .map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.text
        }));

      const apiUrl = getApiUrl();
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          language,
          conversationHistory: conversationHistory.slice(-6)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.response || errorData.error || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (!data || typeof data.response !== 'string') {
        throw new Error('Invalid response format');
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error';
      const isNetworkError = errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('Failed') || errorMessage.includes('CORS') || errorMessage.includes('ERR_');
      
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: isNetworkError
          ? (language === 'en' 
              ? 'Unable to connect to the server. Please check your connection and try again.'
              : 'تعذر الاتصال بالخادم. يرجى التحقق من الاتصال والمحاولة مرة أخرى.')
          : (language === 'en' 
              ? 'I apologize, but I encountered an error. Please try again or contact us directly at info@haditra.com.'
              : 'أعتذر، لكنني واجهت خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة على info@haditra.com.'),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, language, messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!currentIsOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleToggle(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-none bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center text-primary-foreground border border-primary/50"
          aria-label="Open chatbot"
        >
          <Bot className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chatbot Widget */}
      <AnimatePresence>
        {currentIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-background rounded-none shadow-2xl flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between border-b border-primary/50">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-foreground" />
                <h3 className="text-primary-foreground font-semibold text-base">AI Assistant</h3>
              </div>
              <button
                onClick={() => handleToggle(false)}
                className="text-primary-foreground hover:bg-primary-foreground/10 rounded-none p-1 transition-colors"
                aria-label="Close chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-none px-4 py-2.5 ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'bg-card text-card-foreground shadow-sm border border-border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card text-card-foreground shadow-sm border border-border rounded-none px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4 bg-background">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Type your message...' : 'اكتب رسالتك...'}
                  className="flex-1 px-4 py-2.5 border border-border rounded-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm text-foreground bg-background placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-none bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/30 border border-primary/50"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

