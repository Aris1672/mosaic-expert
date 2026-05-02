'use client';

import React, { useState } from 'react';
import { MessageSquare, X, ChevronRight } from 'lucide-react';
import { useChat } from '@ai-sdk/react';

export const MosaicExpertPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Используем стандартный handleSubmit из useChat
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="ai-expert-wrapper">
      {/* Кнопка-триггер */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] bg-[#cc0000] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="font-medium">ИИ-Эксперт</span>
        </button>
      )}

      {/* Панель */}
      <div 
        className={`fixed top-0 right-0 h-full z-[10000] bg-white shadow-2xl transition-all duration-500 ${isOpen ? 'w-[400px]' : 'w-0 overflow-hidden'}`}
      >
        {/* Шапка */}
        <div className="bg-[#1a1a1a] p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold uppercase text-sm">ИИ-Эксперт</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Контейнер чата */}
        <div className="flex flex-col h-[calc(100%-70px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map(m => (
              <div key={m.id} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-red-50 ml-6 text-right text-black' : 'bg-gray-100 mr-6 text-black'}`}>
                <p className="text-sm">{m.content}</p>
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-400">Кубик думает...</div>}
          </div>

          {/* Форма ввода */}
          <div className="p-4 border-t border-gray-100">
            <form onSubmit={handleSubmit} className="relative flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Задайте вопрос..."
                className="w-full p-3 bg-gray-50 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-[#cc0000] text-white p-3 rounded-xl disabled:bg-gray-400 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};