<template>
    <view class="main-container">
        <Info id="top" v-if="type === 'album'" :playlistDetail="(albumDetail as Album)" album @playAll="handleplayAll" />
        <Info id="top" v-else :playlistDetail="(playlistDetail as PlayListDetail)" @playAll="handleplayAll"/>
            <view v-show="songList.length <= 0">
            <!-- skeleton -->
            <view v-for="item in 4" :key="item" class="theme-card p-2 flex items-center my-2 text-lg">
                <view class="flex justify-center w-8 h-4 animate-pulse bg-gray-200"></view>
                <view class="w-14 h-14 flex-shrink-0 rounded-lg animate-pulse bg-gray-200 ml-2"></view>
                <view class="pl-2">
                    <view class="animate-pulse bg-gray-200 w-60 h-6 my-2"></view>
                    <view class="animate-pulse bg-gray-200 w-60 h-6"></view>
                </view>
            </view>
        </view>
        <VirtualList class="scroll-container" v-show="songList.length > 0" ref="elSongList" :songs="songList" />
    </view>
    <Player />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { playlist } from '@/config/api/playlist';
import type { PlayListDetail } from '@/config/models/playlist';
import type { Song } from '@/config/models/song';
import type { Album } from '@/config/models/artist';
import Info from './components/Info.vue';
import VirtualList from '@/components/VirtualList.vue';
import { useScrollHeight } from '@/config/utils/useScrollH';
import { onReady } from '@dcloudio/uni-app';
import Player from "@/components/Player.vue";

const id = ref<number>();
const type = ref<string>('');

onLoad((options) => {
    id.value = Number(options.id as any)
    type.value = options.type as string // type -> album or playlist?
    getData()
})

const scrollH = ref<number>(0) // scroll组件高度
const playlistDetail = ref<PlayListDetail>();
const albumDetail = ref<Album>();
const songList = ref<Song[]>([]);
const elSongList = ref<any>();

const getData = async() => {
    if(type.value === 'playlist') { // playlist
        // 歌单信息
        playlistDetail.value = await playlist.getPlayListDetail(id.value!);
        // 歌单歌曲列表
        songList.value = await playlist.getPlayListTrackAll(id.value!);
    }else{  // album
        const { album, songs } = await playlist.getAlbumDetail(id.value!);
        albumDetail.value = album;
        songList.value = songs;
    }
}

const handleplayAll = () => {
    elSongList.value.playAll()
}

onReady(() => {
    let scrollHeight:Ref<number>;
    scrollHeight = useScrollHeight(18)
    watchEffect(() => {
        scrollH.value = scrollHeight.value
    })
})

</script>