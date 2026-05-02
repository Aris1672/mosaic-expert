'use client';

import dynamic from 'next/dynamic';

// Используем динамический импорт для чата. 
// { ssr: false } — это «магическая таблетка», которая лечит зависание прелоадера
const MosaicExpertPanel = dynamic(
  () => import('./components/MosaicExpertPanel').then((mod) => mod.MosaicExpertPanel),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Секция заголовка лендинга */}
      <section className="p-10 border-b border-gray-100">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-[#1a1a1a]">
          Новая Мозаика
        </h1>
        <p className="mt-2 text-gray-500">
          Премиальная мозаика и профессиональные расчеты.
        </p>
      </section>

      {/* Основной контент страницы будет здесь */}
      <div className="flex items-center justify-center h-[50vh] text-gray-300 italic">
        Контент вашего лендинга...
      </div>

      {/* Наш ИИ-Эксперт загрузится только на стороне клиента */}
      <MosaicExpertPanel />
    </main>
  );
}