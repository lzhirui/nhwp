import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SelectRouter from '../views/SelectRouter'
import Login from '../views/Longin'
import Upimg from '../views/Upimg'
import Map from '../views/map'
import Download from '../views/download'
import Downloadimg from '../views/downloadimg'
import orderlist from '../views/orderList'
import order from '../views/order'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/select',
    name: 'select',
    component: SelectRouter
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/upimg',
    name: 'upimg',
    component: Upimg
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/download',
    name: 'download',
    component: Download
  },
  {
    path: '/downloadimg',
    name: 'downloadimg',
    component: Downloadimg
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: orderlist
  },
  {
    path: '/order',
    name: 'order',
    component: order
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
