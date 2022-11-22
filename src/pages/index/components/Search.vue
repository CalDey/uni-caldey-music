<template>
    <view class="flex items-center bg-gray-100 mt-4 p-2 rounded-2xl shadow-lg" @click="goToSearchPage">
        <i class="iconfont icon-sousuo text-lg ml-2"></i>
        <input type="text" class="ml-2 text-lg w-full" disabled placeholder="搜索歌曲/歌单/专辑/歌手">
    </view>
</template>

<script setup lang="ts">
const goToSearchPage = () => {
    uni.navigateTo({
        url: '../../../../search/search'
    })
}
</script>