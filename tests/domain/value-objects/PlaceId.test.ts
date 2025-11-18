/**
 * Tests for PlaceId Value Object
 */

import { describe, it, expect } from 'vitest';
import { PlaceId } from '../../../src/domain/value-objects/PlaceId';

describe('PlaceId', () => {
  describe('constructor', () => {
    it('should create valid PlaceId', () => {
      const id = new PlaceId('12345');
      expect(id.toString()).toBe('12345');
    });

    it('should throw error for empty string', () => {
      expect(() => new PlaceId('')).toThrow('PlaceId cannot be empty');
    });

    it('should throw error for whitespace-only string', () => {
      expect(() => new PlaceId('   ')).toThrow('PlaceId cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for equal IDs', () => {
      const id1 = new PlaceId('12345');
      const id2 = new PlaceId('12345');
      expect(id1.equals(id2)).toBe(true);
    });

    it('should return false for different IDs', () => {
      const id1 = new PlaceId('12345');
      const id2 = new PlaceId('67890');
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('fromString', () => {
    it('should create PlaceId from string', () => {
      const id = PlaceId.fromString('12345');
      expect(id.toString()).toBe('12345');
    });
  });
});
