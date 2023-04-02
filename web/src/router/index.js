import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: Login, component: Login },
  {
    path: '/',
    name: 'Layout',
    redirect: { name: 'Product' },
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'product',
        name: 'Product',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/product')
      },
      {
        path: 'params',
        name: 'Params',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/params')
      },
      {
        path: 'content',
        name: 'Content',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/content')
      },
    ]
  },
  {
    path: '/user', name: 'User',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/user')
  },

]

const router = new VueRouter({
  routes
})
export default router
