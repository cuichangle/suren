<template>
  <div @click='allclose' class="page">
  <div v-wechat-title='title'></div>
    <!-- 顶部 -->
    <div class="main">
        <div class="m_top">
          <div @click.stop="clickselect" :style="selectData" class="select">
             <div v-if="yearName">已选{{yearName}}</div> 
             <div v-else>请先选择年份</div>
          </div>
          <div @click.stop="clickselectMonth" :style="selectData" class="select">
             <div v-if="monthName">已选{{monthName}}</div> 
             <div v-else>请先选择月份</div>
          </div>
        </div>
        <!-- 年份选择框 -->
        <div  class="xiala" :class="{'heiyear':showselectyear||showselectmonth }"  >
          <div class="select scrollyear" :class="{'heiyear':showselectyear }">
             <div  @click.stop="changeyear(item.yearName,item.yearId)" class="s_list" v-for="(item,index) in yearlist" :key="index">
                <div class="s_square"> <span class="s_dark" v-if="yearName == item.yearName"></span> </div>
                <div class="s_title">{{item.yearName}}</div>
             </div>
          </div>

          <div class="select scrollyear" :class="{'heiyear_month':showselectmonth }">
              
  <div @click.stop="chonsemonth(item.monthName,item.monthTime)" class="s_list" v-for="(item,index) in monthlist" :key="index">
                   <div class="s_square"> <span class="s_dark" v-if="monthName == item.monthName"></span> </div>
                   <div class="s_title">{{item.monthName}}</div>
              </div>
              
           </div>
             
        </div>


      <!-- 节目列表 -->
      <div id="list_scrolltop"  :class="{'dump':tempmonthTime,'heiyear1':showselectyear||showselectmonth}"  class="jiemu_warp " >
          <div @click="chonseaudio(index)" class="jiemu_list" v-for="(item,index ) in songarr" :key="index" >
              <div v-if="cur==index  && tempmonth == monthTime" class="list_left" >正在播放：</div>
            <div class="jiemu_title">{{item.title}}</div>
        </div>
       </div>
    
               <!-- 查看评论 -->
        <div  @scroll="scrollGet" v-if="commentlist.length>0"  class="month_warp animated fadeIn">
   

           <div class="month_list" v-for="(item,index ) in commentlist" :key="index" >
                <div class="com_top">
                    <img :src="item.photo" class="avatar" alt="">
                    <div class="creattime_box">
                    <div class="nickname">{{item.username}} <span class="grade">{{item.grade}}</span></div>
                    <div class="creattime">{{item.createTime}}</div>

                    </div>
                    <van-icon  @click="changeLike(item.id,index)" class="like_icon" :class="{'islike':item.isPraose}"  size="20" name="good-job-o" />
                    <span class="dianzan " :class="{'islike':item.isPraose}">{{item.praiseNum}}点赞</span>
                </div>
                <div class="com_content">
                     
                             {{item.info}}
                            
                </div>
           </div>
         </div>
         <div class="nocoment" v-if="!commentlist.length && showaudio">暂无评论~</div>
      
    </div> 
















    <!-- 音频操作 -->
    <div v-if="showaudio" class="audiobox animated fadeInUp">
          <audio @pause="closeaudio" preload @loadeddata ="loadeddataFun"  @canplaythrough ='canplaythroughFun' id="audio" @ended="overAudio" >
          <source
          :src="completeurl"
        type="audio/mp3"
           />
        </audio>
       <div class="audio_top">
          <img @click="clickme('emcee')" src="/static/img/song.png" class="top_icon1" alt="">
          <img  @click="clickme('honoredguest')" src="/static/img/tianjia.png" class="top_icon2" alt="">
          <img   @click="clickme('remark')" src="/static/img/beizhu.png" class="top_icon3" alt="">
          <img  @click="clickme('author')" src="/static/img/righticon.png" class="top_icon4" alt="">
       </div>
       <div class="audio_center">
         <div class="cen_nowtime">{{playtime}}</div>
                 <van-slider
         class="test_box"
  v-model="value"
   @input="changevalue"
   @change="playaudioagain"
  :style="note"
  bar-height=2
 
  active-color="none"
