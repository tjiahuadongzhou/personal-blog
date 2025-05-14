import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 引入Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import './assets/style.css';   // 引入公共博客样式
import './assets/admin.css';  // 引入后台管理样式

// 添加全局路由守卫用于调试
router.beforeEach((to, from, next) => {
  console.log('路由跳转:', {
    从: from.fullPath,
    到: to.fullPath,
    路由名称: to.name,
    参数: to.params
  });
  next();
});

const app = createApp(App);

app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount('#app');