/**
 * Place Filter Service
 * Domain service for filtering places based on business rules
 */

import { Place } from '../entities/Place';
import { APP_CONFIG } from '../../config/app.config';

export class PlaceFilterService {
  /**
   * Filter places that are in Japan
   */
  filterJapanOnly(places: Place[]): Place[] {
    return places.filter((place) => place.isInJapan());
  }

  /**
   * Filter places by country
   */
  filterByCountry(places: Place[], country: string): Place[] {
    return places.filter((place) => place.isInCountry(country));
  }

  /**
   * Filter places by target country from config
   */
  filterByTargetCountry(places: Place[]): Place[] {
    return this.filterByCountry(places, APP_CONFIG.targetCountry);
  }

  /**
   * Remove duplicates based on place ID
   */
  removeDuplicates(places: Place[]): Place[] {
    const seen = new Set<string>();
    return places.filter((place) => {
      const id = place.placeId.toString();
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });
  }
}
