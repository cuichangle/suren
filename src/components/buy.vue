<template>
  <div class="page">
    <!-- 顶部 -->
    <div class="main">
        <div class="m_top">
          <div @click="clickselect" :style="selectData" class="select">
             <div v-if="year>-1">已选{{list[year].year}}年</div> 
             <div v-else>请先选择年份</div>
          </div>
          <div @click="clickselectMonth" :style="selectData" class="select">
             <div v-if="month>-1">已选{{list[year].year}}年</div> 
             <div v-else>请先选择月份</div>
          </div>
        </div>
        <!-- 年份选择框 -->
        <div  class="xiala" :class="{'heiyear':showselectyear||showselectmonth }"  >
          <div class="select scrollyear" :class="{'heiyear':showselectyear }">
             <div  @click="changeyear(index)" class="s_list" v-for="(item,index) in list" :key="index">
                <div class="s_square"> <span class="s_dark" v-if="year == index"></span> </div>
                <div class="s_title">{{item.year}}</div>
             </div>
          </div>
          <div class="select scrollyear" :class="{'heiyear_month':showselectmonth }">
              
  <div @click="chonsemonth(index)" class="s_list" v-for="(item,index) in list[0].month" :key="index">
                   <div class="s_square"> <span class="s_dark" v-if="month == index"></span> </div>
                   <div class="s_title">{{item.month}}</div>
              </div>
              
           </div>
             
        </div>


      <!-- 节目列表 -->
      <div :class="{'dump':month>=0,'heiyear1':showselectyear||showselectmonth}"  class="jiemu_warp" >
          <div @click="chonseaudio(index)" class="jiemu_list" v-for="(item,index ) in songarr" :key="index" >
            <div class=" jiemu_left" :class="{'nowplay':cur==index}">{{item.name}}</div>
            <div class="jiemu_title">{{item.title}}</div>
           </div>
       </div>
               <!-- 查看评论 -->
        <div v-if="cur>=0"  class="month_warp animated fadeIn">
           <div class="month_list" v-for="(item,index ) in list[year].month" :key="index" >
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
    <div v-if="showaudio" class="audiobox animated fadeInUp">
          <audio  :src="songarr[cur].src"  id="audio" @ended="overAudio" >
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

      audioPlayShow: true,
      audioInterval: null,
      timerout: null,
      note: {
        backgroundImage:
          "url(" + require("../../static/img/jindutiao.png") + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },

      // 上面音乐有关

      year: -1, //年份索引
      month: -1, //月份索引
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
      list: [
        {
          year: 2019,
          month: [
            {
              month: "一月",
              flag: true
            },
            {
              month: "二月",
              flag: true
            },
            {
              month: "三月",
              flag: true
            },
            {
              month: "四月",
              flag: true
            },
            {
              month: "八月",
              flag: true
            },
            {
              month: "十一月",
              flag: true
            },
            {
              month: "十一月",
              flag: true
            }
          ]
        },
        {
          year: 2018,
          month: [
            {
              month: "二月",
              flag: true
            },
            {
              month: "三月",
              flag: true
            },
            {
              month: "四月",
              flag: true
            },
            {
              month: "八月",
              flag: true
            },
            {
              month: "十一月",
              flag: true
            },
            {
              month: "十一月",
              flag: true
            }
          ]
        },
        {
          year: 2020,
          month: [
            {
              month: "五月",
              flag: true
            },
            {
              month: "二月",
              flag: true
            },
            {
              month: "三月",
              flag: true
            },
            {
              month: "四月",
              flag: true
            },
            {
              month: "八月",
              flag: true
            },
            {
              month: "十一月",
              flag: true
            },
            {
              month: "十一月",
              flag: true
            }
          ]
        }
      ],
      songarr: [
        {
          src:
            "http://isure.stream.qqmusic.qq.com/C400001xLIXo2w9V7U.m4a?guid=3745793350&vkey=256D0756B917CF335B9746AEA1DF582A2B603B3F34D2D5690CC54BE52423689DE9C65F34D22335EC7EB93D20275B4F9ACE69888350A90678&uin=8043&fromtag=66",
          title:
            "世界这么大还是遇见你世界这么大还是遇见你世界这么大还是遇见你世界这么大还是遇见你世界这么大还是遇见你",
          name: "素人现场"
        },
        {
          src:
            "http://isure.stream.qqmusic.qq.com/C400001Wp7M30PVoGt.m4a?guid=3745793350&vkey=FF439549BB96E63E96F06A24EB88E67FDBD5B5964700ED184D183E870A2676D607D12D0B6D3E9BB1D6603DDCA259F016F6851A805C16AE5B&uin=8043&fromtag=66",

          title: "也曾相识也曾相识也曾相识",
          name: "素人读书"
        },
        {
          src:
            "http://isure.stream.qqmusic.qq.com/C400003xmjo12aDRhw.m4a?guid=3745793350&vkey=C93839530ADE69DC47D78FB8A71120A0D7B95F4A3EFF7F8F8BA71728CA11799DB11EBF89711D1D909C0527200F2DF9FB95FD72022B7766B5&uin=8043&fromtag=66",
          title: "钟无艳钟无艳钟无艳钟无艳",
          name: "素人晚安"
        },
        {
          src:
            "http://isure.stream.qqmusic.qq.com/C400003W9JiK14LJU5.m4a?guid=3745793350&vkey=D719F9075334E60FE03ACFBDBCAE658BA4940BC14E93D1AC0B167CBF7EE18DBF304AE5ECFAF17D11811AA12F435C577648E679995BDACC21&uin=8043&fromtag=66",
          title: "也曾相识，左邻右里",
          name: "素人现场"
        },
        {
          src:
            "http://isure.stream.qqmusic.qq.com/C400001xLIXo2w9V7U.m4a?guid=3745793350&vkey=256D0756B917CF335B9746AEA1DF582A2B603B3F34D2D5690CC54BE52423689DE9C65F34D22335EC7EB93D20275B4F9ACE69888350A90678&uin=8043&fromtag=66",
          title: "世界这么大还是遇见你",
          name: "素人晚安"
        }
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
    },
    // 点击月份下拉框
    clickselectMonth() {
      if (this.year >= 0) {
        this.showselectmonth = !this.showselectmonth;
      } else {
        this.$toast("请先选择年份");
      }
    },
    // 点击具体年份
    changeyear(i) {
      this.year = i;

      this.showselectyear = false;
    },
    // 点击月份
    chonsemonth(i) {
      this.month = i;
      this.showselectmonth = false;
    },
    //是否点赞
    changeLike(i){
this.list[this.year].month[i].flag = !this.list[this.year].month[i].flag
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
      }, 700);
    },

    // 切换购买按钮
    selectbuy(i) {
      this.list[this.year].month[i].flag = !this.list[this.year].month[i].flag;
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
      this.audioWidth = -1;
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
  mounted() {}
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
.jiemu_left {
  color: #333;
  width: 68px;
  font-size: 12px;
  border-right: 1px solid #333;
}
.jiemu_title {
  margin-left: 10px;
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
</style>