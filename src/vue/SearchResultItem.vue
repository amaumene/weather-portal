<template>
  <Card class="item">
    <div class="item__info">
      <div class="item__info-main">
        <p class="item__name">{{ place.name }}</p>
        <p class="item__tag">{{ place.addressType }}</p>
      </div>
      <p class="item__detail">{{ detail }}</p>
      <p class="item__latlon">{{ place.lat }} / {{ place.lon }}</p>
    </div>
    <div class="item__actions">
      <a
        v-for="link in weatherLinks"
        :key="link.service"
        class="item__action-button"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="`/${link.service}.svg`" :alt="link.name">
        <span class="item__action-text">{{ getServiceDisplayName(link.service) }}</span>
      </a>
    </div>

    <StarIcon class="item__star" :active="isFav ?? false" @click='emit("fav", place)' />
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";
import StarIcon from "./StarIcon.vue";
import type { Place } from "../domain/entities/Place";
import { getServices } from "../application/ServiceContainer";

const props = defineProps<{
  place: Place;
  isFav?: boolean;
}>();

const emit = defineEmits<{
  (e: "fav", placeID: Place): void;
}>();

// Use domain entity method for formatted address
const detail = computed((): string => {
  return props.place.getFormattedAddress();
});

// Get weather service instance
const { weatherService } = getServices();

// Get all weather links using the weather service
const weatherLinks = computed(() => {
  return weatherService.getWeatherLinks(props.place);
});

// Helper function to get display name for each service
const getServiceDisplayName = (service: string): string => {
  const displayNames: Record<string, string> = {
    scw: 'SCW',
    windy: 'Windy',
    weatherNews: 'WN',
    yamaten: 'ヤマテン',
    meteoblue: 'Meteoblue',
  };
  return displayNames[service] || service;
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;

  &__info-main {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: flex-start;
  }

  &__name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
  }

  &__tag {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    margin-top: 0.2rem;
    font-size: 0.65rem;
    font-weight: 600;
    color: #fff;
    text-transform: capitalize;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 6px;
  }

  &__detail {
    margin-top: 0.3rem;
    font-size: 0.95rem;
    color: #555;
  }

  &__latlon {
    margin-top: 0.2rem;
    font-size: 0.85rem;
    color: #888;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0.75rem;
  }

  &__action-button {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #667eea;
    text-decoration: none;
    background: white;
    border: 2px solid rgba(102, 126, 234, 0.2);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
    transition: all 0.25s ease;

    img {
      width: 1.8rem;
      height: 1.8rem;
      vertical-align: middle;
      border-radius: 4px;
      object-fit: contain;
    }

    &:hover {
      background: rgba(102, 126, 234, 0.05);
      border-color: #667eea;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
      transform: translateY(-2px) scale(1.02);
    }

    &:active {
      transform: translateY(0) scale(0.98);
    }
  }

  &__action-text {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
  }

  &__star {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 22px;
    height: 22px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
