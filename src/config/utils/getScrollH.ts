// 动态计算scrollList滑动区域高度
import { ref, getCurrentInstance } from 'vue'

export const scrollHeight = ref<number>(0) // scroll组件高度
const topHeight = ref<number>(0)    // 组件上方占用高度

export const getScrollHeight = (offset: number) => {
    const currentInstance = getCurrentInstance();   // vue3绑定this
    const height = uni.getSystemInfoSync().windowHeight // 获取页面高度
    // console.log(height)
    const topEl = uni.createSelectorQuery().in(currentInstance).select('#top')  // 获取#top元素
    topEl.boundingClientRect((data) => {    // 获取顶部高度
        topHeight.value = (data as any).height
        // console.log(topHeight.value)
        scrollHeight.value = height - topHeight.value - offset   // 计算剩余高度 50px 偏移量
        // console.log(scrollHeight.value)
    }).exec()   
}