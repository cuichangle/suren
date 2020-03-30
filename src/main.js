// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './public/api'

 

 



import store from './store/store'
import {Icon,Slider,Button,Dialog ,Toast,Swipe, ActionSheet,SwipeItem,Loading,Switch} from 'vant'
Vue.use(SwipeItem)
Vue.use(Icon)
Vue.use(Loading)
Vue.use(Switch)
Vue.use(ActionSheet)
Vue.use(Slider)





Vue.use(Swipe)
Vue.prototype.$toast = Toast

Vue.prototype.$request = request
Vue.config.productionTip = false
// router.beforeEach((to,from,next)=>{
//   // 需要导航守卫
//   if(to.matched.some(r=>r.meta.signIn)){
//       //判断该用户是否登录
//       let usercode = localStorage.getItem('zjflid')
//       if(usercode){
//         next()
//       }else{
//         next({
//           path:'/login'
//         })
//       }
//   }else{
//     next()
//   }
// })
// 增加过渡动画
window.addEventListener('popstate', function (e) {
  router.isBack = true
},false)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
