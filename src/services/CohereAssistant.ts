import cohere from 'cohere-ai';

const MAX_CALLS_PER_HOUR = 20;
let callCount = 0;
let lastReset = Date.now();

cohere.init(import.meta.env.VITE_COHERE_API_KEY || '');

function resetCounterIfNeeded() {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  if (now - lastReset > oneHour) {
    callCount = 0;
    lastReset = now;
  }
}

export async function askWeatherAssistant(question: string): Promise<{ answer?: string; error?: string }> {
  resetCounterIfNeeded();

  if (callCount >= MAX_CALLS_PER_HOUR) {
    return { error: 'Límite de llamadas a la API alcanzado. Intente más tarde.' };
  }

  try {
    const response = await cohere.chat({
      message: question,
      model: 'command-r-plus',
      temperature: 0.5,
      max_tokens: 100,
    });

    callCount++;
    return { answer: response.body.text };
  } catch (error) {
    console.error('Error en Cohere:', error);
    return { error: 'Error al obtener respuesta del asistente.' };
  }
}
