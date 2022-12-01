<template>
    <view class="mt-4 text-md relative" :style="{ 'height': scrollHeight + 'px'}">
        <MusicWave v-if="loading && scrollHeight" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" :height="256" :width="48" />
        <scroll-view v-else id="lyric" scroll-y :scroll-top="scrollH" :style="{ 'height': scrollHeight + 'px'}">
            <view v-for="(item, index) in lyricData.lyric" :key="index"
            class="flex justify-center mx-8 text-center py-2 lyric-item"
            :class="lyricIndex === index ? 'text-blue-300 opacity-100 scale-110' : 'opacity-20'"
            @click="lyricJump(index)">
                {{item.lyric}}
            </view>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, nextTick, getCurrentInstance } from 'vue';
import { usePlayerStore } from '@/store/player'
import MusicWave from '@/components/MusicWave.vue'
const { currentTime, id } = toRefs(usePlayerStore())
const { onSliderChange } = usePlayerStore();
const props = defineProps<{
    scrollHeight: number,
    lyricData: any
}>()
// const lyric = ref<any>()    // 歌词标签 dom
const loading = ref<boolean>(true)
const lyricIndex = ref<number>(0)   // 当前高亮歌词索引
let scrollH = ref<number>(0) // 歌词居中显示需要滚动的高度
let lyricH: number = 0 // 歌词当前的滚动高度
let flag: boolean = true // 判断当前高亮索引是否已经超过了歌词数组的长度

const currentInstance = getCurrentInstance();   // vue3绑定this

// 监听歌曲播放进程
watch(() => currentTime.value, (val) => {
    // console.log(val)
    handleLyricTransform(val)
})

watch(() => id.value, (newVal, oldVal) => {
    if(newVal !== oldVal) {
        reloadLyric()   // 切换歌曲重置歌词滚动
    }
})

const handleLyricTransform = (currentTime: number) => { // 实现歌词同步滚动
    nextTick(() => {    // 获取所有lyric-item的节点数组
        loading.value = false
        const curIdx = props.lyricData.lyric.findIndex((item:any) => {  // 获取当前索引
            return (currentTime <= item.time)
        })
        // const item = props.lyricData.lyric[curIdx - 1] // 获取当前歌词信息
        // 获取lyric节点
        const LyricRef = uni.createSelectorQuery().in(currentInstance).select("#lyric");
        LyricRef.boundingClientRect((res) => {
            if(res) {
                // 获取lyric高度的1/2，用于实现自动居中定位
                const midLyricViewH = ((res as any).height / 2)
                if(flag) {
                    // 实时获取最新Dom
                    const lyricRef = uni.createSelectorQuery().in(currentInstance).selectAll(".lyric-item");
                    lyricRef.boundingClientRect((res) => {
                        if(res) {
                            // console.log(res)
                            // 获取当前播放歌词对应索引 H5端 curIdx - 1 | 微信小程序端 curIdx
                            // #ifdef MP-WEIXIN
                            lyricIndex.value = curIdx;  // 获得高亮索引
                            // #endif
                            // #ifndef MP-WEIXIN
                            lyricIndex.value = curIdx - 1;  // 获得高亮索引
                            // #endif
                            if (lyricIndex.value >= (res as Array<any>).length) {
                                flag = false
                                return
                            }
                            lyricH = ((res as Array<any>)[curIdx].top - (res as Array<any>)[0].top)
                            if(midLyricViewH > 0 && lyricH > midLyricViewH) {
                                scrollH.value = lyricH - midLyricViewH
                            }
                        }
                    }).exec()
                }
            }
        }).exec()
    })
}

const reloadLyric = () => {
    nextTick(() => {
        lyricIndex.value = 0;
        lyricH = 0;
        scrollH.value = 0;
        loading.value = true;
        flag = true;
    })
}

const lyricJump = (index: number) => {
    onSliderChange(Number(props.lyricData.lyric[index].time.toFixed(0)))
    lyricIndex.value = index
}
</script>