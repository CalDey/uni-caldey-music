<template>
    <view>
        <view class="mt-2 theme-card theme-card-text">推荐歌单</view>
        <view class="theme-card">
            <scroll-view scroll-x class="w-full" style="white-space: nowrap;">
                <view v-if="(personalizedData as any).length <= 0">
                    <!-- skeleton -->
                    <view v-for="item in 8" :key="item" class="inline-block mr-2 w-32">
                        <view class="animate-pulse bg-gray-200 w-32 h-32  rounded-lg"></view>
                        <view class="animate-pulse bg-gray-200 w-32 h-4  rounded-lg mt-2"></view>
                    </view>
                </view>
                <view class="flex" v-else>
                    <view v-for="item in (personalizedData as Personalized[])" :key="item.id" class="inline-block mr-2 w-32" @click="gotoPlayListDetailPage(item.id)">
                        <CoverItem :imgUrl="item.picUrl" :size=32 :limit-size=256 />
                        <view>
                            <text class="text-ellipsis text-sm">{{item.name}}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { Personalized } from "@/config/models/recommend";
import CoverItem from '@/components/CoverItem.vue'
defineProps<{
  personalizedData: Personalized[];
}>();

const gotoPlayListDetailPage = (id:number) => {
    uni.navigateTo({
        url: `../../../../playlist/playlistDetail?id=${id}&type=playlist`
    })
}
</script>