<template>
    <view class="theme-card text-lg">
        <view v-if="tags.length <= 0" class="w-full">
            <view class="p-2">全部</view>
        </view>
        <scroll-view v-else scroll-x class="w-full" style="white-space: nowrap;">
            <view class="inline-block p-2"
            :class="currIdx === -1 ? 'text-blue-300 tag__line_active' : ''"
            @click="handleTagClick('全部', -1)">全部</view>
            <view v-for="(tag, index) in tags" :key="index"
            class="inline-block p-2"
            :class="currIdx === index ? 'text-blue-300 tag__line_active' : ''"
            @click="handleTagClick(tag.name, index)">{{tag.name}}</view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PlaylistHighqualityTag } from "@/config/models/playlist";
defineProps<{
  tags: PlaylistHighqualityTag[];
}>();
const emit = defineEmits<{
    (e: 'tagChange', tagName: string):void;
}>()

const currIdx = ref<number>(-1)    // 默认 全部 id：-1

const handleTagClick = (tagName: string, idx: number) => {
    currIdx.value = idx
    emit('tagChange', tagName);
    // console.log(tagName, idx)
}
</script>

<style lang="scss" scoped>
.tag__line_active {
    border-bottom: .2rem solid #93C5FD;
}
</style>