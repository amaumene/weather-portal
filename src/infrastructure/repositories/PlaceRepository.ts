/**
 * Place Repository
 * Handles data access for places with caching
 */

import { Place } from '../../domain/entities/Place';
import { NominatimApiClient } from '../api/NominatimApiClient';
import { LRUCache } from '../cache/LRUCache';
import { CACHE_CONFIG } from '../../config/cache.config';

export interface PlaceRepository {
  search(query: string, signal?: AbortSignal): Promise<Place[]>;
  findById(osmId: string): Promise<Place | null>;
  clearCache(): void;
}

export class CachedPlaceRepository implements PlaceRepository {
  private searchCache: LRUCache<string, Place[]>;
  private detailsCache: LRUCache<string, Place>;

  constructor(private readonly apiClient: NominatimApiClient) {
    this.searchCache = new LRUCache(
      CACHE_CONFIG.maxCacheSize,
      CACHE_CONFIG.searchResultTTL,
    );
    this.detailsCache = new LRUCache(
      CACHE_CONFIG.maxCacheSize,
      CACHE_CONFIG.placeDetailTTL,
    );
  }

  async search(query: string, signal?: AbortSignal): Promise<Place[]> {
    // Check cache first
    const cached = this.searchCache.get(query);
    if (cached) {
      return cached;
    }

    // Fetch from API
    const places = await this.apiClient.search(query, signal);

    // Cache results (only if not aborted)
    if (!signal?.aborted) {
      this.searchCache.set(query, places);
    }

    return places;
  }

  async findById(osmId: string): Promise<Place | null> {
    // Check cache first
    const cached = this.detailsCache.get(osmId);
    if (cached) {
      return cached;
    }

    // Fetch from API
    const place = await this.apiClient.getPlaceDetails(osmId);

    // Cache result if found
    if (place) {
      this.detailsCache.set(osmId, place);
    }

    return place;
  }

  clearCache(): void {
    this.searchCache.clear();
    this.detailsCache.clear();
  }

  /**
   * Get cache statistics (for debugging)
   */
  getCacheStats() {
    return {
      searchCacheSize: this.searchCache.size(),
      detailsCacheSize: this.detailsCache.size(),
    };
  }
}
