<template>
  <div  id="homepage" class="page">
    <div :style="note" class="page_top">

    <div class="content">
       <div class="title">{{indexTop.radioTitle}}</div>
       <div class="cost">
         {{indexTop.priceInfo}}
       </div>
       <div class="explain">
         {{indexTop.shopTypeInfo}}
       </div>
       

       <div class="list_warp">
         <div class="list_view" v-for="(item,index) in indexTop.programaInfo" :key="index">
           {{item}}
         </div>
       </div>
    </div>
   
    </div>
        
   <div class="footer_box">
         <div class="foot_view_warp">
           <div @click="gobuy" :style="{'background':indexTop.yesShopButtonColor}" class="foot_view"> 
              <img src="static/img/havebuy.png" alt="">
              </div>
          <div @click="gonobuy" :style="{'background':indexTop.notShopButtonColor}" class="foot_view">
              <img src="static/img/h_nobuy.png" alt="">
            
             </div>
          <div @click="golanmu" :style="{'background':indexTop.columnButtonColor}" class="foot_view">
              <img src="static/img/h_lanmu.png" alt="">
            
             </div>
          <div @click="gotingzhong" :style="{'background':indexTop.audienceButtonColor}" class="foot_view">
              <img src="static/img/h_tingzhong.png" alt="">
            
             </div>
     </div>
     <div class="footer" v-if="userShopInfo">

      <div  class="count">{{userShopInfo.noShopMonthNum}}</div>

     </div>
  

   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indexTop:{},
      userShopInfo:{},
      colorinfo:{
      
         one: 'rgb(223, 190, 84)',
  two:' rgb(176, 218, 61)',
  three:' rgb(123, 160, 22)',
  four: 'rgb(47, 199, 179)'
      },

      note: {
        backgroundImage: "url(" + require("../../static/img/home2.jpg") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    };
  },
  methods: {
  
 
	getUrlKey (name) {
			        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
			    },
    gobuy(){
      this.$router.push({path:'/buy'})
    },
     gonobuy(){
      this.$router.push({path:'/nobuy'})
    },
    golanmu(){
      this.$router.push({path:'/lanmu'})

    },
       gotingzhong(){
      this.$router.push({path:'/tingzhong'})

    },
    created(){
      this.$toast.loading({
  message: '努力加载中...',
  forbidClick: true,
  duration:1000
});
    },
    // 获得首页信息
    getHomeInfo(){

      let openid = this.$store.state.openid
      console.log(openid,'请求后台的openid')
      this.$request('index/info',{openid:openid}).then(res=>{
        this.$toast.clear()
        this.indexTop = res.response.indexTop
        this.userShopInfo = res.response.userShopInfo
        localStorage.setItem('money',res.response.priceInfo)
        let img = res.response.indexTop.backgroundImg
        if(img.length>11){
          this.note.backgroundImage="url(" + img + ") "
        }
      })
    }
  
  },
  mounted() {
 
      var dom = document.getElementById('homepage')
     dom.addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}) // passive 参数不能省略，用来兼容ios和android

    let id = this.getUrlKey('openid')
	
    console.log(id,'路径拿到的openid')

    if(id){
        localStorage.setItem('openid',id)
        this.$store.commit('changeOpenid',id)
    }else{
      // window.location.href = 'http://surenguangbo.com/suren';
    }
    this.getHomeInfo()
 

  },
  beforeDestroy(){
    //  document.body.removeEventListener('touchmove',function (e) {
       
    // },false)
  }
};
</script>
<style scoped>

.content {
  padding: 126px 14px 0 ;
  text-align: center;
  color: #fff;

  
  
  
}
.title {
  font-size: 14px;
}
.page_top{
  height: 89.7vh;
}
.cost {
  font-size: 10px;
  border: 2px solid #fff;
  text-align: center;
  width: 98px;
  height: 28px;
  margin: 22.5px auto 20px;
  line-height: 28px;
}
.explain,
.list_warp {
  /* color: rgb(214, 214, 214); */
  color:#fff;
  font-weight: 400;
  font-size: 9px;
}
.list_warp {
  margin-top: 14px;
}
.list_view {
  margin-top: 4px;
}

.footer {
  position: fixed;
  bottom: 5.8vh;
  left: 38.3vw;
  width: 20px;
 height: 20px;
  display: flex;
  justify-content:center;;
  align-items: center;
  background: orangered;
  color: #fff;
  font-size: 8px;
  border-radius: 50%;
}
.footer_box{
  width: 100vw;
  position: fixed;
 bottom: 2vh;

}
.foot_view_warp {
  display: flex;
    height: 9.3vh;
    position: fixed;
    bottom: 0;

  width: 100vw;
  justify-content: space-between;
}
.foot_view {
  background: darkblue;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23.5vw;
}
.foot_view img{
  width: 10vw;
  height: 10vw;
}
</style>