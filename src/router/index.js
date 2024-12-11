import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/index.vue')

    },
    {
      path: '/chooseBed',
      name: 'ChooseBed',
      component: () => import ('@/views/ChooseBed/index.vue')

    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
})
export default router