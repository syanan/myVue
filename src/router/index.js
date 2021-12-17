import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import detail from "@/views/detail"
import draw from "@/views/draw"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login' 
  },
  { path: '/login', name: 'login', component: login,
  },
  {
    path:'/detail',
    name:'detail',
    component:detail
  },
  {
    path:'/draw',
    name:'draw',
    component:draw
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