>
<template #button>
    <div class="custom-button cen_jindu">
      <img class="cen_icon" src="static/img/songsquare.png" alt="">
    </div>
  </template>
  </van-slider>
         <div class="cen_alltime">{{alltime}}</div>
       </div>
       <div class="audio_bottom">
         <img v-if="playstatus == 1" @click="changestatus" src="static/img/xunhuan.png" class="bo_icon1" alt="">
         <img v-if="playstatus == 2" @click="changestatus" src="static/img/suiji.png" class="bo_icon1" alt="">
         <img v-if="playstatus == 3" @click="changestatus" src="static/img/danqu.png" class="bo_icon1" alt="">
         <div class="icon_box">
            <img @click="clickBefore" src="static/img/backoff.png" class="bo_icon2" alt="">
            <img v-if="audioPlayShow" @click="playAudio" src="static/img/playbtn.png" class="bo_icon3" alt="">
            <img v-else @click="pauseAudio" src="static/img/stop.png" class="bo_icon3" alt="">
            <img  @click="clickAfter" src="static/img/forward.png" class="bo_icon4" alt="">
         </div>
         <img src="static/img/wechat.png" @click="clickIpticon" class="bo_icon5" alt="">
       </div>
    </div>
<van-action-sheet v-model="showinput" title="评论">
  <div class="action_content">
     <input id="input"  v-on:input="cancelLen" placeholder="请输入评论内容 200字" @blur="onBlurInput" v-model="comment" type="text">
     <div class="submit" @click="addcomment">点击提交</div>
  </div>
</van-action-sheet>
<van-action-sheet v-model="showInfomation" :title="actionTitle">
  <div class="action_content action_content1">
     <div class="action_text">{{infotext}}</div>
     <!-- <div class="fuzhi"  :data-clipboard-text="infotext" @click="copyText">一键复制</div> -->
  </div>
</van-action-sheet>
  </div>
