import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: ()=>import('@/components/index'),
      meta:{
        signIn:true
      }
    },
    {
      path: '/nobuy',
      name: 'nobuy',
      component: ()=>import('@/components/nobuy'),
    },
    {
      path: '/buy',
      name: 'buy',
      component: ()=>import('@/components/buy'),
    },
    {
      path: '/lanmu',
      name: 'lanmu',
      component: ()=>import('@/components/lanmu'),
    },
    {
      path: '/tingzhong',
      name: 'tingzhong',
      component: ()=>import('@/components/tingzhong'),
    },
 
  
  ]
})
