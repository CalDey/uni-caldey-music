<template>
    <view v-if="playerShow && song.name" class="fixed bottom-0 w-full z-20 container bg-slate-50 opacity-90">
        <view class="mx-6 my-2 flex justify-between items-center z-20">
                <view v-if="!song.al" class="my-2 flex-shrink-0 w-14 h-14 animate-pulse bg-gray-200 rounded-lg"></view>
                <view v-else @click="gotoSongPage(song.id)">
                    <CoverItem :imgUrl="song.al?.picUrl" :size="14" :limit-size=112 />
                </view>
                <view class="pl-2 flex-1 truncate">
                        <view class="truncate my-2 text-sm">{{ song.name || 'No Data' }}</view>
                        <view v-if="song.ar" class="truncate my-2 text-xs text-gray-500">{{ song.ar[0].name || 'Anonymous' }}</view>
                    </view>
                <view class="flex">
                    <i v-if="!isPause" class="iconfont icon-zanting text-2xl ml-2" @click="togglePlay"></i>
                    <i v-else class="iconfont icon-bofang text-2xl ml-2" @click="togglePlay"></i>
                    <i class="iconfont icon-24gl-playlistMusic4 text-2xl ml-2" @click="handleShowDrawer"></i>
                </view>
        </view>
    </view>
    <!-- 播放列表 -->
    <PlayListDrawer ref="elDrawer" />
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { usePlayerStore } from '@/store/player';
import CoverItem from '@/components/CoverItem.vue';
import PlayListDrawer from '@/components/PlayListDrawer.vue';

const {
    song,
    togglePlay,
    isPause,
    playerShow,
} = toRefs(usePlayerStore());

const elDrawer = ref<any>();

const handleShowDrawer = () => {
    elDrawer.value.showDrawer()
}

const gotoSongPage = (id:number) => {
    uni.navigateTo({
        url: `../../../../song/song?id=${id}`
    })
}

</script>

<style lang="scss">
.container {
    padding-bottom: var(--window-bottom);   // 空出底部tabBar遮挡区域
}
</style>

