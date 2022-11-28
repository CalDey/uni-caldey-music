<template>
    <view class="">
        <view v-if="!playlistDetail" class="theme-card p-4 ">
            <view class="flex">
                <view class="w-32 h-32 rounded-lg flex-shrink-0 animate-pulse bg-gray-200"></view>
                <view class="ml-2">
                    <view class="w-44 h-6 animate-pulse bg-gray-200"></view>
                    <view class="w-44 h-6 animate-pulse bg-gray-200 mt-2"></view>
                    <view class="flex items-center mt-2">
                        <view class="w-6 h-6 rounded-full animate-pulse bg-gray-200"></view>
                        <view class="ml-2 w-44 h-6 animate-pulse bg-gray-200"></view>
                    </view>
                    <view class="w-44 h-6 animate-pulse bg-gray-200 mt-2"></view>
                </view>
            </view>
        </view>
        <view v-else class="theme-card p-4">
            <view class="flex">
                <CoverItem v-if="album" :imgUrl="(playlistDetail as Album).picUrl" :size=32 :limit-size=256 />
                <CoverItem v-else :imgUrl="(playlistDetail as PlayListDetail).coverImgUrl" :size=32 :limit-size=256 />
                <view class="ml-2">
                    <view class="text-ellipsis theme-card-text">{{playlistDetail.name}}</view>
                    <view class="flex items-center mt-2">
                        <image
                            v-if="album"
                            class="w-6 h-6 rounded-full"
                            :src="(playlistDetail as Album).artist.picUrl"
                            mode="scaleToFill"
                        />
                        <image
                            v-else
                            class="w-6 h-6 rounded-full"
                            :src="(playlistDetail as PlayListDetail).creator.avatarUrl"
                            mode="scaleToFill"
                        />
                        <view v-if="album" class="text-sm text-gray-500 ml-2 w-44 truncate">{{ (playlistDetail as Album).artist.name }}</view>
                        <view v-else class="text-sm text-gray-500 ml-2 w-44 truncate">{{ (playlistDetail as PlayListDetail).creator.nickname }}</view>
                    </view>
                    <view class="text-sm w-44 text-ellipsis mt-2 text-gray-500">简介：{{playlistDetail.description}}</view>
                </view>
            </view>
       </view>
       <view class="pl-4 text-lg flex items-center theme-card bg-slate-100" @click="handlePlayAll">
                <i class="iconfont icon-bofang text-2xl mr-2"></i>
                <text>播放全部</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import CoverItem from '@/components/CoverItem.vue'
import type { PlayListDetail } from '@/config/models/playlist';
import type { Album } from '@/config/models/artist';
defineProps<{
    playlistDetail: PlayListDetail | Album;
    album?: boolean;    // album or playlist?
}>()

const emit = defineEmits<{
    (e: 'playAll'):void
}>()

const handlePlayAll = () => {
    emit('playAll')
}
</script>