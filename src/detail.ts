import { ref, watch } from "vue";
import { useUrlSearchParams } from "@vueuse/core";
import type { Place } from "./domain/entities/Place";
import { useSearchComposable } from "./presentation/composables/useSearchComposable";

// Validate OSM ID format - should be a positive integer
const isValidOsmId = (value: string): boolean => {
  return /^\d+$/.test(value) && Number(value) > 0 && Number(value) <= Number.MAX_SAFE_INTEGER;
};

export const useDetail = () => {
  const place = ref<Place | null>(null);
  const params = useUrlSearchParams("history", {
    writeMode: "push",
  });
  const clearID = () => {
    delete params.id;
    place.value = null;
  };

  const { searchById } = useSearchComposable();
  watch(() => params.id, async (newId) => {
    const id = Array.isArray(newId) ? newId[0] : newId;
    if (!id) {
      place.value = null;
      return;
    }
    if (!isValidOsmId(id)) {
      place.value = null;
      return;
    }
    place.value = await searchById(id);
  }, { immediate: true });

  return {
    place,
    clearID,
  };
};
