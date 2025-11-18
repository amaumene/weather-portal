/**
 * useFavorites Composable
 * Presentation layer composable for favorites functionality
 */

import { ref, computed } from 'vue';
import { getServices } from '../../application/ServiceContainer';
import type { Place } from '../../domain/entities/Place';

export const useFavoritesComposable = () => {
  const { favoriteService } = getServices();

  // Reactive ref to trigger updates
  const updateTrigger = ref(0);

  const favorites = computed(() => {
    // Access updateTrigger to make this reactive
    updateTrigger.value;
    return favoriteService.getAll();
  });

  const toggle = (place: Place): boolean => {
    const result = favoriteService.toggle(place);
    updateTrigger.value++; // Trigger reactivity
    return result;
  };

  const isFavorite = (place: Place): boolean => {
    // Access updateTrigger to make this reactive
    updateTrigger.value;
    return favoriteService.isFavorite(place);
  };

  const clearAll = (): void => {
    favoriteService.clearAll();
    updateTrigger.value++; // Trigger reactivity
  };

  const count = computed(() => favorites.value.length);

  return {
    favorites,
    toggle,
    isFavorite,
    clearAll,
    count,
  };
};
