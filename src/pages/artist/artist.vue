<template>
    <view>
        <view id="top" class="theme-card text-sm fixed fix-scroll z-10">
            <!-- 歌手筛选列表 -->
            <view v-for="option in options" :key="option.key">
                <scroll-view scroll-x class="py-2 w-full" style="white-space: nowrap;">
                    <view v-for="item in option.list" :key="item.key"
                        class="inline-block bg-slate-100 shadow-lg p-2 mr-2 my-1" :class="
                            (item.key === pageData.type && option.key === 'type') ||
                            (item.key === pageData.area && option.key === 'area') ||
                            (item.key === pageData.initial && option.key === 'initial')
                                ? 'bg-blue-300 text-white'
                                : ''
                        " @click="changeOptions(option.key, item.key)">
                        <text>{{item.name}}</text>
                    </view>
                </scroll-view>
            </view>
        </view>
        <!-- 歌手列表 -->
        <view class="theme-card text-sm pt-52">
            <view v-if="scrollH === 0 || list.length <= 0">
                <view class="grid grid-cols-2 gap-4 py-2">
                    <!-- skeleton -->
                    <view v-for="item in 4" :key="item">
                        <view class="flex flex-col items-center theme-card">
                            <view class="animate-pulse bg-gray-200 rounded-full w-32 h-32"></view>
                            <view class="animate-pulse bg-gray-200 my-2 w-20 h-4 text-center"></view>
                        </view>
                    </view>
                </view>
            </view>
            <view v-else>
                <scroll-view :style="{'height': scrollH + 'px'}" :scroll-top="scrollTop" scroll-y @scroll="scroll" @scrolltolower="onReachBottom">
                    <view v-if="(topArtist as any).length <= 0" class="grid grid-cols-2 gap-4 py-2">
                        <!-- skeleton -->
                        <view v-for="item in 4" :key="item">
                            <view class="flex flex-col items-center theme-card">
                                <view class="animate-pulse bg-gray-200 rounded-full w-32 h-32"></view>
                                <view class="animate-pulse bg-gray-200 my-2 w-20 h-4 text-center"></view>
                            </view>
                        </view>
                    </view>
                    <view v-else class="grid grid-cols-2 gap-4 py-2 pb-24">
                        <!-- 前四人显示头像 -->
                        <view v-for="item in topArtist" :key="item.id" @click="gotoArtistDetailPage(item.id)">
                            <view class="flex flex-col items-center theme-card">
                                <view v-if="pageData.loading" class="animate-pulse bg-gray-200 rounded-full w-32 h-32"></view>
                                <CoverItem v-else :imgUrl="item.img1v1Url" :size=32 :limit-size=240 circle />
                                <view class="my-2 w-32 text-center truncate">{{ item.name }}</view>
                            </view>
                        </view>
                        <view v-for="item in list" :key="item.id" class="truncate theme-card" @click="gotoArtistDetailPage(item.id)">
                        {{ item.name }}
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
    <Player />
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { options } from './artistOptions';
import { artist } from '@/config/api/artist';
import CoverItem from '@/components/CoverItem.vue';
import Player from "@/components/Player.vue";
import useList from '@/config/utils/useList';   // 列表加载Hooks
import { useScrollHeight } from '@/config/utils/useScrollH';
import { onReady } from '@dcloudio/uni-app';
interface PageData {
    init: boolean,
    loading: boolean,
    more: boolean,
    page: number,
    limit: number,
    initial: string,
    type: number,
    area: number,
}
const pageData = reactive<PageData>({
    init: false,
    loading: false,
    more: true,
    page: 1,
    limit: 10,
    initial: '-1',
    type: -1,
    area: -1,
});
const scrollH = ref<number>(0) // scroll组件高度
const topArtist = computed(() => {
    return list.value.splice(0, 4)
})
const changeOptions = (name: string, value: number | string) => {
    pageData.page = 1;
    if (name === 'type') pageData.type = value as number;
    if (name === 'area') pageData.area = value as number;
    if (name === 'initial') pageData.initial = value as string;
    getData();
    backTop();
}
const scrollTop = ref<number>(0)
const old = reactive<any>({
    scrollTop: 0
})
const scroll = (e:any) => { // scroll-y滚动位置记录
    old.scrollTop = e.detail.scrollTop
}
const backTop = () => { // 回到顶部
    scrollTop.value = old.scrollTop
    nextTick(() => {
        scrollTop.value = 0
    })
}
const onReachBottom = () => {   // 触底加载
    // console.log('到底了')
    pageData.page++;
    getData()
}
const gotoArtistDetailPage = (id: number) => {
    // console.log('跳转')
    uni.navigateTo({
        url: 'artistDetail?id=' + id
    })
}
const getArtistData = async() => {
    try{
        const { artists, more } = await artist.getArtistList(pageData);
        return { artists, more }
    }catch(e){
        console.log(e)
    }
}
const { list, getData } = useList(getArtistData, 'artists', pageData)
onReady(() => {
    let scrollHeight:Ref<number>;
    scrollHeight = useScrollHeight()
    watchEffect(() => {
        scrollH.value = scrollHeight.value
    })
})
</script>