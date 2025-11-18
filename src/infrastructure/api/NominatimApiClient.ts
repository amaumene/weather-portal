/**
 * Nominatim API Client
 * Handles communication with OpenStreetMap Nominatim API
 */

import { Place } from '../../domain/entities/Place';
import { PlaceId } from '../../domain/value-objects/PlaceId';
import { Coordinates } from '../../domain/value-objects/Coordinates';
import { API_CONFIG } from '../../config/api.config';
import { ApiError } from '../errors/ApiError';

/**
 * Nominatim API Response Interface
 */
interface NominatimSearchResponse {
  place_id: number;
  osm_id: number;
  name?: string;
  names?: { name?: string };
  display_name: string;
  type: string;
  lat?: number;
  lon?: number;
  geometry?: {
    coordinates: [number, number];
  };
}

interface NominatimDetailsResponse {
  place_id: number;
  osm_id: number;
  name?: string;
  names?: { name?: string };
  display_name: string;
  type: string;
  lat?: number;
  lon?: number;
  geometry?: {
    coordinates: [number, number];
  };
}

export class NominatimApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = API_CONFIG.nominatim.baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Search for places by query string
   */
  async search(query: string, signal?: AbortSignal): Promise<Place[]> {
    const endpoint = `${this.baseUrl}${API_CONFIG.nominatim.endpoints.search}?format=json&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(endpoint, { signal });

      if (!response.ok) {
        throw ApiError.fromResponse(response, endpoint);
      }

      const data: NominatimSearchResponse[] = await response.json();
      return data.map((item) => this.transformToPlace(item));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw error; // Re-throw abort errors
      }
      throw ApiError.fromException(error, endpoint);
    }
  }

  /**
   * Get place details by OSM ID
   */
  async getPlaceDetails(osmId: string): Promise<Place | null> {
    const endpoint = `${this.baseUrl}${API_CONFIG.nominatim.endpoints.details}?osmtype=N&osmid=${osmId}&addressdetails=0&hierarchy=0&group_hierarchy=1&format=json`;

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw ApiError.fromResponse(response, endpoint);
      }

      const data: NominatimDetailsResponse = await response.json();
      return this.transformToPlace(data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw ApiError.fromException(error, endpoint);
    }
  }

  /**
   * Transform API response to Place entity
   */
  private transformToPlace(item: NominatimSearchResponse | NominatimDetailsResponse): Place {
    // Extract name
    const name = item.name || item.names?.name || '';

    // Extract coordinates
    let lat: number;
    let lon: number;

    if (item.lat != null && item.lon != null) {
      lat = item.lat;
      lon = item.lon;
    } else if (item.geometry?.coordinates) {
      lon = item.geometry.coordinates[0];
      lat = item.geometry.coordinates[1];
    } else {
      // Fallback to 0,0 if no coordinates available
      lat = 0;
      lon = 0;
    }

    return new Place({
      placeId: PlaceId.fromString(item.place_id.toString()),
      osmId: item.osm_id.toString(),
      name,
      displayName: item.display_name,
      addressType: item.type,
      coordinates: new Coordinates(lat, lon),
    });
  }
}
