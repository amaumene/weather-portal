<template>
  <div class="result">
    <div v-if="!searching">
      <h2 class="result__title">Search results for "{{ searchText }}"</h2>
      <ul v-if="places.length">
        <li class="result__item" v-for="place in places" :key="place.placeId.toString()">
          <SearchResultItem :place="place" @fav="toggleFav" :is-fav="isFav(place)" />
        </li>
      </ul>
      <div v-else class="result__noitem">
        No matching locations found
      </div>
    </div>
    <div v-else class="result__loading">
      Searching...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import SearchResultItem from "./SearchResultItem.vue";
import type { Place } from "../domain/entities/Place";
import { useSearchComposable } from "../presentation/composables/useSearchComposable";
import { useFavoritesComposable } from "../presentation/composables/useFavoritesComposable";

const props = defineProps<{
  searchText: string;
}>();

const places = ref<Place[]>([]);
const { search, searching } = useSearchComposable();
const { toggle: toggleFav, isFavorite: isFav } = useFavoritesComposable();

// Track AbortController to cancel previous searches
let abortController: AbortController | null = null;

watch(() => props.searchText, async (v) => {
  if (!v) {
    return;
  }

  // Cancel previous search if still running
  if (abortController) {
    abortController.abort();
  }

  // Create new AbortController for this search
  abortController = new AbortController();

  places.value = await search(v, abortController.signal);
}, {
  immediate: true,
});
</script>

<style lang="scss" scoped>
.result {
  margin-top: 1.5rem;

  &__title {
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  &__item {
    margin: 0.75rem 0;
    list-style: none;
  }

  &__noitem {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    margin-top: 1.2rem;
    font-size: 1rem;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  &__loading {
    color: white;
    text-align: center;
    font-size: 1rem;
    padding: 2rem;
  }
}
</style>
