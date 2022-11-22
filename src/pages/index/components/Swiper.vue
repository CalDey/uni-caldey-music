<template>
  <view>
    <view v-if="banners.length <= 0" class="banner animate-pulse bg-gray-200"></view>
    <swiper v-else
      indicator-dots
      autoplay
      circular
      class="banner">
      <swiper-item v-for="item in (banners as Banner[])" :key="item.bannerId">
        <image
          class="w-full h-full"
          :src="item.pic + '?param=540y210'"
          mode="aspectFit"
          lazy-load
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import type { Banner } from "@/config/models/recommend";
defineProps<{
  banners: Banner[];
}>();
</script>

<style lang="scss">
.banner {
  height: 270rpx;
  @apply w-full;
}
</style>