/**
 * useSearch Composable
 * Presentation layer composable for search functionality
 */

import { ref } from 'vue';
import { getServices } from '../../application/ServiceContainer';
import type { Place } from '../../domain/entities/Place';

export const useSearchComposable = () => {
  const { searchService } = getServices();
  const searching = ref(false);
  const error = ref<string | null>(null);

  const search = async (query: string, signal?: AbortSignal): Promise<Place[]> => {
    searching.value = true;
    error.value = null;

    try {
      return await searchService.search(query, signal);
    } catch (err) {
      // Don't set error if request was aborted
      if (err instanceof Error && err.name === 'AbortError') {
        return [];
      }
      const message = err instanceof Error ? err.message : 'Search failed';
      error.value = message;
      console.error('Search error:', err);
      return [];
    } finally {
      searching.value = false;
    }
  };

  const searchById = async (osmId: string): Promise<Place | null> => {
    try {
      return await searchService.getPlaceById(osmId);
    } catch (err) {
      console.error('Search by ID error:', err);
      return null;
    }
  };

  const getHistory = (): string[] => {
    return searchService.getHistory();
  };

  const clearHistory = (): void => {
    searchService.clearHistory();
  };

  return {
    search,
    searchById,
    searching,
    error,
    getHistory,
    clearHistory,
  };
};
