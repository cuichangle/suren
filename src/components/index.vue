<template>
  <div :style="note" class="page">
    <div class="content">
       <div class="title">中国最认真的同志广播</div>
       <div class="cost">
         每月仅需30元
       </div>
       <div class="explain">
         按月购买, 包含多个栏目，每月共更新约18期节目
       </div>
       

       <div class="list_warp">
         <div class="list_view" v-for="(item,index) in list" :key="index">
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

      <div class="count">12</div>

     </div>
  

   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        "素人日记",
        "素人日记",
        "素人日记",
        "素人日记",
        "素人日记",
        "素人日记"
      ],
      note: {
        backgroundImage: "url(" + require("../../static/img/home2.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    };
  },
  methods: {
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
    
  }
};
</script>
<style scoped>
.content {
  padding-top: 126px;
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
  bottom: 7vh;
  left: 40vw;
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