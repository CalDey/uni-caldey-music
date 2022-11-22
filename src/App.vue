<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { createPlayer } from '@/config/utils/initPlayer'
import { useInitPlayer } from '@/store/player'
onLaunch(() => {
  createPlayer()
  useInitPlayer() // 初始化播放器控件
})
onShow(() => {})
onHide(() => {})
</script>
<style lang="scss">
@import './style/main.scss';
@import 'static/icon/iconfont.css';
@import 'tailwindcss/base';
@import 'tailwindcss/utilities';
</style>
