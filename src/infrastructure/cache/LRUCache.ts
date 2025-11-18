/**
 * LRU Cache Implementation
 * Least Recently Used cache with TTL support and size limits
 */

import type { CacheStrategy, CacheEntry } from './CacheStrategy';
import { CACHE_CONFIG } from '../../config/cache.config';

export class LRUCache<K, V> implements CacheStrategy<K, V> {
  private cache: Map<K, CacheEntry<V>>;
  private accessOrder: K[];

  constructor(
    private readonly maxSize: number = CACHE_CONFIG.maxCacheSize,
    private readonly defaultTTL: number = CACHE_CONFIG.defaultTTL,
  ) {
    this.cache = new Map();
    this.accessOrder = [];
  }

  get(key: K): V | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    // Check if expired
    if (this.isExpired(entry)) {
      this.delete(key);
      return null;
    }

    // Update access order (move to end)
    this.updateAccessOrder(key);

    return entry.value;
  }

  set(key: K, value: V, ttl?: number): void {
    // Evict if at capacity and key doesn't exist
    if (!this.cache.has(key) && this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    const entry: CacheEntry<V> = {
      value,
      timestamp: Date.now(),
      ttl: ttl ?? this.defaultTTL,
    };

    this.cache.set(key, entry);
    this.updateAccessOrder(key);
  }

  has(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    if (this.isExpired(entry)) {
      this.delete(key);
      return false;
    }

    return true;
  }

  delete(key: K): boolean {
    this.accessOrder = this.accessOrder.filter((k) => k !== key);
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  size(): number {
    return this.cache.size;
  }

  private isExpired(entry: CacheEntry<V>): boolean {
    if (!entry.ttl) {
      return false;
    }
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private updateAccessOrder(key: K): void {
    // Remove from current position
    this.accessOrder = this.accessOrder.filter((k) => k !== key);
    // Add to end (most recently used)
    this.accessOrder.push(key);
  }

  private evictLRU(): void {
    if (this.accessOrder.length === 0) {
      return;
    }
    // Remove least recently used (first in order)
    const lruKey = this.accessOrder[0];
    this.delete(lruKey);
  }

  /**
   * Remove all expired entries
   */
  cleanup(): number {
    let removed = 0;
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.delete(key);
        removed++;
      }
    }
    return removed;
  }
}
