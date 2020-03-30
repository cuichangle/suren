<template>
  <div class="page">
    <!-- 顶部 -->
    <div class="main">
        <div class="m_top">
          <div @click="clickselect" :style="selectData" class="select">
             <div v-if="yearName">已选{{yearName}}</div> 
             <div v-else>请先选择年份</div>
          </div>
          <div class="submit">
            <span @click="paymoney">￥{{paynum}}元购买</span>
           
             
          </div>
        </div>
        <!-- 年份选择框 -->
        <div  class="xiala" :class="{'heiyear':showselectyear}">
            <div @click="changeyear(item.yearId,item.yearName)" class="s_list" v-for="(item,index) in yearlist" :key="index">
                <div class="s_square"> <span class="s_dark" v-if="year == index"></span> </div>
                <div class="s_title">{{item.yearName}}</div>
            </div>
        </div>

        <!-- 显示对应月份 -->
        <div v-if="monthlist.length" :class="{'heiyear1':showselectyear}" class="month_warp">
           <div class="month_list" v-for="(item,index ) in monthlist" :key="index" >
              <div class="list_left">{{item.monthName}}</div>
              <div @click="chonsemonth(item.monthTime)" class="list_cen">点击浏览本月全部节目</div>
              <div @click="selectbuy(index)" class="list_right">
                  <img v-if="item.flag" src="/static/img/chonse.png" alt="">
                  <img v-else src="/static/img/nochonse.png" alt="">
              </div>

           </div>
       
      </div>
      <!-- 节目列表 -->
      <div :class="{'dump':songarr.length>=0}"  class="jiemu_warp" >
          <div @click="chonseaudio(index)" class="jiemu_list" v-for="(item,index ) in songarr" :key="index" >
            <div v-if="cur==index" class="list_left jiemu_left" >正在播放：</div>
            <div class="jiemu_title">{{item.title}}</div>
           </div>
       </div>
      
    </div> 
















    <!-- 音频操作 -->
    <div v-if="showaudio" class="audiobox animated fadeInUp">
          <audio  :src="songarr[cur].trialurl"  id="audio" @ended="overAudio" >
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
         <img src="static/img/wechat.png" class="bo_icon5" alt="">
       </div>
    </div>

  </div>
