/*
 * @Author: cyy
 * @Date: 2021-09-23 12:30:29
 * @LastEditors: cyy
 * @LastEditTime: 2022-01-27 11:54:08
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '../lib/utils'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Home.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { noRequiresAuth: true } },
  { path: '/', name: 'Home', component: Dashboard },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const isLoggedIn = () => getCookie('user')

router.beforeEach((to, from) => {
  if (!to.meta.noRequiresAuth && !isLoggedIn()) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
