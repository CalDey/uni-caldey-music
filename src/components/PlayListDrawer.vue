<template>
    <uni-drawer ref="showRight" mode="right" :width="220">
        <view>
            <view class="flex items-center w-full">
                <view class="m-2">
                    <view class="theme-card-text flex">
                        <text>播放列表</text>
                        <i class="iconfont text-2xl ml-2" @click="toggleLoop"
                        :class="loopType === 0 ? 'icon-liebiaoxunhuan' : loopType === 1 ? 'icon-danquxunhuan' : 'icon-suijibofang'"></i>
                        <!-- {{ loopType === 0 ? '列表循环' : loopType === 1 ? '单曲循环' : '随机播放' }} -->
                        <i class="iconfont icon-empty text-xl ml-2" @click="clearPlayList"></i>
                    </view>
                    <view class="text-sm">{{playList.length}}首</view>
                </view>
            </view>

            <scroll-view style="height: 100vh;" scroll-y>
                <view class="pb-16">
                    <view v-for="(song, index) in playList" :key="song.id">
                        <view class="m-2 theme-card flex items-center text-lg">
                            <view class="w-8 text-center mr-2">{{index + 1}}</view>
                            <view class="flex-1 truncate">{{song.name}}</view>
                            <MusicWave v-if="song.id === id" />
                            <i v-else class="iconfont icon-bofang text-2xl ml-2" @click="play(song.id)"></i>
                            <i class="iconfont icon-lajitong text-2xl ml-2" @click="deleteSong(song.id)"></i>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </uni-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/store/player';
import MusicWave from '@/components/MusicWave.vue';

const { playList, id, loopType } = storeToRefs(usePlayerStore());
const { play, toggleLoop, deleteSong, clearPlayList } = usePlayerStore();

const showRight = ref<any>();

const showDrawer = () => {
    showRight.value.open()
}

defineExpose({ showDrawer })    // 将子组件方法暴露给父组件
</script>

<style lang="scss" scoped>
.container {
    padding-bottom: var(--window-bottom);   // 空出底部tabBar遮挡区域
}
</style>