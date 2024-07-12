import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/VisualizeBuilding',
      name: 'VisualizeBuilding',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/examples/VisualizeBuilding.vue')
    },
    {
      path: '/BuildFlightTracker',
      name: 'BuildFlightTracker',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/examples/BuildFlightTracker.vue')
    }
  ]
})

export default router
