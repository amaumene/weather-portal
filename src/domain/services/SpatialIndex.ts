/**
 * Spatial Index for efficient geographic lookups
 * Uses a grid-based index for fast proximity searches
 */

import type { MountainData } from './MountainProximityService';

interface GridCell {
  mountains: MountainData[];
}

export class SpatialIndex {
  private coordinateMap: Map<string, MountainData>;
  private grid: Map<string, GridCell>;
  private readonly gridSize: number;

  constructor(mountains: MountainData[], gridSize: number = 0.1) {
    this.gridSize = gridSize; // degrees (approx 11km at equator)
    this.coordinateMap = new Map();
    this.grid = new Map();

    this.buildIndex(mountains);
  }

  /**
   * Build the spatial index
   */
  private buildIndex(mountains: MountainData[]): void {
    const validMountains = mountains.filter(
      (m) => m.lat !== undefined && m.lon !== undefined
    );

    for (const mountain of validMountains) {
      // Add to coordinate map for exact matches
      const coordKey = this.getCoordinateKey(mountain.lat, mountain.lon);
      this.coordinateMap.set(coordKey, mountain);

      // Add to grid for proximity searches
      const gridKey = this.getGridKey(mountain.lat, mountain.lon);
      if (!this.grid.has(gridKey)) {
        this.grid.set(gridKey, { mountains: [] });
      }
      this.grid.get(gridKey)!.mountains.push(mountain);
    }
  }

  /**
   * Get key for exact coordinate match
   */
  private getCoordinateKey(lat: number, lon: number): string {
    return `${lat},${lon}`;
  }

  /**
   * Get grid cell key for a coordinate
   */
  private getGridKey(lat: number, lon: number): string {
    const gridLat = Math.floor(lat / this.gridSize);
    const gridLon = Math.floor(lon / this.gridSize);
    return `${gridLat},${gridLon}`;
  }

  /**
   * Find mountain at exact coordinates (O(1) lookup)
   */
  findExact(lat: number, lon: number): MountainData | undefined {
    const key = this.getCoordinateKey(lat, lon);
    return this.coordinateMap.get(key);
  }

  /**
   * Get all mountains in the same grid cell and neighboring cells
   */
  getNearbyMountains(lat: number, lon: number): MountainData[] {
    const nearby: MountainData[] = [];
    const centerGridKey = this.getGridKey(lat, lon);
    const [centerLat, centerLon] = centerGridKey.split(',').map(Number);

    // Check center cell and 8 surrounding cells (3x3 grid)
    for (let latOffset = -1; latOffset <= 1; latOffset++) {
      for (let lonOffset = -1; lonOffset <= 1; lonOffset++) {
        const gridKey = `${centerLat + latOffset},${centerLon + lonOffset}`;
        const cell = this.grid.get(gridKey);
        if (cell) {
          nearby.push(...cell.mountains);
        }
      }
    }

    return nearby;
  }

  /**
   * Get all indexed mountains
   */
  getAllMountains(): MountainData[] {
    return Array.from(this.coordinateMap.values());
  }

  /**
   * Get statistics about the index
   */
  getStats() {
    return {
      totalMountains: this.coordinateMap.size,
      gridCells: this.grid.size,
      averageMountainsPerCell: this.coordinateMap.size / this.grid.size,
    };
  }
}
