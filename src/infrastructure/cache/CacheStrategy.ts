/**
 * Cache Strategy Interface
 * Defines the contract for cache implementations
 */

export interface CacheEntry<V> {
  value: V;
  timestamp: number;
  ttl?: number;
}

export interface CacheStrategy<K, V> {
  get(key: K): V | null;
  set(key: K, value: V, ttl?: number): void;
  has(key: K): boolean;
  delete(key: K): boolean;
  clear(): void;
  size(): number;
}
