import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

interface IndicatorUIProps {
  title: string;
  description: string;
}

export default function IndicatorUI({ title, description }: IndicatorUIProps) {
  // Determinar el icono basado en el título
  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('temperatura')) {
      return <ThermostatIcon sx={{ fontSize: 35, color: '#ef4444' }} />;
    } else if (lowerTitle.includes('viento')) {
      return <AirIcon sx={{ fontSize: 35, color: '#3b82f6' }} />;
    } else if (lowerTitle.includes('humedad')) {
      return <OpacityIcon sx={{ fontSize: 35, color: '#0ea5e9' }} />;
    } else {
      return <WbSunnyIcon sx={{ fontSize: 35, color: '#fbbf24' }} />;
    }
  };

  // Determinar el color de fondo basado en el título
  const getBackgroundColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('temperatura')) {
      return 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(254,226,226,0.8) 100%)';
    } else if (lowerTitle.includes('viento')) {
      return 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(219,234,254,0.8) 100%)';
    } else if (lowerTitle.includes('humedad')) {
      return 'linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(186,230,253,0.8) 100%)';
    } else {
      return 'linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(254,243,199,0.8) 100%)';
    }
  };

  return (
    <Box
      className="indicator-card"
      sx={{
        background: getBackgroundColor(title),
        borderRadius: '16px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        border: '2px solid transparent',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          borderColor: 'rgba(59,130,246,0.3)',
        },
      }}
    >
      {/* Icono */}
      <Box
        sx={{
          marginBottom: '12px',
        }}
      >
        {getIcon(title)}
      </Box>

      {/* Título */}
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 600,
          color: '#1e3a8a',
          marginBottom: '8px',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          lineHeight: 1.2,
          minHeight: '2.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title}
      </Typography>

      {/* Valor */}
      <Typography
        variant="h4"
        component="p"
        sx={{
          fontWeight: 700,
          color: '#1e3a8a',
          fontSize: '1.5rem',
          margin: '8px 0',
          lineHeight: 1.2,
          minHeight: '2.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {description}
      </Typography>

      {/* Línea decorativa */}
      <Box
        sx={{
          width: '40px',
          height: '2px',
          background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
          margin: '8px auto 0',
          borderRadius: '1px',
          opacity: 0.6,
        }}
      />
    </Box>
  );
}