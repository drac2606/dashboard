import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function HeaderUI() {
  return (
    <Box 
      className="weather-card"
      sx={{
        textAlign: 'center',
        padding: '30px 20px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(219,234,254,0.9) 100%)',
        borderRadius: '20px',
        border: '2px solid rgba(59,130,246,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography 
        variant="h2" 
        component="h1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '1.8rem', md: '2.5rem' },
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        🌤️ Dashboard del Clima
      </Typography>
      
      <Typography 
        variant="h6" 
        component="p"
        sx={{
          color: '#64748b',
          fontWeight: 400,
          fontSize: { xs: '0.9rem', md: '1.1rem' },
          opacity: 0.8,
          marginTop: '10px',
          fontStyle: 'italic',
        }}
      >
        Monitoreo meteorológico en tiempo real • Datos precisos de Open Meteo
      </Typography>

      {/* Línea decorativa */}
      <Box 
        sx={{
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
          margin: '15px auto 0',
          borderRadius: '1px',
        }}
      />
    </Box>
  );
}