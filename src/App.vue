<template>
  <div id="app">
    <transition :name="transitionName">
          <!-- <keep-alive :include="keepAlive"> -->
              <router-view class="Router" ></router-view>
          <!-- </keep-alive> -->
      </transition>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      //  keepAlive: 'main-keep-alive',  //需要缓存的页面 例如首页
        transitionName: 'slide-right', //初始过渡动画方向
    }
  },
   watch: {
      $route(to, from) {
        // 切换动画
        let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
        this.$router.isBack = false
      }
    },
    mounted() {

    },
}
</script>

<style scoped>
 .Router {
      position: relative;
      height: 100vh;
      transition: all .4s ease;
      
    }
    .slide-left-enter,
    .slide-right-leave-active {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      opacity: 0;
      transform: translate3d(100%, 0 ,0);
    }
    input{
      -webkit-user-select:text !important
    }
</style>
