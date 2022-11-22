/**
 * 封装列表加载Hooks组件 useList
 * @param {Function} listReq 必传 -http请求函数
 * @param {String} listStr 必传 -匹配接口返回的列表字段（'list' => res.list)
 * @param {PageData} pageData 必传 -分页数据配置项
 * @param {Object} data 可选 -额外传入参数（对象形式{key:value}）
 */

import { ref } from 'vue';

const list = ref<any>([]);

interface PageData {
    init: boolean,
    loading: boolean,
    more: boolean,
    limit: number,
    before?: number,
    tag?: string,
    page?: number,
    initial?: string,
    type?: number,
    area?: number,
}

const useList = (listReq: Function, listStr: string, pageData: PageData, data?:Object):any => {
    if(!listReq) {
        return new Error('请传入接口调用方法!')
    }else if(!listStr){
        return new Error('请传入接口返回列表字段!')
    }else if(!pageData) {
        return new Error('请传入分页数据配置项!')
    }
    if(data && Object.prototype.toString.call(data) !== '[object Object]') {
        return new Error('额外参数请以对象形式传入')
    }
    const params = {...data}    // 携带参数
    const getData = () => {
        if (pageData.more === false) {
            uni.showToast({
                icon: "none",
                title: "没有更多了"
            })
            return
        } else if (pageData.loading === true && list.value) {
            uni.showToast({
                icon: "none",
                title: "请勿频繁触发加载"
            })
            return
        }else{
            pageData.loading = true;
            listReq(params).then((res:any) => {
                const lasttime = res.lasttime
                const more = res.more
                if (pageData.before! <= 0) {
                    list.value = res[listStr];
                } else {
                    list.value.push(...res[listStr]);
                }
                pageData.init = true;
                pageData.loading = false;
                pageData.before = lasttime;
                pageData.more = more;
                console.log(list.value)
            })
        }
    }
    getData()   // 初始化获取接口数据

    return {
        list,
        getData
    }
}

export default useList