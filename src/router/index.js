import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

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
  console.log('childRoute', childRoute)
  return childRoute
})()

console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // import.meta.env.BASE_URL
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index.vue')
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
