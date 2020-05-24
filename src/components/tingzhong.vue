<template>
<div class="page ueditor">
  <div v-wechat-title='title'></div>
  
<div v-html="infoHtml" >
   
  </div>

</div>
  
</template>
<script>
export default {
  data() {
    return {
      title:'如何加入听众群',
      type:1,
      infoHtml:'',
    };
  },
  methods: {
    getHomeInfo(){
      this.$toast.loading({
  message: '努力加载中...',
  forbidClick: true,
  duration:500
});
      let openid = this.$store.state.openid
      this.$request('index/queryRichTextInfo',{openid:openid,type:this.type}).then(res=>{
        this.infoHtml = res.response
      })
    }
  },
  mounted() {
         var useragent = navigator.userAgent.toLowerCase();
if (useragent.indexOf('micromessenger') === -1) { // micromessenger微信独有标识
      this.$router.push({path:'/'})
  }
    this.getHomeInfo()
  },
};
</script>
<style scoped>
.page{
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 20px 16px;
}
</style>
<style >
.ueditor img{
    max-width: 100% !important;
   
}

</style>