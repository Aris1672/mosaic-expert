import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({ // Убрали await здесь
    model: google('gemini-1.5-flash'),
    // ВАЖНО: позволяем модели сделать до 5 шагов (вызвать инструмент + ответить текстом)
    maxSteps: 5, 
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
          query: z.string().optional() 
        }),
        execute: async (args) => { 
          console.log('Fetching catalog with args:', args);
          try {
            const res = await fetch('https://pixmosaic-proxy.vercel.app/api/catalog');
            if (!res.ok) throw new Error('Ошибка загрузки каталога');
            return await res.json();
          } catch (error) {
            console.error('Tool Error:', error);
            return { error: 'Не удалось загрузить каталог' };
          }
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}