/**
 * Legacy const.ts - Re-exports from config for backwards compatibility
 * @deprecated Import from config/cache.config.ts instead
 */

import { CACHE_KEYS, ALL_CACHE_KEYS } from './config/cache.config';

export const favCacheKey = CACHE_KEYS.favorites;
export const searchQueryCacheKey = CACHE_KEYS.searchHistory;
export const searchResultCacheKey = CACHE_KEYS.searchResults;
export const searchByIDResultCacheKey = CACHE_KEYS.placeDetails;
export const allCacheKeys = ALL_CACHE_KEYS;
