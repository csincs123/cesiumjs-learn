// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 自动导入 pages 目录下的所有 .vue 文件
const pages = import.meta.glob('../views/examples/*.vue');

// 根据导入的页面生成路由配置
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\/examples\/(.*)\.vue$/)[1];
  return {
    path: `/${name.toLowerCase()}`,
    name,
    component: pages[path], // 动态导入组件
  };
});
console.log('routes', routes)

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;