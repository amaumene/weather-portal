/**
 * PlaceId Value Object
 * Represents a unique identifier for a place
 */

export class PlaceId {
  constructor(private readonly value: string) {
    if (!value || value.trim() === '') {
      throw new Error('PlaceId cannot be empty');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: PlaceId): boolean {
    return this.value === other.value;
  }

  static fromString(value: string): PlaceId {
    return new PlaceId(value);
  }
}
