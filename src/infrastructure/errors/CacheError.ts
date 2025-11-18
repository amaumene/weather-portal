/**
 * Cache Error
 * Represents errors from cache operations
 */

export class CacheError extends Error {
  constructor(
    message: string,
    public readonly operation?: 'get' | 'set' | 'delete' | 'clear',
    public readonly key?: string,
  ) {
    super(message);
    this.name = 'CacheError';
  }
}
