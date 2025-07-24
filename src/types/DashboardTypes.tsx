export interface Root {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  apparent_temperature: string
  wind_speed_10m: string
  relative_humidity_2m: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  apparent_temperature: number
  wind_speed_10m: number
  relative_humidity_2m: number
}