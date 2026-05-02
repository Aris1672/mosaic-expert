'use client';

import dynamic from 'next/dynamic';

// Правильный способ импорта для "export default" компонента
const MosaicExpertPanel = dynamic(
  () => import('./components/MosaicExpertPanel'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Ваш существующий контент лендинга */}
      <section className="p-10 border-b">
        <h1 className="text-4xl font-bold text-black">Новая Мозаика</h1>
      </section>

      {/* Вызов компонента */}
      <MosaicExpertPanel />
    </main>
  );
}