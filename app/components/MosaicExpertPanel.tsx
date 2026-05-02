'use client';

import React, { useState } from 'react';
import { useChat } from 'ai/react';

export const MosaicExpertPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Добавляем обработку ошибок прямо в хук
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onError: (err) => {
      console.error('Chat error detail:', err);
    }
  });

  return (
    <div style={{ position: 'relative', zIndex: 9999 }}>
      {/* Кнопка открытия */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#cc0000] text-white p-4 rounded-full shadow-lg flex items-center gap-2"
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <span>💬</span>
          <span className="font-medium">ИИ-Эксперт</span>
        </button>
      )}

      {/* Сама панель */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? 'w-full md:w-[400px]' : 'w-0 overflow-hidden'
        }`}
        style={{ zIndex: 10000 }}
      >
        <div className="bg-[#1a1a1a] p-5 text-white flex justify-between items-center">
          <span className="font-bold uppercase text-sm">Чат с экспертом</span>
          <button onClick={() => setIsOpen(false)} className="text-white bg-transparent border-none text-xl cursor-pointer">✕</button>
        </div>

        <div className="flex flex-col h-[calc(100%-70px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-gray-400 text-sm italic">Здравствуйте! Я помогу рассчитать количество мозаики. Что вас интересует?</p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-red-50 text-black ml-auto' : 'bg-gray-100 text-black mr-auto'}`} style={{ maxWidth: '85%' }}>
                {m.content}
              </div>
            ))}
            {error && (
              <div className="p-2 bg-red-100 text-red-700 text-xs rounded">
                Ошибка связи. Проверьте VPN или ключ API.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-2 bg-white">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Спросите про мозаику..."
              className="flex-1 p-3 bg-gray-50 border rounded-xl text-black outline-none"
              style={{ minWidth: '0' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-[#cc0000] text-white p-3 rounded-xl disabled:bg-gray-300 border-none cursor-pointer"
            >
              ➔
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};