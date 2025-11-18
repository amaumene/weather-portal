/**
 * Storage Adapter Interface
 * Abstraction for persistent storage (localStorage, sessionStorage, etc.)
 */

export interface StorageAdapter {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
}

/**
 * LocalStorage Adapter Implementation
 */
export class LocalStorageAdapter implements StorageAdapter {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage (key: ${key}):`, error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (key: ${key}):`, error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (key: ${key}):`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}

/**
 * In-Memory Storage Adapter (for testing or SSR)
 */
export class InMemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, string> = new Map();

  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    if (item === undefined) {
      return null;
    }
    return JSON.parse(item) as T;
  }

  set<T>(key: string, value: T): void {
    this.storage.set(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }
}
