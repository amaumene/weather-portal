<template>
  <div class="menu">
    <div class="menu__header">
      <CloseButton class="menu__close" @click='emit("close")' aria-label="Close favorites" />
      <p class="menu__title">Favorites</p>
    </div>
    <ul class="menu__list">
      <li class="menu__item" v-for="place in favList" :key="place.placeId.toString()">
        <SearchResultItem :place="place" is-fav @fav="toggle" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesComposable } from "../presentation/composables/useFavoritesComposable";
import SearchResultItem from "./SearchResultItem.vue";
import CloseButton from "./CloseButton.vue";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "select", item: string): void;
}>();

const { favorites: favList, toggle } = useFavoritesComposable();
</script>

<style scoped lang="scss">
.menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100dvw;
  height: 100dvh;
  padding-bottom: 1rem;
  overflow-y: auto;
  overscroll-behavior-y: none;
  background: #f0f4f8;

  &__header {
    background-color: #fff;
  }

  &__close {
    position: absolute;
    top: 10px;
    left: 12px;
    width: 30px;
    height: 30px;
  }

  &__title {
    padding: 0.8rem;
    font-size: 1rem;
    font-style: normal;
    font-optical-sizing: auto;
    text-align: center;
    border-bottom: 1px solid #d8d8d8;
  }

  &__list {
    max-width: 800px;
    padding: 0 1rem;
    margin: 0 auto;
  }

  &__item {
    margin-top: 0.5rem;
    list-style: none;
  }
}
</style>
