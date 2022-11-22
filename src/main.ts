import App from "./App.vue";
import { createSSRApp } from "vue";
import { createPinia as createPina } from 'pinia';
import Player from '@/components/Player.vue';
import moment from 'moment'; // moment.js
import 'moment/dist/locale/zh-cn'; // 引入本土化

moment.locale('zh-cn'); // 本土化

export function createApp() {
  const app = createSSRApp(App).use(createPina());
  app.component('Player', Player) // 注册全局组件
  app.config.globalProperties.$moment = moment;
  return {
    app,
  };
}