</template>
<script>
import { Slider } from "vant";
export default {
  data() {
    return {
      audio: "",
      audioWidth: -2, //圆圈左边的距离
      alltime: "",
      intsecond: "", //总时长音频秒
      befort: 15, //快进快退的时间
      aftert: 30,
      playstatus: 1, //1表示顺序播放 2随机 3单曲
      jishi: 0, //播放时间
      cur: -1, //音频索引
      year: -1,
      audioPlayShow: true,
      audioInterval: null,
      timerout: null,
      money: 30, //默认一期金额
      note: {
        backgroundImage:
          "url(" + require("../../static/img/jindutiao.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },

      // 上面音乐有关
      value: 0,
      yearId: "",
      yearName: "",
      monthTime: "2018-11-01",

      showaudio: false, //是否显示音频控件
      showselectyear: false, //是否显示年份下拉框

      selectData: {
        backgroundImage: "url(" + require("../../static/img/xiala.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 50%",
        backgroundPosition: "bottom"
      },
      yearlist: [],
      monthlist: [],

      songarr: []
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
    },

    // 计算价钱
    paynum() {
      var num = 0;
      let temp = this.monthlist;
      temp.forEach(v => {
        if (v.flag) {
          num += this.money;
        }
      });
      return num;
    }
  },

  methods: {
    // 点击下拉框
    clickselect() {
      this.showselectyear = !this.showselectyear;
    },
    // 点击具体年份
    changeyear(i, v) {
      this.yearId = i;
      this.yearName = v;
      this.getMonthInfo();
      this.showselectyear = false;
    },
    // 点击月份
    chonsemonth(i) {
      this.monthTime = i;
      this.getJiemuInfo();
    },
    // 年份
    getYearInfo() {
      this.$toast.loading({
        message: "努力加载中...",
        forbidClick: true,
        duration: 500
      });
      let openid = this.$store.state.openid;
      this.$request("shop/noPurchaseYear", { openid: openid }).then(res => {
        this.yearlist = res.response;
      });
    },
    // 月份
    getMonthInfo() {
      let openid = this.$store.state.openid;
      this.$request("shop/noPurchaseMonth", {
        openid: openid,
        yearId: this.yearId
      }).then(res => {
        res.response.map(v => {
          v.flag = true;
        });
        this.monthlist = res.response;
      });
    },
    // 获得节目列表
    getJiemuInfo() {
      let openid = this.$store.state.openid;
      this.$request("show/queryShowByTime", {
        openid: openid,
        monthTime: this.monthTime
      }).then(res => {
        this.songarr = res.response;
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
    // 手动切换音频
    chonseaudio(i) {
      if (this.cur == i) {
        return;
      }
      clearTimeout(this.timerout);
      this.cur = i;
      this.showaudio = true;
      if (this.audio) {
        this.pauseAudio();
        this.jishi = 0;
        this.audioWidth = -2;
      }
      this.timerout = setTimeout(() => {
        this.playAudio();
        // this.movemusic()
      }, 700);
    },
    // 微信支付
    paymoney() {
      if (this.paynum == 0) {
        this.$toast("请选择年份");
        return;
      }
      let time = [];
      this.monthlist.forEach(v => {
        if (v.flag) {
          time.push(v.monthTime);
        }
      });
    },
    // 切换购买按钮
    selectbuy(i) {
      this.monthlist[i].flag = !this.monthlist[i].flag;
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
      audio.play();
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
        duration: 700
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
      setTimeout(() => {
        this.playAudio();
      }, 600);
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
      } else {
        this.jishi = this.jishi + 4;
        this.audio.currentTime = this.jishi;
        this.value = this.value + Number(4 * nowvalue);
      }
    },
    clickme() {
      this.$toast("购买后可查看");
    }
  },
  mounted() {
    this.getYearInfo();
    this.getJiemuInfo();
  }
};
</script>
<style scoped>
.page {
}
.main {
  position: relative;
  padding: 13px 18px;
}
.main .m_top {
  display: flex;
  justify-content: space-around;
}
.main .submit {
  width: 115px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color: #fff;
  background: #666;
  font-size: 12px;
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
  left: 12vw;
  width: 110px;
  /* opacity: 0; */
  height: 0;
  overflow-y: auto;
  position: absolute;
}
.heiyear {
  /* background: rgba(0,0,0,.2); */
  height: 160px;
  z-index: 10;
  opacity: 1;
  transition: all 0.8s ease-in-out;
}
.heiyear1 {
  transition: all 0.3s ease-in-out;

  opacity: 0.1;
}
.s_list {
  font-size: 12px;
  color: #333;
  align-items: center;

  margin: 14px 10px;
  display: flex;
}
.s_square {
  vertical-align: middle;
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
.month_warp {
  transition: all 0.3s ease-in-out;

  margin-top: 15px;
  height: 34vh;
  overflow-y: auto;
}
.month_list {
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list_left {
  width: 60px;
  font-size: 12px;
  color: #333;
}
.list_cen {
  font-size: 8px;
  color: #999;
  flex: 1;
}
.list_right {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.list_right img {
  width: 13px;
  height: 13px;
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

.jiemu_list {
  margin-top: 22px;
  white-space: nowrap;
  display: flex;
}
.jiemu_left {
  /* border-right: 1px solid #333; */
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

/* 音频相关 */
.audiobox {
  padding: 13px 18px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  /* background: #eee; */
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
  position: relative;
  flex: 1;
  /* height: 2px; */
}
.cen_icon {
  /* position: absolute; */
  top: -6px;
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
</style>