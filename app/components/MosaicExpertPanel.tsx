'use client';

import React, { useState, useEffect } from 'react';

export function MosaicExpertPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Это предотвращает ошибку "Hydration failed"
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 10000 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#cc0000',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          Чат с ИИ
        </button>
      ) : (
        <div style={{
          width: '320px',
          height: '400px',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <span>ИИ-Эксперт</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ flex: 1, padding: '15px', color: '#333' }}>
            <p>Страница загружена успешно!</p>
            <p style={{ fontSize: '12px', color: '#666' }}>Теперь мы знаем, что каркас сайта работает. Сейчас нужно будет установить библиотеки для ИИ.</p>
          </div>
        </div>
      )}
    </div>
  );
}