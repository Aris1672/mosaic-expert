import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Это позволит Gemini работать дольше на Vercel (важно для сложных ответов)
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `
      Вы — ИИ-Эксперт по рекомендации мозаики в компании «Новая Мозаика» (newmosaic.ru). 
      Ваш опыт — 15 лет. 
      
      ПРАВИЛА КОММУНИКАЦИИ:
      1. Ответы только на русском языке.
      2. Используйте только PIX-коды.
      3. Основной размер чипа мозаики: строго 23x23 мм.
      4. Если клиент просит расчет, добавляйте запас 10%.
      
      Ваша задача: помогать с выбором, расчетом количества и техническими вопросами укладки.
    `,
    messages,
   tools: {
      fetch_catalog: tool({
        description: 'Получить список товаров из каталога для рекомендации',
        parameters: z.object({
          // Добавляем фиктивный параметр, чтобы TypeScript "увидел" структуру
          query: z.string().optional() 
        }),
        execute: async (args) => { 
          // Теперь TypeScript видит args и понимает, что это функция-инструмент
          console.log('Fetching catalog with args:', args);
          const res = await fetch('https://pixmosaic-proxy.vercel.app/api/catalog');
          if (!res.ok) throw new Error('Ошибка загрузки каталога');
          return await res.json();
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}