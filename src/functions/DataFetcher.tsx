import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherProps {
    coordinates: { latitude: number; longitude: number } | null;
}

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const CACHE_KEY_PREFIX = 'weather_data_cache_';

function getCacheKey(lat: number, lon: number) {
    return `${CACHE_KEY_PREFIX}${lat.toFixed(4)}_${lon.toFixed(4)}`;
}

export default function DataFetcher(props: DataFetcherProps): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Si no hay coordenadas, no hacer nada
        if (!props.coordinates) {
            setData(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchData = async () => {
            const { latitude, longitude } = props.coordinates!;
            setLoading(true);
            setError(null);

            const cacheKey = getCacheKey(latitude, longitude);

            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FGuayaquil&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm`;

                const response = await fetch(url);

                if (!response.ok) {
                    if (response.status === 429) {
                        // Intentar cargar del caché si hay error 429
                        const cached = localStorage.getItem(cacheKey);
                        if (cached) {
                            try {
                                const parsed = JSON.parse(cached);
                                setData(parsed.data);
                                setError('Mostrando datos guardados por límite de la API.');
                            } catch (parseErr) {
                                setError("Demasiadas solicitudes. Intenta más tarde.");
                                setData(null);
                            }
                        } else {
                            setError("Demasiadas solicitudes. Intenta más tarde.");
                            setData(null);
                        }
                    } else {
                        setError(`Error HTTP! Estado: ${response.status}`);
                        setData(null);
                    }
                    return;
                }

                const result: OpenMeteoResponse = await response.json();
                
                // Verificar que los datos tengan la estructura esperada
                if (result.hourly && result.hourly.time && result.hourly.temperature_2m && 
                    result.hourly.wind_speed_10m && result.hourly.relative_humidity_2m && 
                    result.hourly.apparent_temperature) {
                    setData(result);
                    // Guardar en caché
                    localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
                } else {
                    setError('Estructura de datos inválida recibida de la API');
                    setData(null);
                }

            } catch (err) {
                // Si hay error de red, intentar cargar del caché
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    try {
                        const parsed = JSON.parse(cached);
                        setData(parsed.data);
                        setError('Mostrando datos guardados por error de conexión.');
                    } catch (parseErr) {
                        setData(null);
                        setError(err instanceof Error ? err.message : "Error al obtener datos");
                    }
                } else {
                    setData(null);
                    setError(err instanceof Error ? err.message : "Error al obtener datos");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [props.coordinates?.latitude, props.coordinates?.longitude]);

    return { data, loading, error };
}