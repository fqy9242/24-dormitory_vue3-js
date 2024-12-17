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
      path: '/admin',
      name: 'AdminHome',
      component: () => import('@/views/AdministratorHome/index.vue')

    },
    {
      path: '/chooseBed',
      name: 'ChooseBed',
      component: () => import ('@/views/ChooseBed/index.vue')

    },
    {
      path: '/chooseBedRecord',
      name: 'ChooseBedRecord',
      component: () => import('@/views/ChooseBedRecord/index.vue')
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login/index.vue"),
    },
  ],
})
export default router