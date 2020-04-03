<template>
  <div class="page">
    <!-- 顶部 -->
    <div class="main">
        <div class="m_top">
          <div @click="clickselect" :style="selectData" class="select">
             <div v-if="yearName">已选{{yearName}}</div> 
             <div v-else>请先选择年份</div>
          </div>
          <div @click="clickselectMonth" :style="selectData" class="select">
             <div v-if="monthName">已选{{monthName}}</div> 
             <div v-else>请先选择月份</div>
          </div>
        </div>
        <!-- 年份选择框 -->
        <div  class="xiala" :class="{'heiyear':showselectyear||showselectmonth }"  >
          <div class="select scrollyear" :class="{'heiyear':showselectyear }">
             <div  @click="changeyear(item.yearName,item.yearId)" class="s_list" v-for="(item,index) in yearlist" :key="index">
                <div class="s_square"> <span class="s_dark" v-if="yearName == item.yearName"></span> </div>
                <div class="s_title">{{item.yearName}}</div>
             </div>
          </div>

          <div class="select scrollyear" :class="{'heiyear_month':showselectmonth }">
              
  <div @click="chonsemonth(item.monthName,item.monthTime)" class="s_list" v-for="(item,index) in monthlist" :key="index">
                   <div class="s_square"> <span class="s_dark" v-if="monthName == item.monthName"></span> </div>
                   <div class="s_title">{{item.monthName}}</div>
              </div>
              
           </div>
             
        </div>


      <!-- 节目列表 -->
      <div :class="{'dump':monthTime,'heiyear1':showselectyear||showselectmonth}"  class="jiemu_warp " >
          <div @click="chonseaudio(index)" class="jiemu_list" v-for="(item,index ) in songarr" :key="index" >
              <div v-if="cur==index" class="list_left" >正在播放：</div>
            <div class="jiemu_title">{{item.title}}</div>
        </div>
       </div>
               <!-- 查看评论 -->
        <div v-if="commentlist.length>=0"  class="month_warp animated fadeIn">
           <div class="month_list" v-for="(item,index ) in commentlist" :key="index" >
                <div class="com_top">
                    <img src="static/img/song.png" class="avatar" alt="">
                    <div class="nickname">{{item.month}}</div>
                    <div class="creattime">{{item.month}}</div>
                    <van-icon  @click="changeLike(index)" class="like_icon" :class="{'islike':item.flag}"  size="20" name="good-job-o" />
                </div>
                <div class="com_content">
                     
                                用周迅的话说：的您是否烦恼都送搜电话呢你公司发发吧
和不凡发哦哦好烦叫皮肤就阿訇阿飞好好房号
                            
                </div>
              
             
            
           </div>
         </div>
      
    </div> 
















    <!-- 音频操作 -->
    <div v-if="showaudio " class="audiobox animated fadeInUp">
          <audio  :src="songarr[cur].completeurl"  id="audio" @ended="overAudio" >
      <!-- <source
     
        type="audio/mp3"
      /> -->
    </audio>
       <div class="audio_top">
          <img @click="clickme" src="/static/img/song.png" class="top_icon1" alt="">
          <img  @click="clickme" src="/static/img/tianjia.png" class="top_icon2" alt="">
          <img   @click="clickme" src="/static/img/beizhu.png" class="top_icon3" alt="">
          <img  @click="clickme" src="/static/img/righticon.png" class="top_icon4" alt="">
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
     <input placeholder="请输入评论内容" @blur="onBlurInput" v-model="comment" type="text">
     <div class="submit">点击提交</div>
  </div>
</van-action-sheet>

  </div>
</template>
<script>
import { Slider,ActionSheet } from "vant";

