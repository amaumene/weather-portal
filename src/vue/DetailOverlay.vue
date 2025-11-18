<template>
  <div class="detail" :class="activeBreakpoint">
    <div class="detail__inner">
      <SearchResultItem class="detail__card" :place="place" @fav="toggle" :is-fav="isFav(place)" />
      <div class="detail__actions">
        <button v-if="showShareButton" class="detail__share" @click="share">Share</button>
        <CloseButton class="detail__close" @click='$emit("close")' aria-label="Close detail view" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useBreakpoints } from "@vueuse/core";

import SearchResultItem from "./SearchResultItem.vue";
import CloseButton from "./CloseButton.vue";
import type { Place } from "../domain/entities/Place";
import { useFavoritesComposable } from "../presentation/composables/useFavoritesComposable";

const { isFavorite: isFav, toggle } = useFavoritesComposable();

const props = defineProps<{
  place: Place;
}>();

defineEmits<{
  (e: "close"): void;
}>();

onMounted(() => {
  document.querySelector("input")?.blur();
});

/* share button */
const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 800,
});
const activeBreakpoint = breakpoints.active();
// show share button only on mobile size
const showShareButton = breakpoints.smallerOrEqual("tablet");

const shareData = computed(() => {
  const baseUrl = window.location.origin + window.location.pathname;
  return {
    title: props.place.name,
    url: `${baseUrl}/?id=${props.place.osmId}`,
  };
});

const share = async () => {
  if (!navigator.share || !navigator.canShare(shareData.value)) {
    console.warn('Web Share API not supported or data not shareable');
    return;
  }

  try {
    await navigator.share(shareData.value);
  } catch (err) {
    // User cancelled or share failed - only log if it's not an AbortError
    if (err instanceof Error && err.name !== 'AbortError') {
      console.error('Share failed:', err);
    }
  }
};
</script>

<style scoped lang="scss">
.detail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(3px);

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 800px;
  }

  &__actions {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  }

  &__share {
    height: 36px;
    padding: 0 16px;
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: 6px;
  }

  &__close {
    width: 36px;
    height: 36px;
    background-color: white;
    border-radius: 6px;
  }
}
</style>
