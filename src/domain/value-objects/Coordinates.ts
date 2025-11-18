/**
 * Coordinates Value Object
 * Represents a geographic coordinate pair (latitude, longitude)
 */

export class Coordinates {
  constructor(
    public readonly lat: number,
    public readonly lon: number,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.lat < -90 || this.lat > 90) {
      throw new Error(`Invalid latitude: ${this.lat}. Must be between -90 and 90.`);
    }
    if (this.lon < -180 || this.lon > 180) {
      throw new Error(`Invalid longitude: ${this.lon}. Must be between -180 and 180.`);
    }
  }

  /**
   * Check if coordinates are equal
   */
  equals(other: Coordinates): boolean {
    return this.lat === other.lat && this.lon === other.lon;
  }

  /**
   * Convert to plain object
   */
  toObject(): { lat: number; lon: number } {
    return {
      lat: this.lat,
      lon: this.lon,
    };
  }

  /**
   * Create from plain object
   */
  static fromObject(obj: { lat: number; lon: number }): Coordinates {
    return new Coordinates(obj.lat, obj.lon);
  }

  /**
   * Convert to string representation
   */
  toString(): string {
    return `${this.lat},${this.lon}`;
  }
}
