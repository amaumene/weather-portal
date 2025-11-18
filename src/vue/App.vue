<template>
  <div class="app">
    <AppHeader title="Weather Portal" v-model="menuOpened" />
    <main class="app__main">
      <SearchForm v-model="searchText" />
      <SearchResult :search-text="searchText" v-if="searchText" />
    </main>
    <AppFooter class="app__footer" />

    <SideOverlay
      :show="menuOpened"
      @close="menuOpened = false"
      @select="onSelect"
    />

    <!-- Fav -->
    <button class="app__fav" @click="favListOpened = true">
      <StarIcon class="app__fav-icon" active main-color="#fff" />
    </button>
    <Transition name="up">
      <FavListOverlay
        v-show="favListOpened"
        @close="favListOpened = false"
        @select="onSelect"
      />
    </Transition>

    <DetailOverlay v-if="place" :place="place" @close="clearID" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useScrollLock } from "@vueuse/core";

import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import SearchForm from "./SearchForm.vue";
import SearchResult from "./SearchResult.vue";
import SideOverlay from "./SideOverlay.vue";
import FavListOverlay from "./FavListOverlay.vue";
import StarIcon from "./StarIcon.vue";
import DetailOverlay from "./DetailOverlay.vue";
import { useDetail } from "../detail";

const { place, clearID } = useDetail();

const searchText = ref("");
const isWindowScrollLocked = useScrollLock(window);

// --- Side Menu Overlay ---
const menuOpened = ref(false);
const onSelect = (item: string) => {
  menuOpened.value = false;
  searchText.value = item;
};
watch(menuOpened, (v) => {
  isWindowScrollLocked.value = v;
});

// --- Favorite List Overlay ---
const favListOpened = ref(false);
watch(favListOpened, (v) => {
  isWindowScrollLocked.value = v;
  if (v) {
    history.pushState(null, "", location.pathname + "#fav");
  } else {
    history.replaceState(null, "", location.pathname);
  }
});
const syncFavWithHash = () => {
  favListOpened.value = location.hash === "#fav";
};

// Setup and cleanup event listener to prevent memory leak
onMounted(() => {
  window.addEventListener("hashchange", syncFavWithHash);
  syncFavWithHash();
});

onUnmounted(() => {
  window.removeEventListener("hashchange", syncFavWithHash);
});
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  padding-bottom: 2rem;

  &__main {
    max-width: 1200px;
    padding: 1.5rem;
    margin: 0 auto;
  }

  &__footer {
    padding: 2rem 0;
  }

  &__fav {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    cursor: pointer;
    background: linear-gradient(135deg, #f9b618 0%, #f39c12 100%);
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }
  }

  &__fav-icon {
    width: 28px;
    height: 28px;
  }
}

/* Transition for the favorite button */
.up-enter-active, .up-leave-active {
  transition: transform 0.3s ease;
}

.up-enter-from, .up-leave-to {
  transform: translateY(100%);
}

.up-enter-to, .up-leave-from {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .app__main {
    padding: 1rem;
  }
}
</style>

<style lang="scss">
/* Global styles for snowfinder theme */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
</style>
