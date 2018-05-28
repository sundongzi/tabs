import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
// import HelloWorld from '@/components/HelloWorld'
// import RouterA from '@/components/Router-A'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'hello',
          name: 'hello',
          component: () => import('@/components/HelloWorld')
        },
        {
          path: 'router-a',
          name: 'router-a',
          component: () => import('@/components/Router-A')
        },
        {
          path: 'router-b',
          name: 'router-b',
          component: () => import('@/components/Router-B')
        },
        {
          path: 'router-c',
          name: 'router-c',
          component: () => import('@/components/Router-C')
        },
        {
          path: 'router-d',
          name: 'router-d',
          component: () => import('@/components/Router-D')
        },
        {
          path: 'router-e',
          name: 'router-e',
          component: () => import('@/components/Router-E')
        },
        {
          path: 'router-f',
          name: 'router-f',
          component: () => import('@/components/Router-F')
        }
      ]
    }
  ]
})
