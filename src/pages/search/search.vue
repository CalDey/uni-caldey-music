<template>
    <view>
        <view id="top" class="pt-4 mx-2">
            <view class="flex items-center bg-gray-100 p-2 rounded-2xl shadow-lg">
                <i class="iconfont icon-sousuo text-lg ml-2"></i>
                <input type="text" class="ml-2 text-lg w-full" placeholder="搜索歌曲/歌单/专辑/歌手" :value="keyword" @input="handleSuggestSearchData"
                @confirm="handleGetSearchData">
            </view>
        </view>
        <view v-if="!showSearchRes" class="mx-2">
            <view v-if="!suggestSearch">
                <view class="text-xl font-bold mt-4">热门搜索</view>
                <view class="mt-2 flex flex-wrap">
                    <view v-for="(item, index) in hotSearch" :key="index" class="mr-4 mb-4 theme-card text-sm" @click="selectKeyword(item)">
                        {{item.first}}
                    </view>
                </view>
            </view>
            <view v-else>
                <view class="text-xl font-bold my-4">搜索建议</view>
                <view>
                    <view v-if="suggestSearch.artists" class="theme-card text-sm">
                        <view class="font-bold my-2">歌手</view>
                        <view v-for="item in suggestSearch.artists" :key="item.id"
                            class="flex flex-row items-center mb-2" @click="gotoPage('artist', item.id)">
                            <CoverItem :imgUrl="item.picUrl" :size="14" :limit-size=112 />
                            <view class="flex-1 truncate ml-2">{{item.name}}</view>
                        </view>
                    </view>
                    <view v-if="suggestSearch.albums" class="theme-card text-sm">
                        <view class="font-bold my-2">专辑</view>
                        <view v-for="item in suggestSearch.albums" :key="item.id"
                            class="flex flex-row items-center mb-2" @click="gotoPage('album', item.id)">
                            <view class="text-lg truncate">{{item.name}}</view>
                            <view class="truncate ml-4 text-sm text-gray-500">{{item.artist.name}}</view>
                        </view>
                    </view>
                    <view v-if="suggestSearch.songs" class="theme-card text-sm">
                        <view class="font-bold my-2">单曲</view>
                        <view v-for="item in suggestSearch.songs" :key="item.id" class="flex flex-row items-center mb-2"
                            @click="gotoPage('song', item.id)">
                            <view class="text-lg truncate">{{item.name}}</view>
                            <view class="truncate ml-4 text-sm text-gray-500">{{item.artists[0].name}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <SearchRes :keyword="keyword" :scrollHeight="scrollH" ref="searchRes" v-else />
    </view>
    <Player />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { getHotSearch, getSearchSuggest } from '@/config/api/search';
import type { Hots, SearchSuggest } from '@/config/models/search';
import { debounce } from '@/config/utils/tools';
import { usePlayerStore } from '@/store/player';
import { useScrollHeight } from '@/config/utils/useScrollH';
import { onReady } from '@dcloudio/uni-app';
import CoverItem from '@/components/CoverItem.vue';
import Player from "@/components/Player.vue";
import SearchRes from './components/searchRes.vue';

const { play } = usePlayerStore();

const keyword = ref<string>('');
const showSearchRes = ref<boolean>(false);   // 搜索结果组件显隐
const scrollH = ref<number>(0); // scroll组件高度

// 获取热门搜索结果
const hotSearch = ref<Hots[]>([])
const getHotSearchData = async () => {
    try {
        const data = await getHotSearch()
        hotSearch.value = data.hots
    } catch (e) {
        console.log(e)
    }
}
getHotSearchData()

const selectKeyword = (item: Hots) => {
    keyword.value = item.first;
    showSearchRes.value = true;
}

// 获取搜索建议
const suggestSearch = ref<SearchSuggest | null>(null)
const handleSuggestSearchData = (event: any) => {
    const val = event.detail.value
    getSuggestSearchData(val)
}

const getSuggestSearchData = debounce(async (val: string) => {
    try {
        const data = await getSearchSuggest(val)
        suggestSearch.value = data
    } catch (e) {
        console.log(e)
    }
}, 1000)

const handleGetSearchData = (event: any) => {    // 键入搜索
    // console.log('confirm')
    if (event.detail.value) {
        keyword.value = event.detail.value
        showSearchRes.value = true
    } else {
        keyword.value = ''
        showSearchRes.value = false
    }
}

// 页面跳转
const gotoPage = (type: string, id: number) => {
    switch (type) {
        case 'artist':
            uni.navigateTo({
                url: '../../../../artist/artistDetail?id=' + id
            })
            break;
        case 'album':
            uni.navigateTo({
                url: `../../../../playlist/playlistDetail?id=${id}&type=album`
            })
            break;
        case 'song':
            play(id);
    }
}

onReady(() => {
    let scrollHeight:Ref<number>;
    scrollHeight = useScrollHeight(50);
    watchEffect(() => {
        scrollH.value = scrollHeight.value
    })
})
</script>

