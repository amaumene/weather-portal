/**
 * useWeather Composable
 * Presentation layer composable for weather service links
 */

import { computed } from 'vue';
import { getServices } from '../../application/ServiceContainer';
import type { Place } from '../../domain/entities/Place';
import type { WeatherServiceLink } from '../../domain/services/WeatherServiceLinkBuilder';

export const useWeatherComposable = (place: Place) => {
  const { weatherService } = getServices();

  const weatherLinks = computed((): WeatherServiceLink[] => {
    return weatherService.getWeatherLinks(place);
  });

  const mountainId = computed((): string | undefined => {
    return weatherService.getMountainId(place);
  });

  const distanceToMountain = computed((): number | null => {
    return weatherService.getDistanceToNearestMountain(place);
  });

  return {
    weatherLinks,
    mountainId,
    distanceToMountain,
  };
};
