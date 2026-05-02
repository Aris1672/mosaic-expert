'use client';

import React, { useState } from 'react';
import { MessageSquare, X, ChevronRight } from 'lucide-react';
import { useChat } from 'ai/react'; // Исправленный путь импорта

export const MosaicExpertPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="ai-expert-wrapper">
      {/* Кнопка открытия */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[50] bg-[#cc0000] text-white p-4 rounded-full shadow-lg flex items-center gap-2"
        >
          <MessageSquare size={24} />
          <span className="font-medium text-white">ИИ-Эксперт</span>
        </button>
      )}

      {/* Сама панель */}
      <div 
        className={`fixed top-0 right-0 h-full z-[100] bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? 'w-full md:w-[400px]' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="bg-[#1a1a1a] p-5 text-white flex justify-between items-center">
          <span className="font-bold uppercase text-sm">Чат с экспертом</span>
          <button onClick={() => setIsOpen(false)}><X size={20} /></button>
        </div>

        <div className="flex flex-col h-[calc(100%-70px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-red-50 text-black text-right' : 'bg-gray-100 text-black'}`}>
                {m.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Спросите про мозаику..."
              className="flex-1 p-3 bg-gray-50 border rounded-xl text-black outline-none"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-[#cc0000] text-white p-3 rounded-xl disabled:bg-gray-300"
            >
              <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};