// src/components/DashboardClima.tsx
import React, { useState } from 'react';
import cohere from 'cohere-ai';
import CohereAssistant from './CohereAssistant';

cohere.init(import.meta.env.VITE_COHERE_API_KEY as string);

const MAX_CALLS_PER_HOUR = 20;
let callCount = 0;
let lastReset = Date.now();

function shouldResetRateLimit() {
  return Date.now() - lastReset > 60 * 60 * 1000;
}

const DashboardClima: React.FC = () => {
  const [respuesta, setRespuesta] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const preguntarCohere = async (consulta: string) => {
    if (shouldResetRateLimit()) {
      callCount = 0;
      lastReset = Date.now();
    }

    if (callCount >= MAX_CALLS_PER_HOUR) {
      setError('Límite de uso alcanzado. Intenta más tarde.');
      return;
    }

    setLoading(true);
    setError('');
    setRespuesta('');

    try {
      const res = await cohere.chat({
        message: `Responde esta pregunta relacionada al clima: ${consulta}`,
        connectors: [{ id: 'web-search' }],
        temperature: 0.4,
        max_tokens: 300
      });

      if (res.statusCode !== 200) {
        throw new Error(`Código HTTP: ${res.statusCode}`);
      }

      if (res.body && res.body.text) {
        setRespuesta(res.body.text);
        callCount++;
      } else {
        throw new Error('Respuesta malformada de la API');
      }
    } catch (err: any) {
      console.error(err);
      setError('Error al comunicarse con Cohere: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Clima</h1>

      <CohereAssistant onAsk={preguntarCohere} loading={loading} error={error} />

      {respuesta && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-semibold mb-2">Respuesta de Cohere:</h3>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardClima;
