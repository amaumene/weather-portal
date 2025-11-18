/**
 * Favorite Repository
 * Handles persistent storage of favorite places
 */

import { Place } from '../../domain/entities/Place';
import { StorageAdapter } from '../storage/StorageAdapter';
import { CACHE_KEYS } from '../../config/cache.config';

export interface FavoriteRepository {
  getAll(): Place[];
  toggle(place: Place): boolean; // Returns true if added, false if removed
  isFavorite(place: Place): boolean;
  clear(): void;
}

export class LocalStorageFavoriteRepository implements FavoriteRepository {
  constructor(private readonly storage: StorageAdapter) {}

  getAll(): Place[] {
    const data = this.storage.get<Array<ReturnType<Place['toObject']>>>(
      CACHE_KEYS.favorites,
    );
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item) => Place.fromObject(item));
  }

  toggle(place: Place): boolean {
    const favorites = this.getAll();
    const existingIndex = favorites.findIndex((fav) => fav.equals(place));

    if (existingIndex !== -1) {
      // Remove from favorites
      favorites.splice(existingIndex, 1);
      this.save(favorites);
      return false;
    } else {
      // Add to favorites (at beginning)
      favorites.unshift(place);
      this.save(favorites);
      return true;
    }
  }

  isFavorite(place: Place): boolean {
    const favorites = this.getAll();
    return favorites.some((fav) => fav.equals(place));
  }

  clear(): void {
    this.storage.remove(CACHE_KEYS.favorites);
  }

  private save(favorites: Place[]): void {
    const data = favorites.map((place) => place.toObject());
    this.storage.set(CACHE_KEYS.favorites, data);
  }
}
