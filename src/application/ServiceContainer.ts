/**
 * Service Container
 * Dependency injection container for application services
 */

import { SearchService } from './services/SearchService';
import { FavoriteService } from './services/FavoriteService';
import { WeatherService } from './services/WeatherService';

import { NominatimApiClient } from '../infrastructure/api/NominatimApiClient';
import { CachedPlaceRepository } from '../infrastructure/repositories/PlaceRepository';
import { LocalStorageFavoriteRepository } from '../infrastructure/repositories/FavoriteRepository';
import { LocalStorageHistoryRepository } from '../infrastructure/repositories/HistoryRepository';
import { LocalStorageAdapter } from '../infrastructure/storage/StorageAdapter';

import { PlaceFilterService } from '../domain/services/PlaceFilterService';
import { WeatherServiceLinkBuilder } from '../domain/services/WeatherServiceLinkBuilder';
import { MountainProximityService } from '../domain/services/MountainProximityService';

// Import mountain data
import { mountains } from '../yamaten_data';

/**
 * Service Container for dependency injection
 */
export class ServiceContainer {
  private static instance: ServiceContainer;

  // Infrastructure
  private readonly storage = new LocalStorageAdapter();
  private readonly apiClient = new NominatimApiClient();

  // Repositories
  private readonly placeRepository = new CachedPlaceRepository(this.apiClient);
  private readonly favoriteRepository = new LocalStorageFavoriteRepository(this.storage);
  private readonly historyRepository = new LocalStorageHistoryRepository(this.storage);

  // Domain Services
  private readonly filterService = new PlaceFilterService();
  private readonly linkBuilder = new WeatherServiceLinkBuilder();
  private readonly mountainService = new MountainProximityService(mountains);

  // Application Services
  private readonly searchServiceInstance = new SearchService(
    this.placeRepository,
    this.historyRepository,
    this.filterService,
  );

  private readonly favoriteServiceInstance = new FavoriteService(
    this.favoriteRepository,
  );

  private readonly weatherServiceInstance = new WeatherService(
    this.linkBuilder,
    this.mountainService,
  );

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  // Service Getters
  get searchService(): SearchService {
    return this.searchServiceInstance;
  }

  get favoriteService(): FavoriteService {
    return this.favoriteServiceInstance;
  }

  get weatherService(): WeatherService {
    return this.weatherServiceInstance;
  }
}

// Export singleton instance getter
export const getServices = () => ServiceContainer.getInstance();
