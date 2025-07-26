// src/components/DashboardClima.tsx
import { useState } from "react";
import { cohereChat } from "../services/cohereChat";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const MAX_CALLS_PER_HOUR = 50; // Aumentado el límite
let callCount = 0;
let lastReset = Date.now();

function shouldResetRateLimit() {
  return Date.now() - lastReset > 60 * 60 * 1000; // 1 hora
}

const DashboardClima: React.FC = () => {
  const [consulta, setConsulta] = useState<string>("");
  const [respuesta, setRespuesta] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showApiKeyAlert, setShowApiKeyAlert] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_COHERE_API_KEY as string;

  const preguntarCohere = async () => {
    if (!consulta.trim()) {
      setError("Por favor, ingresa una pregunta.");
      return;
    }

    // Verificar API key
    if (!apiKey) {
      setShowApiKeyAlert(true);
      setError("API key no configurada. Contacta al administrador.");
      return;
    }

    // Verificar límite de uso
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
    setShowApiKeyAlert(false);

    try {
      const respuestaAPI = await cohereChat(
        consulta.trim(),
        apiKey
      );

      setRespuesta(respuestaAPI);
      callCount++;
    } catch (err: any) {
      console.error('Error en asistente:', err);
      setError(err.message || "Error al comunicarse con el asistente.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      preguntarCohere();
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '2px solid rgba(59,130,246,0.1)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          borderColor: 'rgba(59,130,246,0.2)',
        },
      }}
    >
      {/* Título con icono */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '20px' }}>
        <SmartToyIcon 
          sx={{ 
            fontSize: 28, 
            color: '#1e3a8a',
          }} 
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          🤖 Asistente del Clima
        </Typography>
      </Box>

      {/* Descripción */}
      <Typography
        variant="body1"
        sx={{
          color: '#64748b',
          marginBottom: '20px',
          fontSize: '0.9rem',
        }}
      >
        Pregunta cualquier cosa relacionada con el clima y obtén respuestas inteligentes.
      </Typography>

      {/* Alerta de API key */}
      {showApiKeyAlert && (
        <Alert severity="warning" sx={{ marginBottom: '16px' }}>
          <AlertTitle>Configuración requerida</AlertTitle>
          Para usar el asistente, se necesita configurar una API key de Cohere.
          <br />
          <strong>Pasos:</strong>
          <br />
          1. Ve a <a href="https://cohere.com/" target="_blank" rel="noopener">Cohere</a>
          <br />
          2. Crea una cuenta gratuita
          <br />
          3. Genera una API key
          <br />
          4. Crea un archivo .env con: VITE_COHERE_API_KEY=tu_api_key
        </Alert>
      )}

      {/* Campo de entrada */}
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        placeholder="Ej: ¿Cómo afecta la humedad a la sensación térmica? ¿Qué es el efecto invernadero? ¿Por qué llueve más en invierno?"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
        sx={{
          marginBottom: '16px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'rgba(59,130,246,0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(59,130,246,0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1e3a8a',
            },
          },
        }}
      />

      {/* Botón de envío */}
      <Button
        variant="contained"
        onClick={preguntarCohere}
        disabled={loading || !consulta.trim() || !apiKey}
        startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 600,
          textTransform: 'none',
          marginBottom: '20px',
          '&:hover': {
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
            transform: 'translateY(-1px)',
          },
          '&:disabled': {
            background: '#e5e7eb',
            color: '#9ca3af',
          },
        }}
      >
        {loading ? 'Procesando...' : 'Enviar Pregunta'}
      </Button>

      {/* Información de debug */}
      {!apiKey && (
        <Box sx={{ marginBottom: '16px', padding: '8px', background: 'rgba(255,193,7,0.1)', borderRadius: '4px' }}>
          <Typography variant="body2" sx={{ color: '#856404', fontSize: '0.8rem' }}>
            🔧 Debug: API key no encontrada. Verifica el archivo .env
          </Typography>
        </Box>
      )}

      {/* Mensaje de error */}
      {error && (
        <Box
          sx={{
            padding: '12px',
            background: 'rgba(239,68,68,0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239,68,68,0.3)',
            marginBottom: '16px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#dc2626',
              fontWeight: 500,
            }}
          >
            ❌ {error}
          </Typography>
        </Box>
      )}

      {/* Respuesta */}
      {respuesta && (
        <Box
          sx={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(219,234,254,0.8) 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(59,130,246,0.2)',
            marginBottom: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <SmartToyIcon 
              sx={{ 
                fontSize: 20, 
                color: '#1e3a8a',
                marginTop: '2px',
              }} 
            />
            <Typography
              variant="body1"
              sx={{
                color: '#1e3a8a',
                fontWeight: 500,
                lineHeight: 1.6,
                fontSize: '0.9rem',
                whiteSpace: 'pre-wrap',
              }}
            >
              {respuesta}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Tips y ejemplos */}
      <Box
        sx={{
          padding: '12px',
          background: 'rgba(251,191,36,0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(251,191,36,0.3)',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#92400e',
            fontWeight: 500,
            fontSize: '0.8rem',
            marginBottom: '8px',
          }}
        >
          💡 Ejemplos de preguntas:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#92400e',
            fontSize: '0.75rem',
            lineHeight: 1.4,
          }}
        >
          • ¿Cómo afecta la humedad a la sensación térmica?<br/>
          • ¿Qué es el efecto invernadero?<br/>
          • ¿Por qué llueve más en invierno?<br/>
          • ¿Cómo se forman las nubes?<br/>
          • ¿Qué es la presión atmosférica?
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardClima;
