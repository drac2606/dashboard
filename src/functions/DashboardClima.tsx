// src/components/DashboardClima.tsx
import React, { useState } from "react";
import { cohereChat } from "../services/cohereChat";

const MAX_CALLS_PER_HOUR = 20;
let callCount = 0;
let lastReset = Date.now();

function shouldResetRateLimit() {
  return Date.now() - lastReset > 60 * 60 * 1000;
}

const DashboardClima: React.FC = () => {
  const [consulta, setConsulta] = useState<string>("");
  const [respuesta, setRespuesta] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_COHERE_API_KEY as string;

  const preguntarCohere = async () => {
    if (!consulta.trim()) return;

    if (shouldResetRateLimit()) {
      callCount = 0;
      lastReset = Date.now();
    }

    if (callCount >= MAX_CALLS_PER_HOUR) {
      setError("Límite de uso alcanzado. Intenta más tarde.");
      return;
    }

    setLoading(true);
    setError("");
    setRespuesta("");

    try {
      const respuestaAPI = await cohereChat(
        `Responde esta pregunta relacionada al clima: ${consulta.trim()}`,
        apiKey
      );

      setRespuesta(respuestaAPI);
      callCount++;
    } catch (err: any) {
      setError("Error al comunicarse con Cohere: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard Clima</h1>

      <input
        type="text"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        placeholder="Pregunta sobre el clima..."
        className="w-full p-2 border rounded"
        onKeyDown={(e) => { if (e.key === "Enter") preguntarCohere(); }}
      />

      <button
        onClick={preguntarCohere}
        disabled={loading || !consulta.trim()}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Consultando..." : "Preguntar"}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {respuesta && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-semibold mb-2">Respuesta de Cohere:</h3>
          <p>{respuesta}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardClima;
