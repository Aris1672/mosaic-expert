'use client';

import React, { useState, useEffect } from 'react';

export default function MosaicExpertPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          backgroundColor: '#cc0000', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '20px',
          cursor: 'pointer'
        }}
      >
        {isOpen ? 'Закрыть тест' : 'Нажми меня (Тест)'}
      </button>

      {isOpen && (
        <div style={{ 
          marginTop: '10px', 
          padding: '20px', 
          background: 'white', 
          border: '2px solid red',
          color: 'black' 
        }}>
          <p>Если вы видите это, значит базовый React в порядке!</p>
        </div>
      )}
    </div>
  );
}