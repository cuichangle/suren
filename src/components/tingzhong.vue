<template>
<div class="page">
<div v-html="infoHtml" >
   
  </div>

</div>
  
</template>
<script>
export default {
  data() {
    return {
      type:0,
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
.page img{
    max-width: 100% !important;
    height: auto !important;
}

</style>