// 全局初始化audio实例，解决微信小程序无法正常使用pinia调用audio实例的bug
let innerAudioContext:any

export const createPlayer = () => {
    return innerAudioContext = uni.getBackgroundAudioManager ?
    uni.getBackgroundAudioManager() : uni.createInnerAudioContext()
}

export const getPlayer = () => innerAudioContext