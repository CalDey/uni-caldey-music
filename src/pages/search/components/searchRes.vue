<template>
    <view class="mt-4 mx-2">
        <view class="flex">
            <view v-for="(item, index) in tags" :key="index" class="theme-card flex-1 text-center text-sm"
                :class="index === curIdx ? 'bg-blue-300 text-white' : ''" @click="changeTag(index)">
                {{item.name}}
            </view>
        </view>
        <scroll-view scroll-y :style="{'height': scrollHeight + 'px'}" @scrolltolower="onReachBottom">
            <view class="pt-4 pb-24">
                <view>
                    <!-- 单曲 -->
                    <ul v-if="type === 1">
                        <li v-for="item in searchSongData" :key="item.id" class="theme-card mb-2 flex items-center"
                            @click="play(item.id)">
                            <CoverItem :imgUrl="item.al.picUrl" :size="14" :limit-size=112 />
                            <view class="pl-2 flex-1 truncate">
                                <view class="truncate my-2 text-sm">{{item.al.name}}</view>
                                <view class="truncate my-2 text-xs text-gray-500">{{item.ar[0].name}}</view>
                            </view>
                            <MusicWave v-if="item.id === id" />
                            <i v-else class="iconfont icon-bofang text-2xl"></i>
                        </li>
                    </ul>
                    <!-- 歌手 -->
                    <ul v-else-if="type === 100">
                        <li v-for="item in searchArtistData" :key="item.id" class="theme-card mb-2 flex items-center" @click="gotoPage('artist', item.id)">
                            <CoverItem :imgUrl="item.picUrl" :size="14" :limit-size=112 />
                            <view class="truncate ml-2 text-sm">{{item.name}}</view>
                        </li>
                    </ul>
                    <!-- 歌单 -->
                    <ul v-else-if="type === 1000">
                        <li v-for="item in searchPlayListData" :key="item.id" class="theme-card mb-2 flex items-center" @click="gotoPage('playlist', item.id)">
                            <CoverItem :imgUrl="item.coverImgUrl" :size="14" :limit-size=112 />
                            <view class="pl-2 flex-1 truncate">
                                <view class="truncate my-2 text-sm">{{item.name}}</view>
                                <view class="truncate my-2 text-xs text-gray-500">{{item.creator.nickname}}</view>
                            </view>
                        </li>
                    </ul>
                    <!-- 专辑 -->
                    <ul v-else-if="type === 10">
                        <li v-for="item in searchAlbumData" :key="item.id" class="theme-card mb-2 flex items-center" @click="gotoPage('album', item.id)">
                            <CoverItem :imgUrl="item.blurPicUrl" :size="14" :limit-size=112 />
                            <view class="pl-2 flex-1 truncate">
                                <view class="truncate my-2 text-sm">{{item.name}}</view>
                                <view class="truncate my-2 text-xs text-gray-500">{{item.artist.name}}</view>
                            </view>
                        </li>
                    </ul>
                    <Loading :loading="pageData.loading" />
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { getSearchResult } from '@/config/api/search';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/store/player';
import { throttle } from '@/config/utils/tools';
import CoverItem from '@/components/CoverItem.vue';
import MusicWave from '@/components/MusicWave.vue';
import Loading from '@/components/Loading.vue';

const { id } = storeToRefs(usePlayerStore());
const { play } = usePlayerStore();

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
        case 'playlist':
            uni.navigateTo({
                url: `../../../../playlist/playlistDetail?id=${id}&type=playlist`
            })
            break;
    }
}

const props = defineProps<{
    keyword: string,
    scrollHeight: number;
}>()

watch(() => props.keyword, (newVal, oldVal) => {
    if(newVal !== oldVal) {
        getSearchRes(type.value)
    }
})

interface Tags {
    name: String,
    type: number
}

const tags = reactive<Tags[]>([
    {
        name: '单曲',
        type: 1
    },
    {
        name: '歌手',
        type: 100
    },
    {
        name: '歌单',
        type: 1000
    },
    {
        name: '专辑',
        type: 10
    },
])

interface PageData {
    init: boolean,
    loading: boolean,
    noMore: boolean,
    limit: number,
    page: number,
}

const pageData = reactive<PageData>({
    init: false,
    loading: false,
    noMore: false,
    limit: 10,
    page: 1,
});

const type = ref<number>(1);
const curIdx = ref<number>(0);

const offset = computed(() => {
    return (pageData.page - 1) * pageData.limit;
});

const changeTag = (index: number) => {
    curIdx.value = index
    type.value = tags[index].type
    pageData.page = 1
    getSearchRes(type.value)
}

const searchSongData = ref<any>([]);
const searchArtistData = ref<any>([]);
const searchPlayListData = ref<any>([]);
const searchAlbumData = ref<any>([]);

const getSearchRes = async (type: number) => {
    pageData.loading = true;
    try {
        const data = await getSearchResult(
            props.keyword,
            pageData.limit,
            offset.value,
            type
        )
        if (pageData.page === 1) {
            switch (type) {
                case 1: // type1 单曲
                    searchSongData.value = data.songs;
                    break;
                case 100: // type100 歌手
                    searchArtistData.value = data.artists;
                    break;
                case 1000: // type1000 歌单
                    searchPlayListData.value = data.playlists;
                    break;
                case 10: // type10 专辑
                    searchAlbumData.value = data.albums;
                    break;
            }
        } else {
            switch (type) {
                case 1: // type1 单曲
                    searchSongData.value.push(...data.songs);
                    break;
                case 100: // type100 歌手
                    searchArtistData.value.push(...data.artists);
                    break;
                case 1000: // type1000 歌单
                    searchPlayListData.value.push(...data.playlists);
                    break;
                case 10: // type10 专辑
                    searchAlbumData.value.push(...data.albums);
                    break;
            }
        }
        pageData.loading = false;
        pageData.init = true;
    } catch (e) {
        console.log(e)
    }
}

getSearchRes(type.value)

const onReachBottom = throttle(() => {
    // console.log('到底了');
    pageData.page++;
    getSearchRes(type.value);
}, 1000)

</script>