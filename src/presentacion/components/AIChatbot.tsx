import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageCircle } from 'lucide-react';
import { AI_SUGGESTIONS, AI_RESPONSES } from '../../ingesta/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu **Consultor IA de Box Studio**. Tengo acceso a todos tus datos de Metricool y Asana de este mes. ¿Qué te gustaría saber?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
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
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = AI_RESPONSES[text.trim()] || 
        `🤔 Excelente pregunta. Basándome en tus datos de este mes:\n\n• **ROAS actual:** 5.2x (+18.2% vs mayo)\n• **CPA:** $7.2 (récord más bajo)\n• **Engagement:** 7.8%\n\nTu cuenta está en un momento de crecimiento sostenido. ¿Te gustaría que profundice en alguno de estos indicadores?`;

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold">$1</strong>')
      .replace(/\n/g, '<br />')
      .replace(/\|(.+)\|/g, (match) => `<span class="font-mono text-xs">${match}</span>`);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        id="ai-chatbot-fab"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full 
          bg-gradient-to-br from-brand-500 to-brand-700 text-white
          shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40
          hover:scale-110 active:scale-95 transition-all duration-300
          flex items-center justify-center group
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Abrir consultor IA"
      >
        <Bot size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse border-2 border-white" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-8 right-8 z-50 w-[420px] max-h-[640px] 
          flex flex-col rounded-[32px] overflow-hidden
          bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700
          shadow-2xl shadow-surface-900/10
          transition-all duration-500 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-surface-900 to-surface-800 dark:from-surface-700 dark:to-surface-800 p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-sm tracking-tight">Consultor IA</h4>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-surface-400 text-[10px] font-bold uppercase tracking-widest">Online • 24/7</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-surface-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-surface-900 dark:bg-brand-600 text-white rounded-br-md'
                  : 'bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-surface-100 rounded-bl-md'
              }`}>
                <p
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                />
                <span className="text-[9px] opacity-50 mt-1 block">
                  {msg.timestamp.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-surface-50 dark:bg-surface-700 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {AI_SUGGESTIONS.slice(0, 3).map((sug) => (
              <button
                key={sug}
                onClick={() => sendMessage(sug)}
                className="px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 
                  text-brand-600 dark:text-brand-400 text-[10px] font-bold
                  hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors
                  flex items-center gap-1"
              >
                <MessageCircle size={10} />
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-surface-100 dark:border-surface-700 shrink-0">
          <div className="flex items-center gap-2 bg-surface-50 dark:bg-surface-900 rounded-2xl p-1.5">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregúntale a tu consultor IA..."
              className="flex-1 bg-transparent px-3 py-2.5 text-sm font-medium 
                text-surface-900 dark:text-white placeholder:text-surface-400
                outline-none"
              disabled={isTyping}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-surface-900 dark:bg-brand-600 text-white
                hover:bg-surface-800 dark:hover:bg-brand-700 transition-all
                disabled:opacity-30 disabled:cursor-not-allowed
                active:scale-95"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
