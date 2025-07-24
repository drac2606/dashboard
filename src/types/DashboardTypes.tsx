export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: Hourlyunits;
  hourly: Hourly;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
}

export interface Hourlyunits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
}