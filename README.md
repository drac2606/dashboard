# 🌤️ Dashboard del Clima - React

Un dashboard interactivo y moderno que muestra información meteorológica en tiempo real utilizando la API de Open Meteo, con un asistente de IA especializado en meteorología.

## 🚀 Características Principales

### 📊 Dashboard Meteorológico
- **Datos en tiempo real** de 4 ciudades ecuatorianas (Guayaquil, Quito, Manta, Cuenca)
- **Indicadores dinámicos** con temperatura, humedad, velocidad del viento y temperatura aparente
- **Gráfico interactivo** que muestra tendencias de temperatura y viento
- **Tabla de datos horarios** con información detallada de las próximas 24 horas
- **Interfaz responsiva** con diseño moderno y animaciones suaves

### 🤖 Asistente de IA Meteorológico
- **Chat inteligente** especializado en temas meteorológicos
- **Respuestas en español** de manera amigable y educativa
- **Prompt optimizado** para preguntas sobre clima, meteorología y fenómenos atmosféricos
- **Límite de uso controlado** (50 preguntas por hora)
- **Manejo robusto de errores** con mensajes claros

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Material-UI** - Componentes de UI modernos
- **MUI X Charts** - Gráficos interactivos
- **MUI X Data Grid** - Tablas avanzadas
- **Vite** - Build tool rápido
- **Open Meteo API** - Datos meteorológicos
- **Cohere API** - Asistente de IA

## 🤖 Asistente de IA - Configuración

### Obtener API Key de Cohere
1. Ve a [Cohere](https://cohere.com/)
2. Crea una cuenta gratuita
3. Ve a "API Keys" y genera una nueva
4. Copia la API key

### Configurar en el proyecto
1. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_COHERE_API_KEY=tu_api_key_de_cohere_aqui
```
2. Reinicia el servidor: `npm run dev`

### Ejemplos de preguntas
- ¿Cómo afecta la humedad a la sensación térmica?
- ¿Qué es el efecto invernadero?
- ¿Por qué llueve más en invierno?
- ¿Cómo se forman las nubes?
- ¿Qué es la presión atmosférica?

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd dashboard
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar API key (opcional)**
```bash
# Crear archivo .env
VITE_COHERE_API_KEY=tu_api_key_de_cohere_aqui
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── AlertUI.tsx          # Alertas del clima
│   ├── ChartUI.tsx          # Gráfico de datos
│   ├── HeaderUI.tsx         # Encabezado
│   ├── IndicatorUI.tsx      # Indicadores
│   ├── ParticlesBackground.tsx
│   ├── SelectorUI.tsx       # Selector de ciudad
│   └── TableUI.tsx          # Tabla de datos
├── functions/
│   ├── DataFetcher.tsx      # Peticiones async
│   └── DashboardClima.tsx   # Asistente de IA
├── services/
│   └── cohereChat.ts        # Servicio de IA
├── types/
│   └── DashboardTypes.tsx   # Tipos TypeScript
└── App.tsx                  # Componente principal
```

## 🎯 Funcionalidades Destacadas

### Dashboard Meteorológico
- **Selección de ciudades**: Guayaquil, Quito, Manta, Cuenca
- **Datos en tiempo real**: Temperatura, humedad, viento, temperatura aparente
- **Visualización**: Gráficos y tablas interactivas
- **Responsive**: Funciona en móviles y desktop

### Asistente de IA
- **Especializado en meteorología**: Respuestas expertas sobre clima
- **Interfaz amigable**: Chat intuitivo con ejemplos
- **Control de uso**: Límite de 50 preguntas por hora
- **Manejo de errores**: Mensajes claros para problemas comunes

---

Desarrollado con ❤️ usando React, TypeScript y Material-UI
