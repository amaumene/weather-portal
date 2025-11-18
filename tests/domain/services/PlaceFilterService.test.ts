/**
 * Tests for PlaceFilterService
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { PlaceFilterService } from '../../../src/domain/services/PlaceFilterService';
import { Place } from '../../../src/domain/entities/Place';
import { PlaceId } from '../../../src/domain/value-objects/PlaceId';
import { Coordinates } from '../../../src/domain/value-objects/Coordinates';

describe('PlaceFilterService', () => {
  let service: PlaceFilterService;
  let japanPlace: Place;
  let usPlace: Place;

  beforeEach(() => {
    service = new PlaceFilterService();

    japanPlace = new Place({
      placeId: PlaceId.fromString('1'),
      osmId: '100',
      name: 'Tokyo',
      displayName: 'Tokyo, Japan',
      addressType: 'city',
      coordinates: new Coordinates(35.6762, 139.6503),
    });

    usPlace = new Place({
      placeId: PlaceId.fromString('2'),
      osmId: '200',
      name: 'New York',
      displayName: 'New York, USA',
      addressType: 'city',
      coordinates: new Coordinates(40.7128, -74.0060),
    });
  });

  describe('filterJapanOnly', () => {
    it('should filter only Japan places', () => {
      const places = [japanPlace, usPlace];
      const filtered = service.filterJapanOnly(places);
      expect(filtered).toHaveLength(1);
      expect(filtered[0]).toBe(japanPlace);
    });

    it('should return empty array if no Japan places', () => {
      const places = [usPlace];
      const filtered = service.filterJapanOnly(places);
      expect(filtered).toHaveLength(0);
    });
  });

  describe('filterByCountry', () => {
    it('should filter by specified country', () => {
      const places = [japanPlace, usPlace];
      const filtered = service.filterByCountry(places, 'USA');
      expect(filtered).toHaveLength(1);
      expect(filtered[0]).toBe(usPlace);
    });
  });

  describe('removeDuplicates', () => {
    it('should remove duplicate places', () => {
      const duplicate = new Place({
        placeId: PlaceId.fromString('1'), // Same ID as japanPlace
        osmId: '100',
        name: 'Tokyo',
        displayName: 'Tokyo, Japan',
        addressType: 'city',
        coordinates: new Coordinates(35.6762, 139.6503),
      });

      const places = [japanPlace, usPlace, duplicate];
      const unique = service.removeDuplicates(places);
      expect(unique).toHaveLength(2);
    });

    it('should preserve order of first occurrence', () => {
      const duplicate = new Place({
        placeId: PlaceId.fromString('1'),
        osmId: '100',
        name: 'Tokyo Duplicate',
        displayName: 'Tokyo, Japan',
        addressType: 'city',
        coordinates: new Coordinates(35.6762, 139.6503),
      });

      const places = [japanPlace, duplicate];
      const unique = service.removeDuplicates(places);
      expect(unique[0].name).toBe('Tokyo'); // First occurrence preserved
    });
  });
});
