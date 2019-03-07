import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: require('@/components/start').default,
      meta: { headershow:false}
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home').default,
      meta: { headershow:true},
    },
    {
      path: '/index',
      name: 'index',
      component: require('@/components/index').default,
      meta: { headershow:false}
    },
    {
      path: '/pay',
      name: 'pay',
      component: require('@/components/pay').default,
      meta: { headershow:true}
    },
    {
      path: '/receipts',
      name: 'receipts',
      component: require('@/components/receipts').default,
      meta: { headershow:true}
    },
    {
      path: '/set',
      name: 'set',
      component: require('@/components/set').default,
      meta: { headershow:true}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


export default router;