import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { askWeatherAssistant } from '../services/CohereAssistant';

const WeatherAssistantUI: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const result = await askWeatherAssistant(question);
    setLoading(false);
    setResponse(result.answer || result.error || 'Sin respuesta');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Asistente del Clima
      </Typography>
      <TextField
        fullWidth
        label="¿Cómo estará el clima mañana?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleAsk}
        disabled={loading}
        fullWidth
      >
        {loading ? 'Consultando...' : 'Preguntar'}
      </Button>
      {response && (
        <Box mt={2}>
          <Typography variant="subtitle2">Respuesta:</Typography>
          <Typography variant="body1">{response}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default WeatherAssistantUI;
