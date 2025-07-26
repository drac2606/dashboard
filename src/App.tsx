import './App.css'
import { Grid, Box } from '@mui/material';
import { useState, useMemo } from 'react';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import DashboardClima from './functions/DashboardClima';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
   const [selectedCity, setSelectedCity] = useState<string>('');
   
   // Coordenadas para diferentes ciudades
   const cityCoordinates: { [key: string]: { latitude: number; longitude: number } } = {
      guayaquil: { latitude: -2.1894, longitude: -79.8891 },
      quito: { latitude: -0.2299, longitude: -78.5249 },
      manta: { latitude: -0.9621, longitude: -80.7127 },
      cuenca: { latitude: -2.9006, longitude: -79.0045 }
   };

   // Obtener coordenadas de la ciudad seleccionada usando useMemo para evitar recálculos innecesarios
   const currentCoordinates = useMemo(() => {
      if (selectedCity && cityCoordinates[selectedCity]) {
         return cityCoordinates[selectedCity];
      }
      return null; // No hacer llamadas si no hay ciudad seleccionada
   }, [selectedCity]);

   // Usar DataFetcher como hook solo cuando hay coordenadas
   const { data, loading, error } = DataFetcher({ coordinates: currentCoordinates });

   const handleCityChange = (city: string) => {
      setSelectedCity(city);
   };

   return (
      <div className="dashboard-container">
         {/* Fondo de partículas */}
         <ParticlesBackground />

         <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Encabezado */}
            <Grid size={{ xs: 12 }}>
          <HeaderUI/>
        </Grid>

        {/* Alertas */}
            <Grid size={{ xs: 12 }}>
          <AlertUI description="No se preveen lluvias"/>
        </Grid>

        {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }}>
              <SelectorUI onCityChange={handleCityChange}/>
        </Grid>

        {/* Indicadores */}
            <Grid size={{ xs: 12, md: 9 }}>
          {/* Renderizado condicional de los datos obtenidos */}
              {!selectedCity && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: 200,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '2px solid rgba(59,130,246,0.1)',
                }}>
                  <div style={{ textAlign: 'center', color: '#64748b' }}>
                    <p>Selecciona una ciudad para ver los datos del clima</p>
                  </div>
                </Box>
              )}
              {loading && selectedCity && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: 200,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '2px solid rgba(59,130,246,0.1)',
                }}>
                  <div className="loading-skeleton" style={{ width: '100%', height: '100px' }}></div>
                </Box>
              )}
              {error && selectedCity && (
                <Box sx={{ 
                  padding: 3, 
                  background: 'rgba(239,68,68,0.1)', 
                  borderRadius: 2, 
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#dc2626'
                }}>
                  <p>Error: {error}</p>
                </Box>
              )}
              {data && selectedCity && (
                <Grid container spacing={2}>
                     {/* Indicadores con datos obtenidos */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura (2m)'
                      description={data.current.temperature_2m + " " + data.current_units.temperature_2m} />
                     </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                      description={data.current.apparent_temperature + " " + data.current_units.apparent_temperature} />
                     </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                      description={data.current.wind_speed_10m + " " + data.current_units.wind_speed_10m} />
                     </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                      description={data.current.relative_humidity_2m + " " + data.current_units.relative_humidity_2m} />
                  </Grid>
                     </Grid>
                 )}
        </Grid>

        {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }}>
              <ChartUI selectedCity={selectedCity} weatherData={data} loading={loading} error={error} />
           </Grid>

        {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TableUI selectedCity={selectedCity} weatherData={data} loading={loading} error={error} />
           </Grid>

        {/* Información adicional */}
            <Grid size={{ xs: 12 }}>
                <DashboardClima />
        </Grid>
      </Grid>
      </div>
   );
}

export default App;
