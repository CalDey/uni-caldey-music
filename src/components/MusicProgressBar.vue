<template>
    <view class="w-full mt-4">
        <view v-if="!duration" style="height: 52rpx" class="animate-pulse bg-gray-200"></view>
        <view v-else class="flex justify-center ">
            <view class="mr-4">{{ moment(currentTime * 1000).format('mm:ss') }}</view>
            <view class="flex flex-shrink-0 justify-center items-center">
                <view v-for="(item) in 34" :key="item" class="item"
                    :class="[currentLine < item ? 'line-' + (item) + '' : 'line-' + (item) + ' line_active' ]"
                    @click="moveProgress(item)"></view>
            </view>
            <view class="ml-4">{{ moment(duration * 1000).format('mm:ss') }}</view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { toRefs, computed, getCurrentInstance } from 'vue';
import { usePlayerStore } from '@/store/player';

const { currentTime, duration } = toRefs(usePlayerStore());
const { onSliderChange } = usePlayerStore();
const moment = getCurrentInstance()?.appContext.config.globalProperties.$moment;

const currentLine = computed(() => {    // 实时监听当前进度条位置
    const val = duration.value / 34;    // 获取进度条单位长度
    const nowLine = (currentTime.value / val)
    return nowLine
})

const moveProgress = (index: number) => {   // 拖动进度条改变歌曲播放进度
    // 效果一般，小程序端拖拽存在明显延迟
    const val = duration.value / 34;
    const newTime = Number((val * index).toFixed(0))
    onSliderChange(newTime)
}

</script>

<style lang="scss" scoped>
.item {
    width: 8rpx;
    margin: 2rpx;
    @apply bg-slate-300;
}

.line_active {
    @apply bg-blue-400
}

.line-1 {
    height: 4rpx;
}

.line-2 {
    height: 8rpx;
}

.line-3 {
    height: 16rpx;
}

.line-4 {
    height: 8rpx;
}

.line-5 {
    height: 24rpx;
}

.line-6 {
    height: 32rpx;
}

.line-7 {
    height: 8rpx;
}

.line-8 {
    height: 40rpx;
}

.line-9 {
    height: 24rpx;
}

.line-10 {
    height: 8rpx;
}

.line-11 {
    height: 24rpx;
}

.line-12 {
    height: 44rpx;
}

.line-13 {
    height: 24rpx;
}

.line-14 {
    height: 28rpx;
}

.line-15 {
    height: 32rpx;
}

.line-16 {
    height: 52rpx;
}

.line-17 {
    height: 40rpx;
}

.line-18 {
    height: 28rpx;
}

.line-19 {
    height: 8rpx;
}

.line-20 {
    height: 12rpx;
}

.line-21 {
    height: 24rpx;
}

.line-22 {
    height: 32rpx;
}

.line-23 {
    height: 52rpx;
}

.line-24 {
    height: 40rpx;
}

.line-25 {
    height: 24rpx;
}

.line-26 {
    height: 32rpx;
}

.line-27 {
    height: 52rpx;
}

.line-28 {
    height: 44rpx;
}

.line-29 {
    height: 32rpx;
}

.line-30 {
    height: 24rpx;
}

.line-31 {
    height: 18rpx;
}

.line-31 {
    height: 16rpx;
}

.line-32 {
    height: 32rpx;
}

.line-33 {
    height: 8rpx;
}

.line-34 {
    height: 4rpx;
}
</style>