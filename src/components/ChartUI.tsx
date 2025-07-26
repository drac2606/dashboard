import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
   selectedCity?: string;
   weatherData?: OpenMeteoResponse | null;
   loading?: boolean;
   error?: string | null;
}

export default function ChartUI({ selectedCity, weatherData, loading, error }: ChartUIProps) {
   const [chartData, setChartData] = useState<{
      temperatures: number[];
      windSpeeds: number[];
      labels: string[];
   }>({ temperatures: [], windSpeeds: [], labels: [] });

   useEffect(() => {
      if (weatherData && weatherData.hourly) {
         try {
            // Verificar que todos los arrays necesarios existan
            const timeArray = weatherData.hourly.time || [];
            const tempArray = weatherData.hourly.temperature_2m || [];
            const windArray = weatherData.hourly.wind_speed_10m || [];
            
            // Procesar datos para el gráfico (tomar las primeras 24 horas)
            const temperatures: number[] = [];
            const windSpeeds: number[] = [];
            const labels: string[] = [];
            
            for (let i = 0; i < Math.min(24, timeArray.length); i++) {
               const time = timeArray[i];
               const temperature = tempArray[i];
               const windSpeed = windArray[i];
               
               if (time && typeof temperature === 'number' && typeof windSpeed === 'number') {
                  temperatures.push(temperature);
                  windSpeeds.push(windSpeed);
                  labels.push(new Date(time).toLocaleString('es-ES', {
                     month: 'short',
                     day: 'numeric',
                     hour: '2-digit'
                  }));
               }
            }
            
            if (temperatures.length > 0 && windSpeeds.length > 0 && labels.length > 0) {
               setChartData({ temperatures, windSpeeds, labels });
            } else {
               setChartData({ temperatures: [], windSpeeds: [], labels: [] });
            }
            
         } catch (err) {
            console.error('ChartUI - Error processing data:', err);
            setChartData({ temperatures: [], windSpeeds: [], labels: [] });
         }
      } else {
         setChartData({ temperatures: [], windSpeeds: [], labels: [] });
      }
   }, [weatherData]);

   if (loading) {
      return (
         <Box
            className="chart-container"
            sx={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
               borderRadius: '20px',
               padding: '24px',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
               border: '2px solid rgba(59,130,246,0.1)',
               height: '400px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               gap: 2,
            }}
         >
            <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 600 }}>
               📈 Pronóstico del Clima - {selectedCity ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1) : 'Ciudad'}
            </Typography>
            <div className="loading-skeleton" style={{ width: '100%', height: '300px' }}></div>
         </Box>
      );
   }

   if (error) {
      return (
         <Box
            className="chart-container"
            sx={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
               borderRadius: '20px',
               padding: '24px',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
               border: '2px solid rgba(239,68,68,0.2)',
               height: '400px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               gap: 2,
            }}
         >
            <Typography variant="h6" sx={{ color: '#dc2626', fontWeight: 600 }}>
               ❌ Error al cargar datos
            </Typography>
            <Typography variant="body2" sx={{ color: '#dc2626', textAlign: 'center' }}>
               {error}
            </Typography>
         </Box>
      );
   }

   if (!selectedCity) {
      return (
         <Box
            className="chart-container"
            sx={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
               borderRadius: '20px',
               padding: '24px',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
               border: '2px solid rgba(59,130,246,0.1)',
               height: '400px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               gap: 2,
            }}
         >
            <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 600 }}>
               📈 Selecciona una ciudad
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
               Elige una ciudad para ver el pronóstico del clima
            </Typography>
         </Box>
      );
   }

   if (!chartData.temperatures.length || !weatherData) {
      return (
         <Box
            className="chart-container"
            sx={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
               borderRadius: '20px',
               padding: '24px',
               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
               border: '2px solid rgba(59,130,246,0.1)',
               height: '400px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flexDirection: 'column',
               gap: 2,
            }}
         >
            <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 600 }}>
               📈 Sin datos disponibles
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
               No se pudieron cargar los datos del pronóstico
            </Typography>
         </Box>
      );
   }

   return (
      <Box
         className="chart-container"
         sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '2px solid rgba(59,130,246,0.1)',
            height: '400px',
         }}
      >
         <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 600, marginBottom: 2 }}>
            📈 Pronóstico del Clima - {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
         </Typography>
         
         <Box sx={{ height: 300 }}>
            <LineChart
               series={[
                  {
                     data: chartData.temperatures,
                     label: 'Temperatura (°C)',
                     color: '#ef4444',
                  },
                  {
                     data: chartData.windSpeeds,
                     label: 'Velocidad del Viento (km/h)',
                     color: '#3b82f6',
                  },
               ]}
               xAxis={[
                  {
                     data: chartData.labels,
                     scaleType: 'band',
                  },
               ]}
               sx={{
                  '& .MuiChartsAxis-line': {
                     stroke: '#64748b',
                  },
                  '& .MuiChartsAxis-tick': {
                     stroke: '#64748b',
                  },
                  '& .MuiChartsAxis-label': {
                     fill: '#64748b',
                  },
               }}
            />
         </Box>
      </Box>
   );
}