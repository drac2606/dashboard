import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

interface AlertUIProps {
  description: string;
}

export default function AlertUI({ description }: AlertUIProps) {
  return (
    <Box
      sx={{
        margin: '16px 0',
      }}
    >
      <Alert
        icon={<NotificationsActiveIcon />}
        severity="info"
        sx={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(219,234,254,0.9) 100%)',
          border: '2px solid rgba(59,130,246,0.2)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            borderColor: 'rgba(59,130,246,0.4)',
          },
          '& .MuiAlert-icon': {
            color: '#1e3a8a',
            fontSize: '20px',
          },
          '& .MuiAlert-message': {
            color: '#1e3a8a',
            fontWeight: 500,
            fontSize: '0.9rem',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{ fontWeight: 600 }}>🌤️ Información del Clima:</span>
          {description}
        </Box>
      </Alert>
    </Box>
  );
}