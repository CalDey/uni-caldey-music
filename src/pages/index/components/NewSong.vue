<template>
    <view>
        <view class="mt-2 theme-card p-2 theme-card-text">推荐新音乐</view>
        <view class="theme-card pb-24">
            <ul v-if="(PersonalizedNewSongData as any).length <= 0">
                <!-- skeleton -->
                <li v-for="item in 5" :key="item" class="flex items-center mb-2 theme-card p-2">
                    <view class="animate-pulse bg-gray-200 w-14 h-14 flex-shrink-0 rounded-lg"></view>
                    <view class="pl-2 w-60">
                        <view class="animate-pulse bg-gray-200 w-56 h-6 my-2"></view>
                        <view class="animate-pulse bg-gray-200 w-56 h-6 my-2"></view> 
                    </view>
                </li>
            </ul>
            <ul v-else>
                <li v-for="item in (PersonalizedNewSongData as PersonalizedNewSong[])" :key="item.id"
                class="flex items-center mb-2 theme-card p-2"
                @click="play(item.id)">
                    <CoverItem :imgUrl="item.picUrl" :size="14" :limit-size=112 />
                    <view class="pl-2 flex-1 truncate">
                        <view class="truncate my-2 text-sm">{{item.name}}</view>
                        <view class="truncate my-2 text-xs text-gray-500">{{item.song.artists[0].name}}</view>
                    </view>
                    <MusicWave v-if="item.id === id" />
                    <i v-else class="iconfont icon-bofang text-2xl"></i>
                </li>
            </ul>
        </view>
    </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/store/player'
import type { PersonalizedNewSong } from "@/config/models/recommend";
import CoverItem from '@/components/CoverItem.vue';
import MusicWave from '@/components/MusicWave.vue';

const { id } = storeToRefs(usePlayerStore());

defineProps<{
  PersonalizedNewSongData: PersonalizedNewSong[];
}>();

const { play } = usePlayerStore();
</script>