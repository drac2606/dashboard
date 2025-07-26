import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableData {
   id: number;
   time: string;
   temperature: string;
   apparentTemperature: string;
   windSpeed: string;
   humidity: string;
}

interface TableUIProps {
   selectedCity?: string;
   weatherData?: OpenMeteoResponse | null;
   loading?: boolean;
   error?: string | null;
}

export default function TableUI({ selectedCity, weatherData, loading, error }: TableUIProps) {
   const [tableData, setTableData] = useState<TableData[]>([]);

   useEffect(() => {
      if (weatherData && weatherData.hourly) {
         try {
            // Verificar que todos los arrays necesarios existan
            const timeArray = weatherData.hourly.time || [];
            const tempArray = weatherData.hourly.temperature_2m || [];
            const apparentTempArray = weatherData.hourly.apparent_temperature || [];
            const windArray = weatherData.hourly.wind_speed_10m || [];
            const humidityArray = weatherData.hourly.relative_humidity_2m || [];
            
            // Procesar datos para la tabla (tomar las primeras 24 horas)
            const processedData: TableData[] = [];
            
            for (let i = 0; i < Math.min(24, timeArray.length); i++) {
               const time = timeArray[i];
               const temperature = tempArray[i];
               const apparentTemperature = apparentTempArray[i];
               const windSpeed = windArray[i];
               const humidity = humidityArray[i];
               
               if (time) {
                  const rowData = {
                     id: i,
                     time: new Date(time).toLocaleString('es-ES', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                     }),
                     temperature: temperature !== undefined && temperature !== null ? `${temperature}` : 'N/A',
                     apparentTemperature: apparentTemperature !== undefined && apparentTemperature !== null ? `${apparentTemperature}` : 'N/A',
                     windSpeed: windSpeed !== undefined && windSpeed !== null ? `${windSpeed}` : 'N/A',
                     humidity: humidity !== undefined && humidity !== null ? `${humidity}` : 'N/A'
                  };
                  
                  processedData.push(rowData);
               }
            }
            
            setTableData(processedData);
            
         } catch (err) {
            console.error('TableUI - Error processing data:', err);
            setTableData([]);
         }
      } else {
         setTableData([]);
      }
   }, [weatherData]);

const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
   {
         field: 'time',
         headerName: 'Fecha/Hora',
      width: 150,
   },
   {
         field: 'temperature',
         headerName: 'Temperatura (°C)',
      width: 150,
   },
   {
         field: 'apparentTemperature',
         headerName: 'Temp. Aparente (°C)',
         width: 150,
   },
   {
         field: 'windSpeed',
         headerName: 'Velocidad Viento (km/h)',
         width: 180,
      },
      {
         field: 'humidity',
         headerName: 'Humedad (%)',
         width: 120,
   },
];

   if (loading) {
      return (
         <Box
            className="table-container"
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
               📊 Datos Horarios - {selectedCity ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1) : 'Ciudad'}
            </Typography>
            <div className="loading-skeleton" style={{ width: '100%', height: '300px' }}></div>
         </Box>
      );
   }

   if (error) {
      return (
         <Box
            className="table-container"
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
            className="table-container"
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
               📊 Selecciona una ciudad
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
               Elige una ciudad para ver los datos horarios
            </Typography>
         </Box>
      );
   }

   if (!tableData.length || !weatherData) {
      return (
         <Box
            className="table-container"
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
               📊 Sin datos disponibles
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
               No se pudieron cargar los datos horarios
            </Typography>
         </Box>
      );
   }

   return (
      <Box
         className="table-container"
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
            📊 Datos Horarios - {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
         </Typography>
         
         <Box sx={{ height: 300 }}>
         <DataGrid
               rows={tableData}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                        pageSize: 8,
                  },
               },
            }}
               pageSizeOptions={[8]}
            disableRowSelectionOnClick
               sx={{
                  '& .MuiDataGrid-root': {
                     border: 'none',
                  },
                  '& .MuiDataGrid-cell': {
                     borderBottom: '1px solid rgba(224, 224, 224, 1)',
                     fontSize: '0.875rem',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                     backgroundColor: 'rgba(59,130,246,0.1)',
                     color: '#1e3a8a',
                     fontWeight: 600,
                     fontSize: '0.875rem',
                  },
                  '& .MuiDataGrid-row:hover': {
                     backgroundColor: 'rgba(59,130,246,0.05)',
                  },
               }}
         />
         </Box>
      </Box>
   );
}