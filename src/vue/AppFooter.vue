<template>
  <footer class="footer">
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;

  &__text {
    font-size: 0.85rem;
    margin: 0;

    a {
      color: white;
      text-decoration: underline;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  &__version {
    padding-bottom: 10px;
    margin-top: 4px;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>
