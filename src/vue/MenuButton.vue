<template>
  <button
    class="menu-button"
    :aria-pressed="modelValue"
    :aria-label='modelValue ? "Close menu" : "Open menu"'
    @click="toggle"
  >
    <span :class='["bar", "bar1", { open: modelValue }]'></span>
    <span :class='["bar", "bar2", { open: modelValue }]'></span>
    <span :class='["bar", "bar3", { open: modelValue }]'></span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
const toggle = () => emit("update:modelValue", !props.modelValue);
</script>

<style scoped lang="scss">
.menu-button {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
}

.bar {
  position: relative;
  display: block;
  width: 1.6rem;
  height: 0.2rem;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.bar1.open {
  transform: translateY(0.5rem) rotate(45deg);
}

.bar2.open {
  opacity: 0;
}

.bar3.open {
  transform: translateY(-0.5rem) rotate(-45deg);
}
</style>
