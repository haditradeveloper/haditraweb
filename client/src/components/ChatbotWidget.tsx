import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { type Language } from '@/lib/i18n';
import Logo from '@/components/Logo';

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
  
  const productionApiUrl = import.meta.env.VITE_API_URL || 'https://Heditra.onrender.com';
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
              ? 'I apologize, but I encountered an error. Please try again or contact us directly at info@Heditra.com.'
              : 'أعتذر، لكنني واجهت خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة على info@Heditra.com.'),
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
          initial={{ scale: 0, rotate: -180, y: 20 }}
          animate={{ 
            scale: 1, 
            rotate: 0, 
            y: [0, -8, 0],
          }}
          whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleToggle(true)}
          className="fixed z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all flex items-center justify-center text-primary-foreground relative overflow-hidden group"
          aria-label="Open chatbot"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 50,
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)',
          }}
          transition={{
            scale: { duration: 0.5, type: 'spring', stiffness: 300 },
            rotate: { duration: 0.5, type: 'spring', stiffness: 300 },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-75"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.75, 0.4, 0.75],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Additional pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Logo 
              size="sm" 
              showGlow={false}
              className="relative z-10"
            />
          </motion.div>
        </motion.button>
      )}

      {/* Chatbot Widget */}
      <AnimatePresence>
        {currentIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotateY: 0,
            }}
            exit={{ 
              opacity: 0, 
              y: 50, 
              scale: 0.8, 
              rotateY: 15,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              duration: 0.5, 
              type: 'spring', 
              stiffness: 400, 
              damping: 25 
            }}
            className="fixed bottom-6 right-6 z-50 w-80 max-h-[500px] h-[500px] flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 3, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.2), inset 0 0 60px rgba(16, 185, 129, 0.1)',
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.3), rgba(251, 191, 36, 0.2), transparent 70%)',
              }}
              animate={{
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Header */}
            <div 
              className="px-5 py-4 flex items-center justify-between relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)',
                borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.2)',
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative overflow-hidden"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                    boxShadow: [
                      '0 0 12px rgba(16, 185, 129, 0.5)',
                      '0 0 20px rgba(16, 185, 129, 0.7)',
                      '0 0 12px rgba(16, 185, 129, 0.5)',
                    ],
                  }}
                  transition={{
                    scale: { duration: 0.5, type: 'spring', stiffness: 300 },
                    rotate: { duration: 0.5, type: 'spring', stiffness: 300 },
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Logo 
                      size="sm" 
                      showGlow={false}
                      className="relative z-10"
                    />
                  </motion.div>
                </motion.div>
                <div>
                  <h3 className="text-primary-foreground font-bold text-base gradient-text" style={{ WebkitTextFillColor: 'hsl(var(--primary-foreground))' }}>
                    AI Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <motion.button
                onClick={() => handleToggle(false)}
                className="text-muted-foreground hover:text-foreground rounded-full p-2 transition-all hover:bg-primary/10 relative group"
                aria-label="Close chatbot"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 relative z-10" style={{ background: 'transparent' }}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    className={`max-w-[80%] px-4 py-3 relative ${
                      message.isUser
                        ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                        : 'glass-morphism text-card-foreground border border-primary/20'
                    }`}
                    style={{
                      borderRadius: message.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      boxShadow: message.isUser
                        ? '0 4px 15px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.2)'
                        : '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.05)',
                    }}
                    initial={{ opacity: 0, x: message.isUser ? 20 : -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 20,
                      delay: index * 0.05 
                    }}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed relative z-10">{message.text}</p>
                    {message.isUser && (
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-20"
                        style={{
                          background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.3), transparent)',
                        }}
                        animate={{
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex justify-start"
                >
                  <div 
                    className="glass-morphism border border-primary/20 px-4 py-3"
                    style={{
                      borderRadius: '16px 16px 16px 4px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.05)',
                    }}
                  >
                    <div className="flex gap-2">
                      <motion.div
                        className="w-2.5 h-2.5 bg-primary rounded-full"
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0,
                        }}
                        style={{
                          boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
                        }}
                      />
                      <motion.div
                        className="w-2.5 h-2.5 bg-accent rounded-full"
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                        style={{
                          boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)',
                        }}
                      />
                      <motion.div
                        className="w-2.5 h-2.5 bg-primary rounded-full"
                        animate={{
                          y: [0, -8, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                        style={{
                          boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div 
              className="p-4 relative z-10"
              style={{
                borderTop: '1px solid rgba(16, 185, 129, 0.2)',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
              }}
            >
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={language === 'en' ? 'Type your message...' : 'اكتب رسالتك...'}
                    className="w-full px-4 py-3 border rounded-none focus:outline-none text-sm text-foreground bg-background/50 backdrop-blur-sm placeholder:text-muted-foreground transition-all"
                    style={{
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.6)';
                      e.target.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all relative overflow-hidden group"
                  aria-label="Send message"
                  style={{
                    background: inputValue.trim()
                      ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))'
                      : 'rgba(16, 185, 129, 0.2)',
                    boxShadow: inputValue.trim()
                      ? '0 4px 20px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.3)'
                      : 'none',
                  }}
                  whileHover={inputValue.trim() ? { scale: 1.1 } : {}}
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                >
                  {inputValue.trim() && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-75"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.75, 0.5, 0.75],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                  <motion.div
                    animate={inputValue.trim() ? {
                      rotate: [0, 10, -10, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Send className={`w-5 h-5 relative z-10 transition-transform group-hover:translate-x-0.5 ${inputValue.trim() ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

