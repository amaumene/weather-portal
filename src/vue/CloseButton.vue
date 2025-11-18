<template>
  <button class="close-button" @click="$emit('click')" :aria-label="ariaLabel">
    <span class="sr-only">{{ ariaLabel }}</span>
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  ariaLabel?: string;
}>(), {
  ariaLabel: 'Close',
});

defineEmits<{
  (e: 'click'): void;
}>();
</script>

<style scoped lang="scss">
.close-button {
  position: relative;
  display: block;
  cursor: pointer;
  background: none;
  border: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 18px;
    content: "";
    background: #333;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
