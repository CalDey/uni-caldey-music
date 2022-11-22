# rt-request

## 介绍
## uniapp封装请求类,轻量级promise请求库，支持多域名，支持一键切换正式、测试接口地址，方便测试人员调试，支持自定义header，支持配置loading，支持vue2，vue3，nvue，支持async+await

## 安装教程 使用 HBuilderX 导入插件 

## 1. 使用方法：

## 最重要！！！和pages目录同级新建config文件夹，下面新建config.js 内容如下

```
import request from '@/uni_modules/rt-request/js_sdk/index.js'

export const config = {
	baseUrl:'', // 接口地址前缀 无需设置
	baseUrl2:'http://baidu.com', // 其他接口地址前缀，为了兼容多个域名或者第三方服务接口
	// 加testUrl和productionUrl是为了方便测试人员调试，打包app也就不需要给测试人员打两个版本了，可以一键切换正式/测试地址 示例已经在login.vue已经写好了，可自行修改
	testUrl :'http://test.com',// 测试地址前缀
	productionUrl:'http://pro.com', // 正式地址前缀
	loginPage : '/pages/login/login', // 服务器statusCode返回401强制跳转的登录页
	ossUrl:'', // 图片地址前缀
	header:{
		name:'Authorization', // 自定义header的名称
		StorageName:'token' // 自定义header的值，一般为缓存，这里的token对应的就是uni.getStorageSync('token') 
	},
	/*
	注意!!!
	 这里无需写header里无需配置content-type,插件以封装好，上面配置好的请求头实际对应的是
	 header:{
	 	'content-type': 'application/json',// 或者 application/x-www-form-urlencoded
	 	Authorization: uni.getStorageSync('token')
	 }
	 content-type的不同值是根据api.js里调用不同的方法决定的 调用get和post默认都是'content-type': 'application/json',调用postForm 的content-type为 application/x-www-form-urlencoded
	*/
	changeEnv(){
		if (process.env.NODE_ENV === 'development') {
			// 开发环境 运行
			this.baseUrl = uni.getStorageSync('baseUrl') || this.testUrl; 
			this.ossUrl = '';
		} else {
			// 生产环境 发行
			this.baseUrl = uni.getStorageSync('baseUrl') || this.productionUrl;
			this.ossUrl = '';
		}
	}
}
config.changeEnv() 
export const http =  new request(config.loginPage)

```

## 和config目录同级新建api文件夹，新建api.js或者api.ts，用来集中管理api


```	 
import { http,config } from '@/config/config.js'
// 使用方法如下，根据header不同调用不同方法，get、post、postForm 
//get和post默认都是'content-type': 'application/json',postForm 的content-type为 application/x-www-form-urlencoded
//方法接收三个参数1、api（接口地址全路径）,data（参数）,loadingTxt(可选，如果加了就显示uni.showLoading，不加就不显示)
class User {
	// 微信登录
	login(data){
		return http.post(config.baseUrl + '/transport_order/driver/wechat_login',data,'登录中...')
	}
	// 其他地址 就传config.baseUrl2 
	getWeather(data){
		return http.get(config.baseUrl2 + '/api/get_weather',data)
	}
	// postForm
	getMap(data){
		return http.postForm(config.baseUrl + '/transport_order/driver/wechat_login',data)
	}
}
export const user = new User();

```


##在登录页面login.vue中使用

```
	//vue2写法
		import { user } from '@/api/login'
		data() {
				return {
						info:{
							name:'ssss',
							password:'123456'
						}
					}
				},
				methods:{
					async toLogin() {
						const res = await user.login(this.info)
						if(res.success){
							console.log('登录成功')
						}else{
							uni.showModal({
								title:res.msg,
								showCancel:false
							})
						}
					}
					
				}
		
	//vue3写法	
	<script setup>
		
		import { reactive,toRefs } from 'vue'
		import { user } from '@/api/login'
		const data = reactive({
			num:0,
			info:{
				name:'ssss',
				password:'123456'
			}
		})
		const{ num } = toRefs(data) // 解构
		
		// 登录
		const toLogin = async () => {
			const res = await user.login(data.info)
			if(res.success){
				console.log('登录成功')
			}else{
				uni.showModal({
					title:res.msg,
					showCancel:false
				})
			}
		}

	</script>
	 
```

## 切换正式、测试环境  示例代码，自己根据自己需求修改（一般写在登录页，注意！！！！退出登录后记得清除缓存）

```
<template>
	<view>
		<image src="../../static/logo.png" mode="" class="logo" @click="showChange" v-if="num !== 7"></image>
		<image src="../../static/logo.png" mode="" class="logo" v-else></image>
		<button v-if="num === 7" @click="changeEnvironment" style="margin: 20px;">切换环境</button>
		<button @click="toLogin">登录</button>
	</view>
</template>
<script setup >
	import { reactive,toRefs } from 'vue'
	import { user } from '@/api/login'
	import {config} from '@/config/config'
	const data = reactive({
		num:0,
		info:{
			name:'ssss',
			password:'123456'
		}
	})
	const{ num } = toRefs(data) // 解构
	
	// 登录
	const toLogin = async () => {
		const res = await user.login(data.info)
		if(res.success){
			console.log('登录成功')
		}else{
			uni.showModal({
				title:res.msg,
				showCancel:false
			})
		}
	}

// 点击logo7次弹出切换接口地址按钮
const showChange = () => {
	if(data.num == 7){
		return
	}else{
		data.num ++;
	}
}	
// 一键切换接口地址  注意！！！！退出登录后记得清除缓存
const changeEnvironment = () => {
	uni.showActionSheet({
		itemList: ['测试环境', '生产环境'],
		success: async res => {
			if (!res.tapIndex) {
				uni.showModal({
					title:'您已切换为测试环境',
					showCancel:false
				})
				config.baseUrl = config.testUrl
				uni.setStorageSync('baseUrl',config.testUrl)
			} else {
				uni.showModal({
					title:'您已切换为正式环境',
					showCancel:false
				})
				config.baseUrl = config.productionUrl
				uni.setStorageSync('baseUrl',config.productionUrl)
			}
		}
	});
}
</script>
<style>
	.logov {
		padding: 180rpx 0;
	}
	.logo {
		width: 280rpx;
		height: 280rpx;

	}
</style>
```

## 如有不懂 请加qq 965969604