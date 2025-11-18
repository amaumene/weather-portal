/**
 * Weather Service Link Builder
 * Domain service for building weather service URLs
 */

import { Place } from '../entities/Place';
import { WEATHER_SERVICES, type WeatherServiceKey } from '../../config/api.config';

export interface WeatherServiceLink {
  service: WeatherServiceKey;
  name: string;
  url: string;
}

export class WeatherServiceLinkBuilder {
  /**
   * Build SCW (SuperC Weather) link
   */
  buildSCWLink(place: Place): WeatherServiceLink {
    return {
      service: 'scw',
      name: WEATHER_SERVICES.scw.name,
      url: WEATHER_SERVICES.scw.buildUrl(place.lat, place.lon),
    };
  }

  /**
   * Build Windy link
   */
  buildWindyLink(place: Place): WeatherServiceLink {
    return {
      service: 'windy',
      name: WEATHER_SERVICES.windy.name,
      url: WEATHER_SERVICES.windy.buildUrl(place.lat, place.lon),
    };
  }

  /**
   * Build Weather News link
   */
  buildWeatherNewsLink(place: Place): WeatherServiceLink {
    return {
      service: 'weatherNews',
      name: WEATHER_SERVICES.weatherNews.name,
      url: WEATHER_SERVICES.weatherNews.buildUrl(place.lat, place.lon),
    };
  }

  /**
   * Build Yamaten (Mountain Weather) link
   * Returns null if no mountain ID available
   */
  buildYamatenLink(mountainId: string | undefined): WeatherServiceLink | null {
    if (!mountainId) {
      return null;
    }
    return {
      service: 'yamaten',
      name: WEATHER_SERVICES.yamaten.name,
      url: WEATHER_SERVICES.yamaten.buildUrl(mountainId),
    };
  }

  /**
   * Build Meteoblue link
   */
  buildMeteoblueLink(place: Place): WeatherServiceLink {
    return {
      service: 'meteoblue',
      name: WEATHER_SERVICES.meteoblue.name,
      url: WEATHER_SERVICES.meteoblue.buildUrl(place.lat, place.lon),
    };
  }

  /**
   * Build all available weather service links for a place
   */
  buildAllLinks(place: Place, mountainId?: string): WeatherServiceLink[] {
    const links: WeatherServiceLink[] = [
      this.buildSCWLink(place),
      this.buildWindyLink(place),
      this.buildWeatherNewsLink(place),
      this.buildMeteoblueLink(place),
    ];

    const yamatenLink = this.buildYamatenLink(mountainId);
    if (yamatenLink) {
      links.push(yamatenLink);
    }

    return links;
  }
}
