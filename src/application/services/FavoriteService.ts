/**
 * Favorite Service
 * Application service that manages favorite places
 */

import { Place } from '../../domain/entities/Place';
import type { FavoriteRepository } from '../../infrastructure/repositories/FavoriteRepository';

export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  /**
   * Get all favorite places
   */
  getAll(): Place[] {
    return this.favoriteRepository.getAll();
  }

  /**
   * Toggle favorite status for a place
   * Returns true if added, false if removed
   */
  toggle(place: Place): boolean {
    return this.favoriteRepository.toggle(place);
  }

  /**
   * Check if a place is favorited
   */
  isFavorite(place: Place): boolean {
    return this.favoriteRepository.isFavorite(place);
  }

  /**
   * Clear all favorites
   */
  clearAll(): void {
    this.favoriteRepository.clear();
  }

  /**
   * Get count of favorites
   */
  getCount(): number {
    return this.getAll().length;
  }
}
