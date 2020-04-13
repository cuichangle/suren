<template>
  <div :style="note" class="page">
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
   
        
   <div class="footer_box">
         <div class="foot_view_warp">
           <div @click="gobuy" class="foot_view">  </div>
          <div @click="gonobuy" class="foot_view"> </div>
          <div @click="golanmu" class="foot_view"> </div>
          <div @click="gotingzhong" class="foot_view"> </div>
     </div>
     <div class="footer">

      <div class="count">{{userShopInfo.noShopMonthNum}}</div>

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

      note: {
        backgroundImage: "url(" + require("../../static/img/home2.jpg") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    };
  },
  methods: {
    // 获得后端返回的路径地址，取oppenid
    getUrlParam(key){
       var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
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
    // 获得首页信息
    getHomeInfo(){
      this.$toast.loading({
  message: '努力加载中...',
  forbidClick: true,
  duration:500
});
      let openid = this.$store.state.openid
      this.$request('index/info',{openid:openid}).then(res=>{
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
    console.log('gitceshi')
    let id = this.getUrlParam('openid')
    if(id){
        this.$store.commit('changeOpenid',id)
    }else{
      // window.location.href = 'http://surenguangbo.com/suren';
    }
    this.getHomeInfo()
 

  },
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
  color: rgb(214, 214, 214);
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
  bottom: 8vh;
  left: 39vw;
  width: 20px;
  text-align: center;
  line-height: 20px;
  height: 20px;
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
    height: 10vh;
  width: 100vw;
  justify-content: space-between;
}
.foot_view {
  width: 23%;
}
</style>