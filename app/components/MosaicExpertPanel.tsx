'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useChat } from 'ai/react';

export default function MosaicExpertPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Стандартный хук чата
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10000 }}>
      {/* Кнопка-пузырь */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#cc0000] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
          style={{ border: 'none', cursor: 'pointer' }}
        >
          <MessageSquare size={24} />
          <span className="font-bold">ИИ-Эксперт</span>
        </button>
      )}

      {/* Окно чата */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transition-all duration-300 flex flex-col ${
          isOpen ? 'w-full md:w-[400px]' : 'w-0 overflow-hidden'
        }`}
      >
        {/* Шапка */}
        <div className="bg-[#1a1a1a] p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-sm tracking-wider">MOSAIC EXPERT</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="text-center mt-10">
              <div className="text-4xl mb-4">🎨</div>
              <p className="text-gray-500 text-sm px-10">
                Привет! Я помогу рассчитать мозаику и подобрать дизайн. Что планируете облицевать?
              </p>
            </div>
          )}
          {messages.map(m => (
            <div 
              key={m.id} 
              className={`p-3 rounded-2xl max-w-[85%] ${
                m.role === 'user' 
                ? 'bg-[#cc0000] text-white ml-auto rounded-tr-none' 
                : 'bg-white text-black mr-auto shadow-sm border border-gray-100 rounded-tl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{m.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="text-xs text-gray-400 animate-pulse">Эксперт печатает...</div>
          )}
        </div>

        {/* Поле ввода */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Напишите сообщение..."
            className="flex-1 p-3 bg-gray-100 rounded-xl text-black outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-[#cc0000] text-white p-3 rounded-xl disabled:bg-gray-300 hover:bg-red-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}