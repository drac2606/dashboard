// src/components/CohereAssistant.tsx
import React, { useState } from 'react';

interface Props {
  onAsk: (query: string) => void;
  loading: boolean;
  error: string;
}

const CohereAssistant: React.FC<Props> = ({ onAsk, loading, error }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) onAsk(query.trim());
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Asistente de Clima (Cohere)</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="¿Cuál es el clima en Quito hoy?"
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !query.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Consultando...' : 'Preguntar'}
      </button>

      {error && (
        <div className="bg-red-100 p-3 rounded border border-red-400 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CohereAssistant;
