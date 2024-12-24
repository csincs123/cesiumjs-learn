import { createRouter, createWebHistory } from 'vue-router'

const childRoute = (() => {
  const pages = import.meta.glob('../views/examples/*/*.vue');
  const childRoute = []
  Object.keys(pages).map((path) => {
    const name = path.match(/\/examples\/(.*)\.vue$/)[1];
    childRoute.push({
      path: `${name.toLowerCase()}`,
      name,
      component: pages[path], // 动态导入组件
    })
  })
  return childRoute
})()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index3.vue')
    },
    {
      path: '/card',
      component: () => import('@/views/layout/index_map.vue'),
      // children: [
      //   {
      //     path: 'BuildFlightTracker',
      //     component: () => import('@/views/examples/BuildFlightTracker.vue')
      //   }
      // ]
      children: childRoute
    }
  ]
})

export default router
