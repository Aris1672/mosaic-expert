import React, { useState, useEffect } from 'react';
import { MessageSquare, X, ChevronRight, Calculator, Info } from 'lucide-react';
import { useChat } from '@ai-sdk/react';

export const MosaicExpertPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Инициализируем чат
  const { messages, input, setInput, handleInputChange, isLoading, append } = useChat({
    api: '/api/chat', // Явно указываем путь к API
    onError: (error) => {
      console.error('Chat Error:', error);
    }
  });

  // Ждем монтирования компонента, чтобы избежать ошибок гидратации в Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleManualSubmit = async (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!input.trim() || isLoading) return;

    try {
      await append({
        role: 'user',
        content: input,
      });
      setInput('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  // Если компонент еще не загрузился в браузере, ничего не рендерим
  if (!mounted) return null;

  return (
    <>
      {/* Кнопка-триггер */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-[#cc0000] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <MessageSquare size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
            ИИ-Эксперт
          </span>
        </button>
      )}

      {/* Боковая панель */}
      <div 
        className={`fixed top-0 right-0 h-full z-[10000] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out ${isOpen ? 'w-[400px]' : 'w-0 overflow-hidden'}`}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        <div className="bg-[#1a1a1a] p-5 text-white flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-sans font-bold uppercase tracking-wider text-sm">ИИ-Эксперт Новая Мозаика</h3>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Консультация онлайн</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition p-1">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-80px)] bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* ЗАЩИТА: Добавляем проверку на существование messages */}
            {(!messages || messages.length === 0) && !isLoading && (
              <div className="text-center py-10 opacity-70">
                <Info size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 px-10">Привет! Я помогу рассчитать нужное количество мозаики и выбрать дизайн. Что вас интересует?</p>
              </div>
            )}
            
            {/* ЗАЩИТА: Используем опциональную цепочку ?.map */}
            {messages?.map(m => (
              <div 
                key={m.id} 
                className={`p-4 rounded-xl shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-red-600 text-white ml-6' 
                    : 'bg-gray-100 text-gray-900 border border-gray-200 mr-6'
                }`}
                style={{ color: m.role === 'user' ? '#ffffff' : '#1a1a1a' }}
              >
                <span className="font-bold block text-[10px] uppercase tracking-widest mb-1 opacity-70">
                  {m.role === 'user' ? 'Вы' : 'Эксперт'}
                </span>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs pl-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                Эксперт пишет ответ...
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    handleManualSubmit();
                  }
                }}
                placeholder="Напишите сообщение..."
                className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 text-gray-900 text-sm"
                style={{ color: '#1a1a1a' }}
              />
              <button 
                onClick={handleManualSubmit}
                type="button"
                disabled={!input.trim() || isLoading}
                className="bg-[#cc0000] text-white p-3 rounded-xl hover:bg-red-700 disabled:opacity-30 transition flex-shrink-0"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};