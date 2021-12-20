import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:slug',
    name: 'Details',
    props: true,
    component: () => import(/* webpackChunkName: "details" */ '../views/Details.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
