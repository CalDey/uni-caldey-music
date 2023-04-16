<template>
        <scroll-view class="theme-card p-2" :style="{'height': scrollHeight + 'px'}" :scroll-top="scrollTop" scroll-y @scroll="handleScroll" @scrolltolower="handleReachBottom">
            <view v-if="pageData.tag" class="theme-card-text">{{pageData.tag}}歌单</view>
            <view class="pb-24">
                <view class="grid grid-cols-2 gap-4">
                    <view v-for="item in list" :key="item.id" @click="handlePageChange(item.id)">
                        <view style="width:100%;height:44vw;">
                            <image v-if="album"  class="rounded-t-lg cover-img" style="width:100%;height:100%;display:block;" :src="(item as Album).picUrl + '?param=328y328'"
                                mode="widthFix" lazy-load />
                            <image v-else  class="rounded-t-lg cover-img" style="width:100%;height:100%;" :src="(item as PlayListDetail).coverImgUrl + '?param=328y328'"
                                mode="widthFix" lazy-load />
                        </view>
                        <view class="flex flex-col bg-white shadow-lg p-1 rounded-b-lg">
                            <text class="truncate text-sm my-1">{{item.name}}</text>
                            <text v-if="album" class="truncate text-xs my-1 text-gray-500">{{(item as Album).artist.name}}</text>
                            <text v-else class="truncate text-xs my-1 text-gray-500">{{(item as PlayListDetail).creator.nickname}}</text>
                        </view>
                    </view>
                </view>
                <Loading :loading="pageData.loading" />
            </view>
        </scroll-view>
</template>

<script setup lang="ts">
import type { PlayListDetail } from "@/config/models/playlist";
import type { Album } from '@/config/models/artist';
import Loading from '@/components/Loading.vue';

defineProps<{
    pageData: any;
    list: any;
    scrollTop: number;
    album?: boolean;    // album or playlist?
    scrollHeight: number;
}>()

const emit = defineEmits<{
    (e: 'scroll', event: any):void;
    (e: 'onReachBottom'):void;
    (e: 'gotoPlayListDetailPage', id: number):void
}>()

const handleScroll = (event:any) => {
    emit('scroll', event)
}

const handleReachBottom = () => {
    emit('onReachBottom')
}

const handlePageChange = (id: number) => {
    // console.log(id)
    emit('gotoPlayListDetailPage', id)
}
</script>