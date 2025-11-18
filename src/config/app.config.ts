/**
 * Application Configuration
 * General application settings
 */

export const APP_CONFIG = {
  name: 'Weather Portal',
  version: '3.0.0',

  // Geolocation filters
  targetCountry: 'Japan',

  // Mountain proximity threshold (in kilometers)
  mountainProximityThreshold: 5,

  // Breakpoints for responsive design
  breakpoints: {
    mobile: 800,
  },
} as const;
