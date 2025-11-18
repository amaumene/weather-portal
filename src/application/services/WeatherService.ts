/**
 * Weather Service
 * Application service for weather-related operations
 */

import { Place } from '../../domain/entities/Place';
import {
  WeatherServiceLinkBuilder,
  type WeatherServiceLink,
} from '../../domain/services/WeatherServiceLinkBuilder';
import { MountainProximityService } from '../../domain/services/MountainProximityService';

export class WeatherService {
  constructor(
    private readonly linkBuilder: WeatherServiceLinkBuilder,
    private readonly mountainService: MountainProximityService,
  ) {}

  /**
   * Get all weather service links for a place
   */
  getWeatherLinks(place: Place): WeatherServiceLink[] {
    const mountainId = this.mountainService.getMountainIdForPlace(place);
    return this.linkBuilder.buildAllLinks(place, mountainId);
  }

  /**
   * Get mountain ID for a place (if nearby mountain exists)
   */
  getMountainId(place: Place): string | undefined {
    return this.mountainService.getMountainIdForPlace(place);
  }

  /**
   * Get distance to nearest mountain in kilometers
   */
  getDistanceToNearestMountain(place: Place): number | null {
    return this.mountainService.getDistanceToNearestMountain(
      place.coordinates,
    );
  }
}
