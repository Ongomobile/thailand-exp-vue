import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/Home')
  },
  {
    path: '/destination',
    name: 'Destination',
    component: () =>
      import(/* webpackChunkName: "Destination" */ '@/pages/Destination')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
