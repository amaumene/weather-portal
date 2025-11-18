/**
 * Cache Configuration
 * Defines caching strategies and limits
 */

export const CACHE_CONFIG = {
  // History configuration
  maxHistoryItems: 20,

  // Cache TTL (Time To Live) in milliseconds
  defaultTTL: 3600000, // 1 hour
  searchResultTTL: 3600000, // 1 hour
  placeDetailTTL: 86400000, // 24 hours

  // Maximum cache size (number of entries)
  maxCacheSize: 100,

  // Cache keys version
  version: 'v3',
} as const;

export const CACHE_KEYS = {
  favorites: `fav_${CACHE_CONFIG.version}`,
  searchHistory: `search_history_${CACHE_CONFIG.version}`,
  searchResults: `search_location_cache_${CACHE_CONFIG.version}`,
  placeDetails: `search_by_id_cache_${CACHE_CONFIG.version}`,
} as const;

export const ALL_CACHE_KEYS = Object.values(CACHE_KEYS);
