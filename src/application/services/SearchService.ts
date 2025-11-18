/**
 * Search Service
 * Application service that orchestrates place search operations
 */

import { Place } from '../../domain/entities/Place';
import { PlaceFilterService } from '../../domain/services/PlaceFilterService';
import type { PlaceRepository } from '../../infrastructure/repositories/PlaceRepository';
import type { HistoryRepository } from '../../infrastructure/repositories/HistoryRepository';

export class SearchService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly historyRepository: HistoryRepository,
    private readonly filterService: PlaceFilterService,
  ) {}

  /**
   * Search for places and filter by target country
   * Adds successful searches to history
   */
  async search(query: string, signal?: AbortSignal): Promise<Place[]> {
    // Validate query
    if (!query || query.trim() === '') {
      return [];
    }

    // Search via repository (handles caching)
    const places = await this.placeRepository.search(query.trim(), signal);

    // Filter to target country (Japan)
    const filtered = this.filterService.filterByTargetCountry(places);

    // Add to history if we got results (and not aborted)
    if (filtered.length > 0 && !signal?.aborted) {
      this.historyRepository.add(query.trim());
    }

    return filtered;
  }

  /**
   * Get place by OSM ID
   */
  async getPlaceById(osmId: string): Promise<Place | null> {
    if (!osmId || osmId.trim() === '') {
      return null;
    }
    return await this.placeRepository.findById(osmId.trim());
  }

  /**
   * Get search history
   */
  getHistory(): string[] {
    return this.historyRepository.getAll();
  }

  /**
   * Clear search history
   */
  clearHistory(): void {
    this.historyRepository.clear();
  }

  /**
   * Clear search cache
   */
  clearCache(): void {
    this.placeRepository.clearCache();
  }
}
