import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'StudentHome',
      component: () => import('@/views/Student/Home/index.vue')
    },
    {
      path: '/admin',
      name: 'AdminHome',
      component: () => import('@/views/Admin/Home/index.vue')

    },
    {
      path: '/chooseBed',
      name: 'ChooseBed',
      component: () => import ('@/views/Student/ChooseBed/index.vue')

    },
    {
      path: '/chooseBedRecord',
      name: 'ChooseBedRecord',
      component: () => import('@/views/Student/ChooseBedRecord/index.vue')
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login/index.vue"),
    },{
      path: '/admin/planDormitory',
      name: 'PlanDormitory',
      component: () => import('@/views/Admin/PlanDormitory/index.vue')
    }
  ],
})
export default router