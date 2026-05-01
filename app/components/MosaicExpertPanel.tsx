import React, { useState } from 'react';
import { MessageSquare, X, ChevronRight, Calculator, Info, Phone } from 'lucide-react';
import { useChat } from '@ai-sdk/react';

export const MosaicExpertPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      {/* 1. Кнопка-триггер (Floating Button) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#cc0000] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <MessageSquare size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
            ИИ-Эксперт
          </span>
        </button>
      )}

      {/* 2. Боковая панель (Side-Panel) */}
      <div className={`fixed top-0 right-0 h-full z-[10000] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out ${isOpen ? 'w-[400px]' : 'w-0 overflow-hidden'}`}>
        
        {/* Шапка панели */}
        <div className="bg-[#1a1a1a] p-5 text-white flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-['Oswald'] uppercase tracking-wider text-sm">ИИ-Эксперт по мозаике</h3>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Мастер-консультант Новой Мозаики</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        {/* 3. Дашборд мастера (Результаты расчетов) */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-[#cc0000] mb-3">
            <Calculator size={16} />
            <span className="text-xs font-bold uppercase tracking-tighter">Текущий расчет проекта</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white p-2 rounded border border-gray-100">
              <p className="text-gray-400 mb-1 uppercase">Площадь (с запасом)</p>
              <p className="font-bold text-sm">-- м²</p>
            </div>
            <div className="bg-white p-2 rounded border border-gray-100">
              <p className="text-gray-400 mb-1 uppercase">Кол-во сеток</p>
              <p className="font-bold text-sm">-- шт.</p>
            </div>
          </div>
        </div>

        {/* Окно чата */}
        <div className="flex flex-col h-[calc(100%-220px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.length === 0 && (
              <div className="text-center py-10 opacity-50">
                <Info size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Здравствуйте! Я помогу вам подобрать мозаику и рассчитать её количество. С чего начнем?</p>
              </div>
            )}
            {messages.map(m => (
  <div 
    key={m.id} 
    className={`p-4 mb-4 rounded-lg ${
      m.role === 'user' 
        ? 'bg-red-50 text-red-900 ml-4' // Сообщение пользователя
        : 'bg-white text-slate-800 border border-gray-200 mr-4' // Ответ ИИ
    }`}
  >
    <span className="font-bold block mb-1">
      {m.role === 'user' ? 'Вы:' : 'Эксперт:'}
    </span>
    {m.content}
  </div>
))}
          </div>

          {/* Поле ввода */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Задайте вопрос мастеру..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc0000]/20 focus:border-[#cc0000] transition-all text-sm"
              />
              <button type="submit" className="absolute right-2 top-1.5 p-2 text-[#cc0000] hover:bg-red-50 rounded-lg transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};