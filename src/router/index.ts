import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ObjectDetails from '@/views/ObjectDetails.vue'
import LasairQuery from '@/components/LasairQuery.vue'
import TargetList from '@/views/targets/TargetList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/lasair',
    name: 'Lasair Query',
    component: LasairQuery
  },
  {
    path: '/',
    name: 'Latest Targets',
    component: TargetList
  },
  {
    path: '/objectdetails',
    name: 'Object Details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: ObjectDetails
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
