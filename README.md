# uni-caldey-music
基于`uni-app`框架使用`Vue3+TypeScript`开发跨端高性能网易云音乐微信小程序🎵\
采用**组合式API+Hooks**进行逻辑抽离🎵\
封装通用组件📦，实现高性能**无限下拉加载列表组件♾️+虚拟列表组件**，动态计算列表组件高度自适应不同尺寸屏幕🖥\
集成**骨架屏+loading动画+节流防抖函数**，大幅度提升用户体验\
`Pinia`实现全局多功能Audio播放控件🎵支持**进度条拖拽+歌词跳转+歌词自动居中滚动定位功能**，支持**微信小程序音乐后台播放**🎵

# 平台兼容性
|平台|兼容性|
|--|--|
| H5 | ✅ |
| 微信小程序 | ✅ |

其他小程序和App平台理论上进行部分修改就可以实现兼容🤔，后期可能考虑全平台兼容

# 在线Demo（H5端）
请使用浏览器手机模式预览👀\
http://182.92.202.161:3003/

# 接口部署
本项目接口使用[网易云音乐接口](https://binaryify.github.io/NeteaseCloudMusicApi/#/)部署Node服务\
本项目使用服务器性能较差，若希望体验最佳效果请根据文档本地部署Node服务或自行购买服务器，更换`src/config/config.ts`内`baseUrl`

# 运行
```
git clone git@github.com:CalDey/uni-caldey-music.git
cd uni-caldey-music
npm install
npm run dev:h5  // H5
npm run dev:mp-weixin // 微信小程序
```

# 项目预览（展示gif较大，图片加载较慢）

首页完全组件化开发
```
// index.vue
<template>
  <view>
    <Swiper />  // 轮播图
    <Search />  // 搜索组件
    <RecommendPlayList /> // 推荐歌单组件
    <NewSong /> // 新歌推荐组件
  </view>
  <Player />  // 全局播放器组件
</template>
```

<img width="282" alt="截屏2022-11-22 下午1 38 09" src="https://user-images.githubusercontent.com/56568751/203233931-57a1dac2-24f3-4ab0-b813-142c5c104391.png">

**搜索组件**\

热门搜索Tag + 智能联想功能（防抖优化）

![Nov-22-2022 13-45-01](https://user-images.githubusercontent.com/56568751/203234651-832a97e2-7be7-4eaf-a61c-a97f5009c7bb.gif)

对歌单列表加载进行优化，区分歌单数据一次性返回和触底加载新数据两种情况封装了两个组件：

**虚拟列表组件**
> 数据一次性全部返回，此处gif展示为200+歌曲的歌单

![Nov-22-2022 12-34-36](https://user-images.githubusercontent.com/56568751/203223624-5b70d851-1a53-4223-b805-46b2a03034ca.gif)

**触底加载组件**\
通过Hooks组件`useList`对接口返回列表数据处理相关代码的逻辑抽离+封装`PlayList`列表组件,节省大量重复代码：\
![Nov-22-2022 12-49-31](https://user-images.githubusercontent.com/56568751/203225138-45281b8d-2a98-4c94-95c0-9979735262ba.gif)

**多功能音乐播放控件🎵**\

通过`Pinia`管理全局`Audio`实例

CSS实现声波形状进度条组件

实现歌曲切换，歌单循环播放/单曲循环/随机播放，歌词实时滚动，进度条跳转，歌词跳转，歌词居中定位跟随等功能

> 播放列表默认顺序播放，播放列表只有一首歌时播放完毕自动停止\
播放到会员歌曲和试听版本会自动检测并跳到下一首，如仍遇到无法播放并暂停情况请手动切换到下一首歌😅

<img width="360" alt="截屏2022-11-22 下午5 02 11" src="https://user-images.githubusercontent.com/56568751/203273337-98d4080c-963b-4484-852b-daf0fe102b85.png">

![Nov-22-2022 13-11-01](https://user-images.githubusercontent.com/56568751/203228011-e61dd40f-f2a0-4dea-9cc9-f195a93b4d75.gif)

歌曲切换Loading动画特效：\
![Nov-22-2022 13-21-09](https://user-images.githubusercontent.com/56568751/203228498-c26f6e77-a67b-4733-a624-09531abfe40e.gif)

# 开发进度日志📒
- [x] 首页
- [x] 歌单列表
- [x] 歌单详情页
- [x] 歌手列表
- [x] 歌手详情页
- [x] 封装`getScrollH`获取实时scroll组件高度
- [x] 全局音乐播放组件🎵
- [x] 播放列表组件
- [x] 多功能播放控件
- [x] 声波进度条组件
- [x] 歌词同步，歌词跳转，进度条跳转，歌词自动居中跟随
- [x] 搜索组件
- [x] 封装防抖节流函数
- [x] 封装虚拟列表组件（歌曲数量超过100首的歌单性能优化）
- [x] 封装`useList Hooks`抽离异步获取列表数据及下拉加载相关代码

# 微信小程序运行
使用`uni-app`运行项目\
修改`manifest.json`配置文件下`mp-weixin.appid`

# 微信小程序真机调试卡顿？
1.打开微信开发者工具🔧 -> 设置 -> 通用设置 -> 关闭使用GPU加速模式❌\
2.切换真机调试2.0，性能明显优于真机调试1.0
