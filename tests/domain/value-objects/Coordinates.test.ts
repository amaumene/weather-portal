/**
 * Tests for Coordinates Value Object
 */

import { describe, it, expect } from 'vitest';
import { Coordinates } from '../../../src/domain/value-objects/Coordinates';

describe('Coordinates', () => {
  describe('constructor', () => {
    it('should create valid coordinates', () => {
      const coords = new Coordinates(35.6762, 139.6503);
      expect(coords.lat).toBe(35.6762);
      expect(coords.lon).toBe(139.6503);
    });

    it('should accept coordinates at equator', () => {
      const coords = new Coordinates(0, 0);
      expect(coords.lat).toBe(0);
      expect(coords.lon).toBe(0);
    });

    it('should throw error for invalid latitude (too high)', () => {
      expect(() => new Coordinates(91, 0)).toThrow('Invalid latitude');
    });

    it('should throw error for invalid latitude (too low)', () => {
      expect(() => new Coordinates(-91, 0)).toThrow('Invalid latitude');
    });

    it('should throw error for invalid longitude (too high)', () => {
      expect(() => new Coordinates(0, 181)).toThrow('Invalid longitude');
    });

    it('should throw error for invalid longitude (too low)', () => {
      expect(() => new Coordinates(0, -181)).toThrow('Invalid longitude');
    });
  });

  describe('equals', () => {
    it('should return true for equal coordinates', () => {
      const coords1 = new Coordinates(35.6762, 139.6503);
      const coords2 = new Coordinates(35.6762, 139.6503);
      expect(coords1.equals(coords2)).toBe(true);
    });

    it('should return false for different coordinates', () => {
      const coords1 = new Coordinates(35.6762, 139.6503);
      const coords2 = new Coordinates(35.6763, 139.6503);
      expect(coords1.equals(coords2)).toBe(false);
    });
  });

  describe('toObject', () => {
    it('should convert to plain object', () => {
      const coords = new Coordinates(35.6762, 139.6503);
      const obj = coords.toObject();
      expect(obj).toEqual({ lat: 35.6762, lon: 139.6503 });
    });
  });

  describe('toString', () => {
    it('should convert to string representation', () => {
      const coords = new Coordinates(35.6762, 139.6503);
      expect(coords.toString()).toBe('35.6762,139.6503');
    });
  });

  describe('fromObject', () => {
    it('should create from plain object', () => {
      const coords = Coordinates.fromObject({ lat: 35.6762, lon: 139.6503 });
      expect(coords.lat).toBe(35.6762);
      expect(coords.lon).toBe(139.6503);
    });
  });
});
