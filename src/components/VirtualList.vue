<template>
	<view class="theme-card">		
		<scroll-view class="scroll-box" :style="{'height': scrollHeight + 'px'}" scroll-y="true" @scroll="scroll">
            <!--可视区域-->
            <view class="w-full pb-32" :style="{position: 'absolute', top: top + 'px'}">
                <view v-for="(item, index) in showList" :key="item.id" class="theme-card flex items-center my-2 text-lg" @click="play(item.id)">
                    <view class="flex justify-center w-10">{{index + startIdx + 1}}</view>
                    <view class="flex items-center">
                        <CoverItem :imgUrl="item.al.picUrl" :size=14 :limit-size=112 />
                    </view>
                    <view class="pl-2 w-48">
                        <view class="truncate my-2 text-sm">{{item.name}}</view>
                        <view class="truncate my-2 text-xs text-gray-500">{{item.ar[0].name}}</view>
                    </view>
                    <MusicWave v-if="item.id === id" />
                    <i v-else class="iconfont icon-bofang text-2xl ml-2"></i>
                </view>
            </view>
		</scroll-view>		
	</view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/store/player';
import type { Song } from '@/config/models/song';
import CoverItem from '@/components/CoverItem.vue';
import MusicWave from '@/components/MusicWave.vue';

const { id } = storeToRefs(usePlayerStore());

const { play, pushPlayList } = usePlayerStore();

const props = defineProps<{
    songs: Song[];
    scrollHeight: number;
}>()

const songList = ref<Song[]>([])    // 歌单数据
const showList = ref<Array<any>>([])  // 可视区域显示的数据
const itemHeight = ref<number>(76)	// 每条数据所占高度
const showNum = ref<number>(10)  // 可视化区域内数据加载数量 可视化高度 = (itemHeight * showNum) 
const top = ref<number>(0)  // 偏移量
const scrollTop = ref<number>(0)    // 滚动高度
const startIdx = ref<number>(0) // 起始索引
const endIdx = ref<number>(0)   // 结束索引

// const getDataList = () => { // 构造数据
//     for(let i=0;i<200;i++){
//         listAll.value.push(`我是第${i}号`)
//     }
// }

watch(() => props.songs, (val) => {
    songList.value = val
    computedVirtualList()
    console.log(val)
})

const computedVirtualList = () => { // 计算虚拟列表可视化区域
    startIdx.value = Math.floor(scrollTop.value / itemHeight.value) // 可视化区域首位索引
    endIdx.value = startIdx.value + showNum.value
    showList.value = songList.value.slice(startIdx.value, endIdx.value)  // 获取可视化区域的数据
    top.value = scrollTop.value - (scrollTop.value % itemHeight.value)  // 获取偏移量
}

const scroll = (e: any) => {
    scrollTop.value = e.detail.scrollTop
    computedVirtualList()
}

const playAll = () => {
    pushPlayList(true, ...props.songs);
    play(props.songs[0].id);
}

defineExpose({ playAll })

// getDataList()
</script>

<style lang="scss" scoped>
.scroll-box{
    @apply relative w-full;
}
</style>