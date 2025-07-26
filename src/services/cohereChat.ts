// src/services/cohereChat.ts
export async function cohereChat(query: string, apiKey: string): Promise<string> {
  const url = 'https://api.cohere.com/v2/generate';

  // Configuración para el endpoint de generación
  const body = {
    model: "command",
    prompt: `Eres un asistente experto en meteorología y clima. Responde en español de manera amigable y educativa a esta pregunta: ${query}`,
    temperature: 0.7,
    max_tokens: 500,
    k: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      let errorMessage = `Error HTTP: ${res.status}`;
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (parseError) {
        // Error al parsear la respuesta de error
      }
      
      // Manejo específico de errores comunes
      if (res.status === 401) {
        throw new Error('API key inválida. Verifica tu configuración.');
      } else if (res.status === 429) {
        throw new Error('Límite de uso alcanzado. Intenta más tarde.');
      } else if (res.status === 400) {
        throw new Error(`Solicitud inválida: ${errorMessage}`);
      } else {
        throw new Error(`Error del servidor: ${errorMessage}`);
      }
    }

    const data = await res.json();
    
    // Para el endpoint de generación, la respuesta está en generations[0].text
    if (data.generations && data.generations.length > 0 && data.generations[0].text) {
      const response = data.generations[0].text.trim();
      return response;
    } else {
      throw new Error('No se pudo obtener la respuesta del asistente.');
    }
    
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Error desconocido al comunicarse con el asistente.');
    }
  }
}
