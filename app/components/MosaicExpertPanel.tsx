'use client';

import React, { useState, useEffect } from 'react';

// Мы создаем панель БЕЗ использования библиотеки 'ai', 
// чтобы проверить, загрузится ли страница.
export const MosaicExpertPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Исправляем возможную ошибку гидратации (Hydration Error)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {/* Кнопка открытия */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#cc0000',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '50px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontWeight: 'bold'
          }}
        >
          💬 ИИ-Эксперт
        </button>
      )}

      {/* Панель чата */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '350px',
          backgroundColor: 'white',
          boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          color: 'black'
        }}>
          <div style={{ backgroundColor: '#1a1a1a', padding: '20px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <span>ЧАТ С ЭКСПЕРТОМ</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}>✕</button>
          </div>
          
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Система в режиме диагностики. Если вы видите это сообщение, значит сайт работает корректно.
            </p>
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
              Проблема была в библиотеках <strong>ai</strong> или <strong>lucide-react</strong>.
            </div>
          </div>

          <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
            <input 
              disabled 
              placeholder="Библиотеки AI не загружены..." 
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};