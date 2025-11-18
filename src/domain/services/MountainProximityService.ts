/**
 * Mountain Proximity Service
 * Domain service for finding nearby mountains using spatial indexing
 */

import { distance } from '@turf/distance';
import { point } from '@turf/helpers';
import { Place } from '../entities/Place';
import { Coordinates } from '../value-objects/Coordinates';
import { APP_CONFIG } from '../../config/app.config';
import { SpatialIndex } from './SpatialIndex';

export interface MountainData {
  mid: string;
  name: string;
  lat: number;
  lon: number;
  place_id?: string;
  subname?: string;
}

export class MountainProximityService {
  private spatialIndex: SpatialIndex;

  constructor(mountains: MountainData[]) {
    // Build spatial index for O(1) exact lookups and faster proximity searches
    this.spatialIndex = new SpatialIndex(mountains);
  }

  /**
   * Find mountain at exact coordinates (O(1) lookup via spatial index)
   */
  findMountainAtCoordinates(coordinates: Coordinates): MountainData | undefined {
    return this.spatialIndex.findExact(coordinates.lat, coordinates.lon);
  }

  /**
   * Find nearest mountain within threshold distance
   * Uses spatial index to reduce search space
   */
  findNearestMountain(
    coordinates: Coordinates,
    maxDistanceKm: number = APP_CONFIG.mountainProximityThreshold,
  ): MountainData | undefined {
    // Try exact match first (O(1))
    const exactMatch = this.findMountainAtCoordinates(coordinates);
    if (exactMatch) {
      return exactMatch;
    }

    // Get nearby mountains from spatial index (much smaller search space)
    const nearbyMountains = this.spatialIndex.getNearbyMountains(
      coordinates.lat,
      coordinates.lon
    );

    // Find nearest mountain within threshold
    const from = point([coordinates.lon, coordinates.lat]);
    let minDist = maxDistanceKm + 1;
    let nearestMountain: MountainData | undefined = undefined;

    for (const mountain of nearbyMountains) {
      const to = point([mountain.lon, mountain.lat]);
      const dist = distance(from, to, { units: 'kilometers' });

      if (dist <= maxDistanceKm && dist < minDist) {
        minDist = dist;
        nearestMountain = mountain;
      }
    }

    return nearestMountain;
  }

  /**
   * Get mountain ID for a place (if nearby mountain exists)
   */
  getMountainIdForPlace(place: Place): string | undefined {
    const mountain = this.findNearestMountain(place.coordinates);
    return mountain?.mid;
  }

  /**
   * Calculate distance to nearest mountain (in kilometers)
   */
  getDistanceToNearestMountain(coordinates: Coordinates): number | null {
    const mountain = this.findNearestMountain(coordinates, Infinity);
    if (!mountain) {
      return null;
    }

    const from = point([coordinates.lon, coordinates.lat]);
    const to = point([mountain.lon, mountain.lat]);
    return distance(from, to, { units: 'kilometers' });
  }
}
