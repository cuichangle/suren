<template>
  <div v-html="infoHtml" class="page">
   
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    this.getHomeInfo()
  },
};
</script>
<style scoped>

</style>