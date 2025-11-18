<template>
  <header class="header">
    <h1 class="header__title">☀️ {{ title }}</h1>
    <p class="header__subtitle">Weather services for locations in Japan</p>
    <MenuButton class="header__menu" v-model="menuOpened" />
  </header>
</template>

<script setup lang="ts">
import MenuButton from "./MenuButton.vue";
defineProps<{
  title: string;
}>();
const menuOpened = defineModel<boolean>({ default: false });
</script>

<style scoped lang="scss">
.header {
  position: relative;
  padding: 2rem 1rem 1.5rem;
  color: white;
  text-align: center;
  background: transparent;

  &__title {
    margin: 0 0 0.5rem 0;
    font-family: "Josefin Sans", sans-serif;
    font-size: 3rem;
    font-weight: 400;
    font-style: normal;
    font-optical-sizing: auto;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  &__subtitle {
    margin: 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  &__menu {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    z-index: 10;
  }
}

@media (max-width: 768px) {
  .header__title {
    font-size: 2rem;
  }

  .header__subtitle {
    font-size: 0.9rem;
  }
}
</style>
