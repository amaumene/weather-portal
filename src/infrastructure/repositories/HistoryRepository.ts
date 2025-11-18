/**
 * History Repository
 * Handles persistent storage of search history
 */

import { StorageAdapter } from '../storage/StorageAdapter';
import { CACHE_KEYS, CACHE_CONFIG } from '../../config/cache.config';

export interface HistoryRepository {
  getAll(): string[];
  add(query: string): void;
  clear(): void;
}

export class LocalStorageHistoryRepository implements HistoryRepository {
  constructor(private readonly storage: StorageAdapter) {}

  getAll(): string[] {
    const data = this.storage.get<string[]>(CACHE_KEYS.searchHistory);
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data;
  }

  add(query: string): void {
    let history = this.getAll();

    // Remove existing occurrence
    const existingIndex = history.indexOf(query);
    if (existingIndex !== -1) {
      history.splice(existingIndex, 1);
    }

    // Add to beginning
    history.unshift(query);

    // Limit size
    if (history.length > CACHE_CONFIG.maxHistoryItems) {
      history = history.slice(0, CACHE_CONFIG.maxHistoryItems);
    }

    this.save(history);
  }

  clear(): void {
    this.storage.remove(CACHE_KEYS.searchHistory);
  }

  private save(history: string[]): void {
    this.storage.set(CACHE_KEYS.searchHistory, history);
  }
}
