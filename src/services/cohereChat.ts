// src/services/cohereChat.ts
export async function cohereChat(query: string, apiKey: string): Promise<string> {
  const url = 'https://api.cohere.com/v2/chat';

  const body = {
    model: "command-xlarge-nightly",
    messages: [{ role: "user", content: query }],
    temperature: 0.4,
    max_tokens: 300
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error en la API de Cohere');
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sin respuesta";
}
