'use client';

import React, { useState, useEffect } from 'react';

export default function MosaicExpertPanel() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '20px' }}
      >
        {isOpen ? 'Закрыть тест' : 'Нажми меня (Тест)'}
      </button>

      {isOpen && (
        <div style={{ marginTop: '10px', padding: '20px', background: 'white', border: '1px solid black', color: 'black' }}>
          Работает!
        </div>
      )}
    </div>
  );
}