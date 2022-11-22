// 封装常用工具函数

// 防抖函数
export const debounce = (fn: Function, delay: number) => {
    let delays = delay || 500
    let timer:number|null
    return (args:any) => {
        let _this:any = this
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function() {
            fn.call(_this, args)
        }, delays)
    }
}

// 节流函数
export const throttle = (fn: Function, delay: number) => {
    let delays = delay || 500
    let timer:number|null
    return (args:any) => {
        let _this:any = this
        if(!timer) {
            timer = setTimeout(() => {
                timer = null
                fn.call(_this, args)
            }, delays)
        }
    }
}
