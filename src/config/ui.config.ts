/**
 * UI Configuration
 * Constants for UI dimensions, spacing, and visual elements
 */

export const UI_CONFIG = {
  // Layout dimensions
  layout: {
    maxWidth: 800,
    headerHeight: 50,
    footerHeight: 60,
  },

  // FAB (Floating Action Button)
  fab: {
    size: 50,
    spacing: 20,
  },

  // Spacing
  spacing: {
    small: 4,
    medium: 8,
    large: 16,
    xlarge: 20,
  },

  // Font sizes
  fontSize: {
    small: '0.6rem',
    normal: '0.8rem',
    medium: '0.9rem',
    large: '1rem',
    xlarge: '1.2rem',
  },

  // Colors
  colors: {
    primary: '#29ca5f',
    secondary: '#f9b618',
    text: {
      primary: '#333',
      secondary: '#666',
      tertiary: '#999',
    },
    background: {
      light: '#f0f4f8',
      white: '#fff',
    },
    border: '#d8d8d8',
  },

  // Breakpoints (matches VueUse breakpoints)
  breakpoints: {
    mobile: 0,
    tablet: 800,
  },
} as const;
