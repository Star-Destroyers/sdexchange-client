import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ObjectDetails from '@/views/ObjectDetails.vue'
import LasairQuery from '@/components/LasairQuery.vue'
import TargetList from '@/views/targets/TargetList.vue'
import Login from '@/views/auth/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
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
    component: ObjectDetails
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // catchall route if nothing matches
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  const publicPages = ['/login', '/about']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