export default {
  data() {
    return {
      audio: "",
      alltime: "",
      intsecond: "", //总时长音频秒
      befort: 15, //快进快退的时间
      aftert: 30,
      playstatus: 1, //1表示顺序播放 2随机 3单曲
      jishi: 0, //播放时间
      cur: -1, //音频索引
    yearId:'',//选中年份
    monthTime:'',//当前月份
      audioPlayShow: true,
      yearName:'',
      monthName:'',
      showinput:true,//是否显示提示框
      audioInterval: null,
      timerout: null,
      yearlist:[],
      monthlist:[],
      commentlist:[],
      comment:'',
      note: {
        backgroundImage:
          "url(" + require("../../static/img/jindutiao.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },

      // 上面音乐有关

      year: -1, //年份索引
      showaudio: false, //是否显示音频控件
      showselectyear: false, //是否显示年份下拉框
      showselectmonth: false,
      value:0,
      selectData: {
        backgroundImage: "url(" + require("../../static/img/xiala.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 50%",
        backgroundPosition: "bottom"
      },
 
      songarr: [
      
      ]
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
      }
      let min = parseInt(temp / 60);
      let s = temp % 60 < 10 ? "0" + temp % 60 : temp % 60;

      return min + ":" + s;
    }
  },

  methods: {
    // 点击下拉框
    clickselect() {
      this.showselectyear = !this.showselectyear;
      this.showselectmonth = false
    },
    // 点击月份下拉框
    clickselectMonth() {
      if (this.yearName) {
        this.showselectyear = false
        this.showselectmonth = !this.showselectmonth;
      } else {
        this.$toast("请先选择年份");
      }
    },
    // 点击具体年份
    changeyear(name,sub) {
      this.yearName = name
      this.yearId = sub
      this.showselectyear = false;
      this.getMonthInfo()
    },
    // 点击月份
    chonsemonth(name,time) {
      this.monthName = name
      this.monthTime = time
      this.showselectmonth = false;
      this.getJiemuInfo()
    },
    //是否点赞
    changeLike(i){
// this.list[this.year].month[i].flag = !this.list[this.year].month[i].flag
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
      if (this.cur == i) {
        return;
      }
      this.cur = i;
      this.showaudio = true;
      if (this.audio) {
        this.pauseAudio();
        this.jishi = 0;
        this.value = 0
      }
      this.timerout = setTimeout(() => {
        this.playAudio();
      }, 800);
      this.getcomment()

    },

/**
  获得评论列表
 */
 getcomment(){
 let openid = this.$store.state.openid;
 let showId = this.songarr[this.cur].id
      this.$request("comment/queryList", { openid: openid,showId:showId }).then(res => {
        // this.commentlist = res.response;
        console.log(res)
      });
 },
// 显示提示框
clickIpticon(){
  this.showinput = true
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
      this.$toast.loading({
        message: "努力加载中...",
        forbidClick: true,
        duration: 500
      });
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
        this.songarr = res.response;
      });
    },
    // ios input 框问题
    onBlurInput () {
				window.scroll(0, 0)
			},
    /**
     * 开始播放
     * */
    playAudio() {
      this.audioPlayShow = false;
      this.audio = document.getElementById("audio");
        
      let intsecond = parseInt(this.audio.duration);
      this.intsecond = intsecond;
      let min = parseInt(intsecond / 60);
      let second = intsecond % 60 < 10 ? "0" + intsecond % 60 : intsecond % 60;
      this.alltime = min + ":" + second;
      let step = Number(100 / intsecond).toFixed(3);
      this.audioInterval = setInterval(() => {
        this.jishi++;
        this.value = this.value + Number(step);
      }, 1000);
      this.audio.play();
     
    },
    /**
     * 暂停音频
     */
    pauseAudio() {
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
        duration: 1000
      });
      console.log(mathnum, this.playstatus, len);

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
      this.value = 0
      setTimeout(() => {
        this.playAudio();
      }, 600);
      console.log("当前播放", this.cur);
    },
     // 快退
    clickBefore() {
      if (!this.audio) {
        return;
      }
      let nowvalue = (100 / this.intsecond).toFixed(3);
      if (this.jishi > this.befort) {
        this.jishi = this.jishi - this.befort;
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
    clickme() {
      this.$toast("购买后可查看");
    }
  },
  mounted() {
    this.getYearInfo()
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
  background: #101010;
}


.jiemu_warp {
  margin-top: 15px;

  height: 0;
  opacity: 0;
  transition: all 0.4s ease-in-out;

  overflow-y: auto;
}
.dump {
  height: 33vh;
  opacity: 1;
  transition: all 0.4s ease-in-out;
}
.heiyear1 {
  transition: all 0.3s ease-in-out;

  opacity: 0.1;
}
.jiemu_list {
  align-items: center;
  margin-top: 26px;
  white-space: nowrap;
  display: flex;
}

.jiemu_title {
  font-size: 12px;
  color: #666;
  flex: 1;
  overflow-x: auto;
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
  height: 160px;
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

  margin-top: 8px;
  height: 37.4vh;
  overflow-y: auto;
}
.month_list {
  margin-top: 18px;

}

.com_top{
   align-items: center;
  display: flex;
  justify-content: space-between;

}
.like_icon{
  color: #959595;
  opacity: .6;
  margin-left: auto;
}
.islike{
  opacity: .7;
  color: #000;
  font-weight: 600;
}
.avatar{
  width: 23px;
  height: 23px;
  border-radius: 23px;
  margin-right: 9px;
}
.nickname{
  color: #333333;
  white-space: nowrap;
  font-size: 9px;
  max-width: 180px;
  overflow-x: auto;
  overflow: hidden;
  margin-right: 9px;
}
.creattime{
 font-size: 8px;
 color: rgb(107, 107, 107);
}
.com_content{
  padding: 6px 0 6px 32px;
  font-size: 12px;
  color: #333;
}















.action_content{
  box-sizing: border-box;
  padding: 40px 30px;
  text-align: center;

}
.action_content input{
  font-size: 12px;
  width: 84%;
  border: 1px solid #ebde95;
  padding: 8px 8px;
  border-radius: 6px;
}
.submit{
  width: 55%;

  margin: 20px auto;
  height: 30px;
    background: linear-gradient(to right, #a39b6f 0%,#d1d425 100%);
    color: #fff;
    text-align: center;
    line-height: 30px;
  border-radius: 15px;
  font-size: 14px;

}


/* 音频相关 */
.audiobox {
  padding: 13px 18px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  padding-top: 13.5px;
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
  height: 24.5px;
}
.top_icon3 {
  width: 21.5px;
  height: 24.5px;
}
.top_icon4 {
  width: 22px;
  height: 24px;
}
.top_icon3 {
  width: 22px;
  height: 23.5px;
}
/* center */
.audio_center {
  margin: 15px 0 22px;
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
  flex: 1;
}
.cen_icon {

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
</style>