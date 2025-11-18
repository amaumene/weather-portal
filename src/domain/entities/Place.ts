/**
 * Place Entity
 * Represents a geographic location with rich domain logic
 */

import { Coordinates } from '../value-objects/Coordinates';
import { PlaceId } from '../value-objects/PlaceId';

export interface PlaceProps {
  placeId: PlaceId;
  osmId: string;
  name: string;
  displayName: string;
  addressType: string;
  coordinates: Coordinates;
}

export class Place {
  constructor(private readonly props: PlaceProps) {}

  // Getters
  get placeId(): PlaceId {
    return this.props.placeId;
  }

  get osmId(): string {
    return this.props.osmId;
  }

  get name(): string {
    return this.props.name;
  }

  get displayName(): string {
    return this.props.displayName;
  }

  get addressType(): string {
    return this.props.addressType;
  }

  get coordinates(): Coordinates {
    return this.props.coordinates;
  }

  get lat(): number {
    return this.props.coordinates.lat;
  }

  get lon(): number {
    return this.props.coordinates.lon;
  }

  /**
   * Check if this place is in a specific country
   */
  isInCountry(country: string): boolean {
    return this.displayName.endsWith(country);
  }

  /**
   * Check if this place is in Japan
   */
  isInJapan(): boolean {
    return this.isInCountry('Japan');
  }

  /**
   * Get formatted address parts (without country)
   */
  getAddressParts(): string[] {
    if (!this.displayName.endsWith('日本')) {
      return [];
    }
    return this.displayName
      .split(', ')
      .slice(0, -1) // Remove last part (country)
      .filter((part) => part !== '日本')
      .filter((part) => !/^\d{3}-\d{4}$/.test(part)); // Remove postal codes
  }

  /**
   * Get formatted address (reversed order, Japan style)
   */
  getFormattedAddress(): string {
    const parts = this.getAddressParts();
    return parts.reverse().join(' ');
  }

  /**
   * Convert to plain object for serialization
   */
  toObject(): {
    place_id: string;
    osm_id: string;
    name: string;
    display_name: string;
    addresstype: string;
    lat: number;
    lon: number;
  } {
    return {
      place_id: this.placeId.toString(),
      osm_id: this.osmId,
      name: this.name,
      display_name: this.displayName,
      addresstype: this.addressType,
      lat: this.lat,
      lon: this.lon,
    };
  }

  /**
   * Create Place from plain object
   */
  static fromObject(obj: {
    place_id: string;
    osm_id: string;
    name: string;
    display_name: string;
    addresstype: string;
    lat: number;
    lon: number;
  }): Place {
    return new Place({
      placeId: PlaceId.fromString(obj.place_id),
      osmId: obj.osm_id,
      name: obj.name,
      displayName: obj.display_name,
      addressType: obj.addresstype,
      coordinates: new Coordinates(obj.lat, obj.lon),
    });
  }

  /**
   * Check if two places are equal
   */
  equals(other: Place): boolean {
    return this.placeId.equals(other.placeId);
  }
}