</template>
<script>
import { Slider, ActionSheet } from "vant";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      audio: "",
      title:'您已购买过的',
      alltime: "",
      intsecond: "", //总时长音频秒
      befort: 15, //快进快退的时间
      aftert: 30,
      playstatus: 1, //1表示顺序播放 2随机 3单曲
      jishi: 0, //播放时间
      cur: -1, //音频索引
      yearId: "", //选中年份
      monthTime: "", //当前月份
      audioPlayShow: true,
      gotype: 0, //首次进入 1购买后进入
      yearName: "",
      tempmonthTime:'',
      monthName: "",
      showinput: false, //是否显示提示框
      audioInterval: null,
      timerout: null,
      yearlist: [],
      monthlist: [],
      commentlist: [],
      comment: "",
      pageNum: 1,
      tempname:'',
      temparr:[],
      pageSize: 10,
      playcount: 0, //播放时间，大于10s 即请求接口
      twointerVal: null, //第二个计时器
      hei: "",
      showInfomation:false,
      infotext:'',
      note: {
        backgroundImage:
          "url(" + require("../../static/img/jindutiao.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
tempmonth:'',//当前播放
tempsongarr:[],
     
actionTitle:'',//点击不同类型显示action文字提示切换
completeurl:'',//音频路径
      year: -1, //年份索引
      showaudio: false, //是否显示音频控件
      showselectyear: false, //是否显示年份下拉框
      showselectmonth: false,
      value: 0,
      selectData: {
        backgroundImage: "url(" + require("../../static/img/xiala.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 50%",
        backgroundPosition: "bottom"
      },

      songarr: [],
      allow: true //是否请求
    };
  },
  computed: {
    playtime() {
      //避免播放进度大于总时长
      let temp = "";
      if (this.jishi < this.intsecond) {
        temp = this.jishi;
      } else {
        temp = this.intsecond;
        if(this.intsecond>1){
          this.pauseAudio()
        }
      
      }
      let min = parseInt(temp / 60);
      let s = temp % 60 < 10 ? "0" + temp % 60 : temp % 60;

      return min + ":" + s;
    }
  },

  methods: {
      closeaudio(){
    
this.pauseAudio()
    },
    allclose(){
      this.showselectmonth = false;
        this.showselectyear = false;

    },
    // 点击下拉框
    clickselect() {
      this.showselectyear = !this.showselectyear;
      this.showselectmonth = false;
      this.getYearInfo();
    },
    // 点击月份下拉框
    clickselectMonth() {
      if (this.yearName) {
        this.getMonthInfo();
        this.showselectyear = false;
        this.showselectmonth = !this.showselectmonth;
      } else {
        this.$toast("请先选择年份");
      }
    },
    cancelLen(){
      if(this.comment.length>200){
        this.$toast('内容已超过200字')
      }
    },
    scrollGet(e) {
      let shei =  this.hei.clientHeight;
      let allhei = this.hei.scrollHeight;
      let mhei =Math.ceil( e.srcElement.scrollTop);
      if (shei + mhei >= allhei) {
        if (this.allow) {
          this.pageNum++;
          this.getcomment(true);
        } else {
          console.log("数据请求完毕");
        }
      }
    },
    // 列表滑动
        scrollGetlist(e) {
 
      let hei = e.srcElement.scrollTop;
    
    },
    // 点击具体年份
    changeyear(name, sub) {
      this.yearName = name;
      this.yearId = sub;
      this.showselectyear = false;
      this.getMonthInfo();
    },
    // 点击月份
    chonsemonth(name, time) {
      // this.monthName = name;
      this.tempname = name
      this.monthTime = time;
      this.tempmonthTime = time
      this.showselectmonth = false;
      this.getJiemuInfo();
 
    },
    // 正式播放
 canplaythroughFun(){
   let that = this
    this.$toast.clear()
    let intsecond
              intsecond = parseInt(that.audio.duration);
      that.intsecond = intsecond;
      let min = parseInt(intsecond / 60);
      let second = intsecond % 60 < 10 ? "0" + intsecond % 60 : intsecond % 60;
      that.alltime = min + ":" + second;
      let step = Number(100 / intsecond).toFixed(3);
      clearInterval(that.audioInterval);
      that.audioInterval = setInterval(() => {
        that.jishi++;
        that.value = that.value + Number(step);
      }, 1000);
 } ,
 loadeddataFun(){
      this.$toast.loading({
        message: "音频缓冲中...",
        forbidClick: true,
        duration: 6000
      });
 },
    //是否点赞
    changeLike(id,index) {
      if( this.commentlist[index].isPraose){
          this.commentlist[index].praiseNum --
          this.goodlike('comment/cancelCommentPraise',id)
      }else{
          this.commentlist[index].praiseNum ++
          this.goodlike('comment/saveCommentPraise',id)

      }
      this.commentlist[index].isPraose = !this.commentlist[index].isPraose
      
    },
    goodlike(url,id){
      let data = {
        openid:this.$store.state.openid,
        commentId:id
      }
         this.$request(url, data).then(res => {
        
      });
    },
    // 复制文字
    copyText(){
      let that = this
　let clipboardObj = new this.clipboard(".fuzhi");
　　　　　　　　clipboardObj .on('success', function () {
that.showInfomation = false
　　　　　　　　　　that.$toast("复制成功")
　　　　　　　　});
　　　　　　　　clipboardObj .on('error', function () {
　　　　　　　　　　that.$toast("复制失败")
　　　　　　　　});
    },
    // 播放进度
    changevalue(v) {
      this.pauseAudio();
      this.jishi = parseInt(this.intsecond / 100 * v);
    },
    // 拖动结束
    playaudioagain() {
 
      this.audio.currentTime = this.jishi;
      this.playAudio();
    },
    /*
    *手动切换音频
    */
    chonseaudio(i) {
      // if (this.cur == i) {
      //   return;
      // }
        this.$toast.loading({
        message: "音频加载中...",
        forbidClick: true,
        duration: 6000
      });
      this.cur = i;
      this.pageNum =1 
      this.showaudio = true;
      if (this.audio) {
        this.pauseAudio();
        this.jishi = 0;
        this.value = 0;
      }
      this.allow = true
      this.page = 1
      let that = this;
      that.completeurl = this.songarr[i].completeurl
             this.tempmonth = this.monthTime
      this.tempsongarr = this.songarr

      this.$nextTick(() => {
        
           that.playcount=0
           that.playAudio(1);
      });

    
      this.getcomment();
    },
    //  定时器处理函数
    addcount(count) {
      if (this.twointerVal) {
        clearInterval(this.twointerVal);
      }
      this.playcount = count;
      this.twointerVal = setInterval(() => {
        this.playcount = Number(this.playcount) + 1;
        if (this.playcount >= 10) {
          clearInterval(this.twointerVal);
          this.savePlayNUm();
        }
      }, 1000);
    },
    // 增加播放量接口
    savePlayNUm() {
      let openid = this.$store.state.openid;
      let showId = this.songarr[this.cur].id;
      let data = {
        openid,
        showId
      };

      this.$request("show/savePlayNum", data).then(res => {});
    },
    /**
  获得评论列表
 */
    getcomment(flag) {
      this.$toast.loading({
            message: "评论加载中...",
        forbidClick: true,
       
      })
      let openid = this.$store.state.openid;
      let showId = this.songarr[this.cur].id;
      let data = {
        openid,
        showId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$request("comment/queryList", data).then(res => {
        if (this.pageNum == 1) {
          this.commentlist = [];
        }
        this.commentlist = this.commentlist.concat(res.response.list);
        if (res.response.list.length<this.pageSize) {
          this.allow = false;
        }

        let that = this;
        this.$nextTick(() => {
          if (that.commentlist.length) {
            let hei = document.getElementsByClassName("month_warp")[0];
            that.hei = hei;
            if(!flag){
                hei.scrollTop = 0
            }
      
          }
        });
        this.$toast.clear()
      });
    },
    //  添加评论
    addcomment() {
      let openid = this.$store.state.openid;
      let showId = this.songarr[this.cur].id;
      if(!this.comment){
        this.$toast('请输入评论内容')
        return
      }
        if(this.comment.length>200){
        this.$toast('评论内容超过200字限制')
        return
      }
      let data = {
        openid,
        showId,
        info: this.comment
      };
      this.$request("comment/saveShowComment", data).then(res => {
        this.showinput = false;
        this.$toast('评论已提交审核')
        // this.getcomment();
      });
    },
    // 显示提示框
    clickIpticon() {
      this.showinput = true;
      this.comment = ''
      this.$nextTick(()=>{
 let int = document.getElementById('input')
    int.focus()
      })
   
    },
    /**
     * 切换播放状态
     *
     */
    changestatus() {
      if (this.playstatus < 3) {
        this.playstatus++;
        if (this.playstatus == 2) {
          this.$toast("切换至随机播放");
        }
        if (this.playstatus == 3) {
          this.$toast("切换至单曲播放");
        }
      } else {
        this.playstatus = 1;
        this.$toast("切换至循环播放");
      }
    },
    /**
     * 获得年份
     *
     */
    getYearInfo() {
      let openid = this.$store.state.openid;
      this.$request("shop/yesPurchaseYear", { openid: openid }).then(res => {
        this.yearlist = res.response;
      });
    },
    /*
    *获得月份
    *月份
    */
    getMonthInfo() {
      let openid = this.$store.state.openid;
      this.$request("shop/yesPurchaseMonth", {
        openid: openid,
        yearId: this.yearId
      }).then(res => {
        this.monthlist = res.response;
      });
    },
    /*
    *获得节目列表
    */

    getJiemuInfo() {
      let openid = this.$store.state.openid;
      this.$request("show/queryShowByTime", {
        openid: openid,
        monthTime: this.monthTime
      }).then(res => {
        if(res.response){
          this.monthName = this.tempname
        this.songarr = res.response;
    var dom = document.getElementById("list_scrolltop")
      dom.scrollTop = 0
        }else{
          if(this.tempmonth){

          }
      
          this.monthTime = this.tempmonth
        }
         
      });
      console.log(this.songarr)
    },
    // ios input 框问题
    onBlurInput() {
      window.scroll(0, 0);
    },
    /**
     * 开始播放
     * */
    playAudio(load) {
      this.audioPlayShow = false;
      this.audio = document.getElementById("audio");
      
        let intsecond
        let that = this
        if(load ==1){
          that.audio.load()
this.audio.oncanplay =function(){
        that.audio.play();
  
      that.addcount(this.playcount);
    
        }


        }else{
        that.audio.play();
       intsecond = parseInt(that.audio.duration);
      that.intsecond = intsecond;
      let min = parseInt(intsecond / 60);
      let second = intsecond % 60 < 10 ? "0" + intsecond % 60 : intsecond % 60;
      that.alltime = min + ":" + second;
      let step = Number(100 / intsecond).toFixed(3);
      clearInterval(that.audioInterval);
      that.audioInterval = setInterval(() => {
        that.jishi++;
        that.value = that.value + Number(step);
      }, 1000);
      that.addcount(this.playcount);
     
        }
          
        
      
  

    },
    /**
     * 暂停音频
     */
    pauseAudio() {
      // 请求次数请求
      clearInterval(this.twointerVal);
      this.audioPlayShow = true;
      this.audio.pause();
      clearInterval(this.audioInterval);
    },
    // 改变播放的下标
    getSubIndex() {
      let len = this.songarr.length;
    },
    /**
     * 音频播放完的时候
     */
    overAudio() {
      // 音频播放完成之后改变cur,监听cur改变那么开始播放时间变成00，关闭计时器此并重新开始计时器
      this.audioIsOver = true;
      this.pauseAudio();
      let len = this.songarr.length - 1;
      let mathnum = Math.floor(Math.random() * len);
      this.$toast.loading({
        message: "音频加载中...",
        forbidClick: true,
        duration: 6000
      });
    

      if (this.playstatus == 1) {
        // 顺序播放
        if (this.cur < len) {
          this.cur = this.cur + 1;
        } else {
          this.cur = 0;
        }
      } else if (this.playstatus == 2) {
        // 随机播放
        this.cur = mathnum;
      }
      // 单曲循环
      this.jishi = 0;
      this.value = 0;
      this.completeurl =  this.tempsongarr[this.cur].completeurl
  
      this.$nextTick(()=>{
           this.playAudio(1);
           
      })
  
    },
    // 快退
    clickBefore() {
      if (!this.audio) {
        return;
      }
      let nowvalue = (100 / this.intsecond).toFixed(3);
      if (this.jishi > this.befort) {
        this.jishi = this.jishi - this.befort;
        this.audio.currentTime = this.jishi;
        
        this.value = this.value - this.befort * Number(nowvalue);
      } else {
        this.jishi = 0;
        this.audio.currentTime = this.jishi;
        this.value = 0;
      }
    },
    // 快进
    clickAfter() {
      if (!this.audio) {
        return;
      }
      let nowvalue = (100 / this.intsecond).toFixed(3);
      if (this.jishi + this.aftert < this.intsecond) {
        this.jishi = this.jishi + this.aftert;
        this.audio.currentTime = this.jishi;
        this.value = this.value + Number(this.aftert * nowvalue);
      }
    },
    clickme(val) {
     if(val ==='honoredguest'){
       this.actionTitle = '嘉宾'
     }else if(val === 'author' ){
       this.actionTitle = '制作人'

     }else if(val === 'remark' ){
       this.actionTitle = '备注'

     }else if(val === 'emcee' ){
       this.actionTitle = '主持人'

     }
      this.showInfomation = true
      this.infotext = this.songarr[this.cur][val]

    },
    //  获得节目信息
    getalllist() {
      this.$toast.loading({
        message: "努力加载中...",
        forbidClick: true,
        duration: 500
      });
      let openid = this.$store.state.openid;

      let data = {
        openid,
        type: this.gotype
      };
      this.$request("show/initYesPayInfo", data).then(res => {
        // this.commentlist = res.response;
        this.yearName = res.response.yearInfo.yearName;
        this.monthName = res.response.monthInfo.monthName;
        this.songarr = res.response.showList;
        this.yearId = res.response.yearInfo.yearId;
        this.monthTime = res.response.monthInfo.monthTime;
        this.tempmonthTime = res.response.monthInfo.monthTime;

      });
    },
  
  },
  mounted() {
    // this.getYearInfo()
    if(this.$route.query.type){
      this.gotype = this.$route.query.type
    }
     var useragent = navigator.userAgent.toLowerCase();
if (useragent.indexOf('micromessenger') === -1) { // micromessenger微信独有标识
      this.$router.push({path:'/'})
  }
    this.getalllist();
 let that = this

        //     document.addEventListener("visibilitychange", (e) => { // 兼容ios微信手Q
        //         if (e.hidden) {  // 网页被挂起
        //         alert('1111111')

        //            that.pauseAudio()
        //         } 
            
            
        // });
  
  }


};
</script>
<style scoped>
.page {
}
.main {
  position: relative;
  padding: 13px 20px 0px;
}
.main .m_top {
  display: flex;
  justify-content: space-around;
}

.select {
  width: 106px;
  height: 31px;
  line-height: 31px;
  text-align: left;
  color: #333;
  font-size: 12px;
}
.xiala {
  transition: all 0.5s ease-in-out;
  width: 90vw;
  height: 0;
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  position: absolute;
}

.s_list {
  font-size: 12px;
  color: #333;
  align-items: center;
  padding: 4px 7px;
  display: flex;
}
.s_square {
  margin-right: 26px;
  width: 16px;
  border: 1px solid #ccc;
  border-radius: 50%;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.s_dark {
  display: inline-block;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  background: #666;
}

.jiemu_warp {
  margin-top: 15px;

  height: 0;
  opacity: 0;
  transition: all 0.4s ease-in-out;

  overflow-y: auto;
}
.dump {
  height: 33.5vh;
  opacity: 1;
  transition: all 0.4s ease-in-out;
}
.heiyear1 {
  transition: all 0.3s ease-in-out;

  opacity: 0.1;
}
.jiemu_list {
  align-items: center;
  margin-top: 22px;
  white-space: wrap;
  display: flex;
}

.jiemu_title {
  font-size: 12px;
  color: #666;
  flex: 1;
}

.nowplay {
  color: #666;
  font-size: 14px;
  font-weight: 700;
}

.scrollyear {
  height: 0;
  opacity: 0.4;
  transition: all 0.4s ease-in-out;

  overflow-y: auto;
}
.heiyear {
  height: 35vh;
  z-index: 10;
  opacity: 1;
  transition: all 0.6s ease-in-out;
}
.heiyear_month {
  height: 160px;
  z-index: 10;
  opacity: 1;
  transition: all 0.6s ease-in-out;
}
/* 评论相关 */
.month_warp {
  transition: all 0.3s ease-in-out;

  margin-top: 4px;
  height: 37.4vh;
  overflow-y: auto;
}
.month_list {
  margin-top: 13px;
}

.com_top {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.like_icon {
  color: #959595;
  opacity: 0.6;
  margin-left: auto;
}
.dianzan{
  font-size: 12px;
  display: inline-block;
  margin-left: 3px;
  color: rgb(107, 107, 107);
}
.islike {
  opacity: 0.7;
  color: #000;
  font-weight: 600;
}

.avatar {
  width: 23px;
  height: 23px;
  border-radius: 23px;
  margin-right: 9px;
}
.nickname {
  color: #333333;
  white-space: nowrap;
  font-size: 9px;
  line-height: 12px;
  max-width: 180px;
  overflow-x: auto;
  overflow: hidden;
  margin-right: 9px;
}
.grade{
  font-size: 14px;
  color: #333;
  
}
.creattime_box{
  display: flex;
  align-items: flex-end;
}
.creattime {
  font-size: 8px;
  display: inline-block;
  color: rgb(107, 107, 107);
}
.com_content {
  padding: 6px 0 6px 32px;
  font-size: 12px;
  color: #333;
}

.action_content {
  box-sizing: border-box;
  padding: 10px 16px;
  text-align: center;
}
.action_content input {
  font-size: 12px;
  
  border: 0;
  width: 84%;
  border: 1px solid #666;
  padding: 8px 8px;
  border-radius: 6px;
}
.action_content1{
padding-bottom:20px;
}
.submit {
  width: 55%;

  margin: 20px auto;
  height: 30px;
background: #666;
  color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
  font-size: 14px;
}

/* 音频相关 */

/* 音频相关 */
.audiobox {
  padding:6px 18px 14px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  background: #EDEDED;
  bottom: 0;
  /* background: #eee; */
}
/* top */
.audio_top {
  padding: 0 13px;
  display: flex;
  justify-content: space-between;
}
.top_icon1 {
  width: 18px;
  height: 24px;
}
.top_icon2 {
  width: 24px;
  height: 24px;
}
.top_icon3 {
  width: 21px;
  height: 24px;
}
.top_icon4 {
  width: 22px;
  height: 24px;
}
.top_icon3 {
  width: 22px;
  height: 23px;
}
/* center */
.audio_center {
  margin: 15px 0 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cen_nowtime {
  width: 38px;
  text-align: left;
  font-size: 11px;
  color: #333;
}
.cen_alltime {
  width: 38px;
  text-align: right;
  font-size: 11px;
  color: #333;
}
.cen_jindu {
  position: relative;
  flex: 1;
  /* height: 2px; */
}
.cen_icon {
  /* position: absolute; */
  margin-top: 3px;
  border-radius: 50%;
  width: 13px;
  height: 13px;
}
.audio_bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bo_icon1 {
  width: 22.5px;
  height: 22px;
}
.icon_box {
  flex: 1;
  padding: 0 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bo_icon2,
.bo_icon4 {
  width: 24px;
  height: 24px;
}
.bo_icon3 {
  width: 45px;
  height: 45px;
}
.bo_icon5 {
  width: 26px;
  height: 24px;
}
.current {
  background: darkblue;
  color: #fff;
}
.list_left {
  width: 60px;
  font-size: 12px;
  color: #333;
}
.nocoment {
  line-height: 100px;
  font-size: 14px;
  color: #959595;
  text-align: center;
}
.fuzhi{
  padding: 3px 6px;
  display: inline-block;
  font-size: 12px;
  color: #959595;
  border: 1px solid #666;
  margin-top: 14px;
}
.action_text{
  text-align: left;
  max-height: 330px;
  overflow-y: auto;
  color: #333333;
  font-size: 14px;

}
</style>