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
      meta:{
        title:'您未购买过的'
      }
    },
    {
      path: '/buy',
      name: 'buy',
      component: ()=>import('@/components/buy'),
      meta:{
        title:'您已购买过的'
      }
    },
    {
      path: '/lanmu',
      name: 'lanmu',
      component: ()=>import('@/components/lanmu'),
      meta:{
        title:'全部栏目介绍'
      }
    },
    {
      path: '/tingzhong',
      name: 'tingzhong',
      component: ()=>import('@/components/tingzhong'),
      meta:{
        title:'如何加入听众群'
      }
    },
 
  
  ]
})
