<template>
  <Card class="search">
    <form @submit.prevent="search" class="search__form">
      <div class="search__input-wrapper">
        <input
          type="search"
          placeholder="Where?"
          v-model.trim="searchText"
          class="search__input"
          autofocus
        />
        <button
          type="button"
          @click="useCurrentLocation"
          class="search__location-button"
          :disabled="isLoadingLocation"
          title="Use current location"
        >
          <svg v-if="!isLoadingLocation" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M10 2 L10 5 M10 15 L10 18 M2 10 L5 10 M15 10 L18 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span v-else class="search__location-spinner">⟳</span>
        </button>
      </div>
      <button type="submit" class="search__button">Go</button>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useDebounceFn, watchDebounced } from "@vueuse/core";
import Card from "./Card.vue";

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

// local state for search text
const searchText = ref(props.modelValue);

// watch for changes in the modelValue prop
watch(() => props.modelValue, (val) => {
  searchText.value = val;
});

// Debounced watcher to emit updates (300ms delay)
watchDebounced(
  searchText,
  (value) => {
    if (value.trim()) {
      emit("update:modelValue", value.trim());
    }
  },
  { debounce: 300 }
);

const search = () => {
  emit("update:modelValue", searchText.value.trim());
  (document.activeElement as HTMLElement)?.blur();
};

// Geolocation state
const isLoadingLocation = ref(false);

const useCurrentLocation = async () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  isLoadingLocation.value = true;

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });

    const { latitude, longitude } = position.coords;

    // Use reverse geocoding to get place name
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );

    if (!response.ok) {
      throw new Error("Failed to get location name");
    }

    const data = await response.json();
    const placeName = data.address?.city || data.address?.town || data.address?.village || data.display_name;

    searchText.value = placeName;
    emit("update:modelValue", placeName);
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Location permission denied. Please enable location access in your browser.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("Location request timed out.");
          break;
      }
    } else {
      alert("Failed to get current location. Please try again.");
    }
  } finally {
    isLoadingLocation.value = false;
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 0;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    width: 100%;
    padding: 0.875rem 3rem 0.875rem 1rem;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  &__location-button {
    position: absolute;
    right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    color: #667eea;
    cursor: pointer;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: rgba(102, 126, 234, 0.1);
      border-color: #667eea;
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      flex-shrink: 0;
    }
  }

  &__location-spinner {
    display: inline-block;
    font-size: 1.2rem;
    animation: spin 1s linear infinite;
  }

  &__input::-webkit-search-cancel-button {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &__button {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
