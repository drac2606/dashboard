import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';

interface SelectorUIProps {
   onCityChange: (city: string) => void;
}

export default function SelectorUI({ onCityChange }: SelectorUIProps) {

    const [cityInput, setCityInput] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedCity = event.target.value;
        setCityInput(selectedCity);
        onCityChange(selectedCity);
    };

    return (
        <Box
            className="selector-container"
            sx={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(219,234,254,0.9) 100%)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                border: '2px solid rgba(59,130,246,0.2)',
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: 'rgba(59,130,246,0.4)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                },
            }}
        >
            {/* Título del selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '16px' }}>
                <LocationOnIcon 
                    sx={{ 
                        color: '#1e3a8a', 
                        fontSize: 24,
                    }} 
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: '#1e3a8a',
                        fontSize: '1.1rem',
                    }}
                >
                    Seleccionar Ciudad
                </Typography>
            </Box>

            <FormControl fullWidth>
                <InputLabel 
                    id="city-select-label"
                    sx={{
                        color: '#64748b',
                        fontWeight: 500,
                        '&.Mui-focused': {
                            color: '#1e3a8a',
                        },
                    }}
                >
                    Ciudad
                </InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-simple-select"
                    label="Ciudad"
                    onChange={handleChange}
                    value={cityInput}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(59,130,246,0.3)',
                            borderRadius: '8px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(59,130,246,0.5)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1e3a8a',
                            borderWidth: '2px',
                        },
                        '& .MuiSelect-select': {
                            color: '#1e3a8a',
                            fontWeight: 500,
                        },
                    }}
                >
                    <MenuItem disabled>
                        <em>Seleccione una ciudad</em>
                    </MenuItem>
                    <MenuItem value={"guayaquil"}>🌊 Guayaquil</MenuItem>
                    <MenuItem value={"quito"}>🏔️ Quito</MenuItem>
                    <MenuItem value={"manta"}>🌅 Manta</MenuItem>
                    <MenuItem value={"cuenca"}>🏛️ Cuenca</MenuItem>
                </Select>
            </FormControl>

            {cityInput && (
                <Box
                    sx={{
                        marginTop: '16px',
                        padding: '12px',
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(219,234,254,0.8) 100%)',
                        borderRadius: '8px',
                        border: '1px solid rgba(59,130,246,0.2)',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#1e3a8a',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                        }}
                    >
                        📍 Información del clima en{' '}
                        <span style={{
                            textTransform: 'capitalize', 
                            fontWeight: 'bold',
                            color: '#3b82f6',
                        }}>
                            {cityInput}
                        </span>
                    </Typography>
                </Box>
            )}

            {/* Línea decorativa */}
            <Box
                sx={{
                    width: '50px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
                    margin: '16px auto 0',
                    borderRadius: '1px',
                    opacity: 0.6,
                }}
            />
        </Box>
    )
}