/**
 * API Configuration
 * Centralizes all external API endpoints and service URLs
 */

export const API_CONFIG = {
  nominatim: {
    baseUrl: 'https://nominatim.openstreetmap.org',
    endpoints: {
      search: '/search',
      details: '/details',
    },
  },
} as const;

export const WEATHER_SERVICES = {
  scw: {
    name: 'SuperC Weather',
    baseUrl: 'https://supercweather.com',
    buildUrl: (lat: number, lon: number) => `https://supercweather.com/?lat=${lat}&lng=${lon}`,
  },
  windy: {
    name: 'Windy',
    baseUrl: 'https://www.windy.com',
    buildUrl: (lat: number, lon: number) => `https://www.windy.com/${lat}/${lon}`,
  },
  weatherNews: {
    name: 'Weather News',
    baseUrl: 'https://weathernews.jp',
    buildUrl: (lat: number, lon: number) => `https://weathernews.jp/onebox/${lat}/${lon}`,
  },
  yamaten: {
    name: 'Yamaten (Mountain Weather)',
    baseUrl: 'https://i.yamatenki.co.jp',
    buildUrl: (mountainId: string) => `https://i.yamatenki.co.jp/mountain?mid=${mountainId}`,
  },
  meteoblue: {
    name: 'Meteoblue',
    baseUrl: 'https://www.meteoblue.com',
    buildUrl: (lat: number, lon: number) => `https://www.meteoblue.com/en/weather/week/${lat}N${lon}E`,
  },
} as const;

export type WeatherServiceKey = keyof typeof WEATHER_SERVICES;
