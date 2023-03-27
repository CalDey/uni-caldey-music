<template>
    <view @touchmove.stop.prevent="() => {}">
        <view id="top" class="theme-card rounded-b-2xl">
            <view v-if="song.al" class="flex flex-col justify-center items-center mt-4">
                <view v-if="!song.al.picUrl" class="w-40 h-40 rounded-lg animate-pulse bg-gray-200"></view>
                <image v-else class="w-40 h-40 rounded-lg" :src="song.al.picUrl + '?param=320y320'"></image>
                <text class="text-xl font-bold mt-4 w-full truncate text-center">{{ song.name }}</text>
                <text class="text-sm w-full truncate text-center text-gray-500">{{ song.ar[0].name }}</text>
                <MusicProgressBar />
                <!-- 播放器控制区域 -->
                <view class="flex w-full justify-around items-center my-4">
                    <!-- 上一首 -->
                    <i class="iconfont icon-shangyishoushangyige text-2xl" @click="prev"></i>
                    <!-- 快退 -->
                    <i class="iconfont icon-kuaitui text-3xl" @click="backup(5)"></i>
                    <!-- 播放/暂停 -->
                    <view>
                        <i v-if="!isPause" class="iconfont icon-zanting text-4xl" @click="togglePlay"></i>
                        <i v-else class="iconfont icon-bofang text-4xl" @click="togglePlay"></i>
                    </view>
                    <!-- 快进 -->
                    <i class="iconfont icon-kuaijin text-3xl" @click="forward(5)"></i>
                    <!-- 下一首 -->
                    <i class="iconfont icon-xiayigexiayishou text-2xl" @click="next"></i>
                </view>
            </view>
        </view>
        <Lyric :scrollHeight="scrollH" :lyricData="lyricData" />
    </view>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, nextTick, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { usePlayerStore } from '@/store/player';
import MusicProgressBar from '@/components/MusicProgressBar.vue';
import { formatMusicLyrics } from '@/config/utils/lyric2Array'
import { useScrollHeight } from '@/config/utils/useScrollH';
import { onReady } from '@dcloudio/uni-app';
import Lyric from '@/components/Lyric.vue'
const { song, id, isPause, togglePlay, forward, backup, next, prev } = toRefs(usePlayerStore());
const { getLyric } = usePlayerStore();
const lyricData = ref<any>([]);
const scrollH = ref<number>(0) // scroll组件高度

if(!song.value.id) {
    uni.switchTab({ // 无播放数据自动跳转首页
        url: '/pages/index/index'
    })
}

watch(() => id.value, (newVal, oldVal) => { // 歌曲歌词同步切换
    console.log(newVal, oldVal)
    if(newVal !== oldVal) {
        nextTick(() => {
            getLyric(newVal).then((res) => {
                lyricData.value = formatMusicLyrics(res)
            })
        })
    }
})

getLyric(id.value).then((res) => {
    lyricData.value = formatMusicLyrics(res)
})

onReady(() => {
    let scrollHeight:Ref<number>;
    scrollHeight = useScrollHeight(20);
    watchEffect(() => {
        scrollH.value = scrollHeight.value
    })
})
</script>