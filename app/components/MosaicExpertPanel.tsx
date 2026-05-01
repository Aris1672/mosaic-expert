import React, { useState } from 'react';
import { MessageSquare, X, ChevronRight, Calculator, Info } from 'lucide-react';
import { useChat } from '@ai-sdk/react';

export const MosaicExpertPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // ДОБАВЛЕНО: Извлекаем append и setInput для ручного управления отправкой
  const { messages, input, setInput, handleInputChange, isLoading, append } = useChat();

  // 100% надежный обработчик, который не зависит от HTML-форм
  const handleManualSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Принудительно отправляем сообщение
    append({
      role: 'user',
      content: input,
    });

    // Очищаем поле
    setInput('');
  };

  return (
    <>
      {/* 1. Кнопка-триггер */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-[#cc0000] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <MessageSquare size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
            ИИ-Эксперт
          </span>
        </button>
      )}

      {/* 2. Боковая панель */}
      <div 
        className={`fixed top-0 right-0 h-full z-[10000] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out ${isOpen ? 'w-[400px]' : 'w-0 overflow-hidden'}`}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        
        {/* Шапка панели */}
        <div className="bg-[#1a1a1a] p-5 text-white flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-['Oswald'] uppercase tracking-wider text-sm text-white">ИИ-Эксперт по мозаике</h3>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Мастер-консультант Новой Мозаики</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* 3. Дашборд мастера */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-[#cc0000] mb-3 font-bold">
            <Calculator size={16} />
            <span className="text-xs uppercase tracking-tighter">Текущий расчет проекта</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white p-2 rounded border border-gray-100">
              <p className="text-gray-500 mb-1 uppercase">Площадь (с запасом)</p>
              <p className="font-bold text-sm text-black">-- м²</p>
            </div>
            <div className="bg-white p-2 rounded border border-gray-100">
              <p className="text-gray-500 mb-1 uppercase">Кол-во сеток</p>
              <p className="font-bold text-sm text-black">-- шт.</p>
            </div>
          </div>
        </div>

        {/* Окно чата */}
        <div className="flex flex-col h-[calc(100%-220px)] bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.length === 0 && (
              <div className="text-center py-10 opacity-70">
                <Info size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Я помогу вам подобрать мозаику. С чего начнем?</p>
              </div>
            )}
            
            {messages.map(m => (
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
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                Мастер изучает каталог...
              </div>
            )}
          </div>

          {/* ИЗМЕНЕНО: Больше нет тега <form>. Используем <div> */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Блокируем стандартный Enter
                    handleManualSubmit(); // Вызываем нашу функцию
                  }
                }}
                placeholder="Задайте вопрос мастеру..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 focus:border-[#cc0000] transition-all text-sm text-gray-900"
                style={{ color: '#1a1a1a' }}
              />
              <button 
                onClick={handleManualSubmit}
                type="button" // КРИТИЧЕСКИ ВАЖНО: Это больше не кнопка 'submit'
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1.5 p-2 text-[#cc0000] hover:bg-red-50 disabled:opacity-30 rounded-lg transition"
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