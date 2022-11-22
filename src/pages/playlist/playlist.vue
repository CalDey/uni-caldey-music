<template>
    <view>
        <Tag id="top" :tags="playListTags" @tag-change="tagChange" />
        <!-- skeleton -->
        <view class="pt-16 theme-card">
            <view v-if="scrollH === 0 || list.length <= 0">
                <view v-if="pageData.tag" class="theme-card-text">{{pageData.tag}}歌单</view>
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
            <view v-else>
                <PlayList :scrollHeight="scrollH" :pageData="pageData" :list="list" :scrollTop="scrollTop"
                    @scroll="scroll" @onReachBottom="onReachBottom" @gotoPlayListDetailPage="gotoPlayListDetailPage" />
            </view>
        </view>
    </view>
    <Player />
</template>

<script setup lang="ts">
import { ref, unref, reactive, nextTick } from 'vue';
import { playlist } from '@/config/api/playlist';
import type { PlaylistHighqualityTag, PlayListDetail } from "@/config/models/playlist";
import Tag from "@/pages/playlist/components/Tag.vue";
import PlayList from '@/components/PlayList.vue';
import { getScrollHeight, scrollHeight } from '@/config/utils/getScrollH';
import { onReady } from '@dcloudio/uni-app';
import { throttle } from '@/config/utils/tools';
import useList from '@/config/utils/useList';   // 列表加载Hooks
import Player from "@/components/Player.vue";


interface PageData {
    init: boolean,
    loading: boolean,
    more: boolean,
    limit: number,
    before: number,
    tag: string,
}

const scrollH = ref<number>(0) // scroll组件高度
const playListTags = ref<PlaylistHighqualityTag[]>([])
// const list = ref<PlayListDetail[]>([]);

const gotoPlayListDetailPage = (id: number) => {    // 页面跳转
    uni.navigateTo({
        url: `playlistDetail?id=${id}&type=playlist`
    })
}

const pageData = reactive<PageData>({   // 分页数据
    init: false,
    loading: false,
    more: true,
    limit: 10,
    before: 0,
    tag: '全部',
})

const getPlayListData = async() => {    // 获取歌单数据
    try {
        const { playlists, lasttime, more } = await playlist.getTopPlaylistHighquality({
            limit: pageData.limit,
            before: pageData.before,
            cat: pageData.tag,
        })
        return { playlists, lasttime, more }
    }catch(e){
        console.log(e)
    }
}

const { list, getData } = useList(getPlayListData, 'playlists', pageData)

const tagChange = (tagName: string) => {   // tag切换改变数据
    pageData.tag = tagName;
    pageData.before = 0;
    pageData.more = true;
    getData()
    backTop()
}

const scrollTop = ref<number>(0)
const old = reactive<any>({
    scrollTop: 0
})

const scroll = (event: any) => { // scroll-y滚动位置记录
    // console.log(old.scrollTop)
    old.scrollTop = event.detail.scrollTop
}

const backTop = () => { // 回到顶部
    scrollTop.value = old.scrollTop
    nextTick(() => {
        scrollTop.value = 0
    })
}

const onReachBottom = throttle(() => {  // 触底加载
    getData()
}, 1000)

const getPlayListTags = async () => {
    playListTags.value = await playlist.getPlayListTags()
}

getPlayListTags()

onReady(() => {
    // #ifdef MP-WEIXIN
    getScrollHeight(70)    // 微信小程序高度修正 50+20 50为tabBar默认高度
    // #endif
    // #ifndef MP-WEIXIN
    getScrollHeight(20) // H5高度修正 20
    // #endif
    setTimeout(() => {
        scrollH.value = unref(scrollHeight)
    }, 2000)
})
</script>