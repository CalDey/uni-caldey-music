<template>
    <view class="flex justify-center">
        <view class="play-icon" :style="{'height': height + 'rpx'}">
            <view class="line" :style="{'width': width + 'rpx'}" style="animation-delay: -1.2s !important"></view>
            <view class="line" :style="{'width': width + 'rpx'}"></view>
            <view class="line" :style="{'width': width + 'rpx'}" style="animation-delay: -1.5s !important"></view>
            <view class="line" :style="{'width': width + 'rpx'}" style="animation-delay: -0.9s !important"></view>
            <view class="line" :style="{'width': width + 'rpx'}" style="animation-delay: -0.6s !important"></view>
        </view>
    </view>
</template>

<script setup lang="ts">
const { height=48, width=4 } = defineProps<{
    height?: number,
    width?: number
}>()
</script>

<style lang="scss" scoped>
.play-icon {
    display: flex;
    height: 48rpx;
    min-width: 48rpx;
    overflow: hidden;
    @apply ml-2;

    .line {
        width: 4rpx;
        height: 100%;
        margin-left: 4rpx;
        animation: play 0.9s linear infinite alternate !important;
        @apply bg-blue-400;
    }
}

@keyframes play {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    to {
        -webkit-transform: translateY(85%);
        transform: translateY(85%);
    }
}
</style>