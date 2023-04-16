<template>
    <view v-if="loading" class="theme-card p-2 flex justify-center items-center">
        <MusicWave />
        <view class="ml-2 text-md">加载中...</view>
    </view>
</template>

<script setup lang="ts">
import MusicWave from './MusicWave.vue'

defineProps<{
    loading: boolean
}>()
</script>