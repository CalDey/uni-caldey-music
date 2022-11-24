<template>
    <view>
        <view id="top" v-if="!artistDetail" class="theme-card flex flex-col items-center w-full fixed z-10">
            <!-- skeleton -->
            <view class="animate-pulse bg-gray-200 w-32 h-32 rounded-full"></view>
            <view class="animate-pulse bg-gray-200 mt-2 w-44 h-6"></view>
            <view class="theme-card mt-2">
                <view class="flex justify-center w-full">
                    <view class="animate-pulse bg-gray-200 mx-10 w-16 h-6"></view>
                    <view class="animate-pulse bg-gray-200 mx-10 w-16 h-6"></view>
                </view>
            </view>
        </view>
        <view id="top" v-else class="theme-card flex flex-col items-center w-full fixed z-10">
            <CoverItem :imgUrl="artistDetail.cover" :size=32 :limit-size=240 circle />
            <view class="mt-2 w-44 text-center theme-card-text truncate">{{ artistDetail.name }}</view>
            <view class="theme-card mt-2">
                <view class="flex justify-center w-full text-lg">
                    <view class="flex-1 text-center mx-14 tab__line"
                        :class="selectTab === 'song' ? 'text-blue-300 tab__line_active' : ''"
                        @click="tabChange('song')">歌曲</view>
                    <view class="flex-1 text-center mx-14 tab__line"
                        :class="selectTab === 'album' ? 'text-blue-300 tab__line_active' : ''"
                        @click="tabChange('album')">专辑</view>
                </view>
            </view>
        </view>
        <view class="pt-60 theme-card">
            <!-- 通过v-show隐藏，而非v-if销毁，防止切换导致歌单列表高度丢失 -->
            <view v-show="selectTab === 'song'">
                <view v-if="scrollH === 0">
                    <!-- skeleton -->
                    <view v-for="item in 10" :key="item" class="theme-card flex items-center my-2 text-lg">
                        <view class="flex justify-center w-8 h-4 animate-pulse bg-gray-200"></view>
                        <view class="w-14 h-14 flex-shrink-0 rounded-lg animate-pulse bg-gray-200 ml-2"></view>
                        <view class="pl-2">
                            <view class="animate-pulse bg-gray-200 w-60 h-6 my-2"></view>
                            <view class="animate-pulse bg-gray-200 w-60 h-6"></view>
                        </view>
                    </view>
                </view>
                <VirtualList :scrollHeight="scrollH" :songs="songList" />
            </view>
            <view v-show="selectTab === 'album'">
                <view v-if="albumList.length <= 0">
                    <view class="grid grid-cols-2 gap-4 py-2">
                        <!-- skeleton -->
                        <view v-for="item in 10" :key="item">
                            <view class="animate-pulse rounded-t-lg bg-gray-200" style="width:100%;height:44vw;"></view>
                            <view class="flex flex-col bg-white shadow-lg px-1 rounded-b-lg">
                                <view>
                                    <view class="animate-pulse bg-gray-200 w-28 h-4 my-1"></view>
                                    <view class="animate-pulse bg-gray-200 w-20 h-4 my-1"></view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <PlayList v-else :scrollHeight="scrollH" :pageData="pageData" :list="albumList" :scrollTop="scrollTop" album
                    @scroll="scroll" @onReachBottom="onReachBottom" @gotoPlayListDetailPage="gotoPlayListDetailPage" />
            </view>
        </view>
    </view>
    <Player />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, computed, nextTick, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { artist } from '@/config/api/artist';
import type { ArtistDetailArtist, Album } from '@/config/models/artist';
import type { Song } from '@/config/models/song';
import CoverItem from '@/components/CoverItem.vue';
import VirtualList from '@/components/VirtualList.vue';
import PlayList from '@/components/PlayList.vue';
import { useScrollHeight } from '@/config/utils/useScrollH';
import { onReady } from '@dcloudio/uni-app';
import Player from "@/components/Player.vue";
import useList from '@/config/utils/useList';   // 列表加载Hooks
interface PageData {
    init: boolean,
    loading: boolean,
    more: boolean,
    limit: number,
    page: number,
}
const pageData = reactive<PageData>({
    init: false,
    loading: false,
    more: true,
    limit: 10,
    page: 1,
})
const scrollH = ref<number>(0) // scroll组件高度
const scrollTop = ref<number>(0)
const old = reactive<any>({
    scrollTop: 0
})
const scroll = (event: any) => { // scroll-y滚动位置记录
    old.scrollTop = event.detail.scrollTop
}
const backTop = () => { // 回到顶部
    scrollTop.value = old.scrollTop
    nextTick(() => {
        scrollTop.value = 0
    })
}
const onReachBottom = () => {   // 触底加载
    pageData.page++;
    getDetailData()
}
const gotoPlayListDetailPage = (id: number) => {
    // console.log('跳转')
    uni.navigateTo({
        url: `../playlist/playlistDetail?id=${id}&type=album`
    })
}
const id = ref<number>();
const artistDetail = ref<ArtistDetailArtist>();
const selectTab = ref<string>('song');
const tabChange = (tab: string) => {
    selectTab.value = tab
    getDetailData()
}
const songList = ref<Song[]>([]);
const albumList = ref<Album[]>([]);
const offset = computed(() => {
    return (pageData.page - 1) * pageData.limit
})
const getDetailData = async () => {
    if (!artistDetail.value) {
        artistDetail.value = await artist.getArtistDetail(id.value!)
    }
    if (selectTab.value === 'song' && songList.value.length <= 0) {
        songList.value = await artist.getArtistHotSongs(id.value!)
    } else if (selectTab.value === 'album') {
        const { list } = useList(getAlbumData, 'hotAlbums', pageData, {offset: offset.value, id: id.value})
        watchEffect(() => { // 通过watchEffect监听并更新
            albumList.value.push(...list.value)
        })
    }
}
const getAlbumData = async(params:any) => {
    try{
        const { hotAlbums, more } = await artist.getArtistAlbum(
            params.id,
            pageData.limit,
            params.offset
        )
        return { hotAlbums, more }
    }catch(e){
        console.log(e)
    }
}
onLoad((options) => {
    id.value = Number(options.id as any)
    getDetailData()
})
onReady(() => {
    let scrollHeight:Ref<number>;
    scrollHeight = useScrollHeight()
    watchEffect(() => {
        scrollH.value = scrollHeight.value
    })
})
</script>

<style lang="scss" scoped>
.tab__line {
    // 透明边框占位防止容器撑开
    border-bottom: .2rem solid transparent;
}
.tab__line_active {
    border-bottom: .2rem solid #93C5FD;
}
</style>