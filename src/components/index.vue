<template>
  <div class="page">
    11111
    <audio id="audio" @ended="overAudio" loop="loop">
      <source
        src="http://isure.stream.qqmusic.qq.com/C400000f4F9c2HclY9.m4a?guid=3745793350&vkey=F138B0E96DC3790FA004627428A0875902598B11D519AA0443ED99A76A0C5627C4720C35147E8B969C0F73DA709C40F8C3A676860A55F734&uin=0&fromtag=66"
        type="audio/mpeg"
      />
    </audio>
    <div class="audio-box">
      <div class="line-wrapper" ref="line">
        <div class="line-bg" :style="{width: audioWidth + 'px'}">

            <div class="square" :style="{left: audioWidth + 'px'}"></div>
        </div>
      </div>
    </div>
    <!-- 播放 -->
    <div class="play" v-if="audioPlayShow" @click="playAudio">
      <div>开始播放</div>
    </div>
    <!-- 暂停-->
    <div class="play" @click="pauseAudio" v-else>
      <div>暂停</div>
    </div>
    <button @click="clickBefore">快进</button>
    <button @click="clickAfter">快退</button>

  </div>
</template>
<script>
export default {
  data() {
    return {
        audio:'',
      audioWidth: 0,
      audioPlayShow: true,
      audioInterval: null,
    };
  },
  methods: {
    playAudio() {
      this.audioPlayShow = false;
      this.audio = document.getElementById("audio");
      let lineW = this.$refs.line.offsetWidth
      /**
       * this.$refs.line.offsetWidth 是容器的宽度
       * audio.duration 是音乐的播放时间长度
       */
      let step = (lineW / audio.duration).toFixed(1)
      if (this.audioIsOver) {
        this.audioIsOver = false;
        this.audioWidth = 0;
        audio.load();
      }
      this.audioInterval = setInterval(() => {
        this.audioWidth = this.audioWidth+1
      }, 1000);
      audio.play();
    },
    /**
     * 暂停音频
     */
    pauseAudio() {
      this.audioPlayShow = true;
      let audio = document.getElementById("audio");
      audio.pause();
      // 清除定时器
      clearInterval(this.audioInterval);
    },
    /**
     * 音频播放完的时候
     */
    overAudio() {
      this.audioWidth = this.$refs.line.offsetWidth;
      this.audioIsOver = true;
      this.pauseAudio();
    },
    clickBefore(){
        this.audio.currentTime = 180
        console.log('111111')
    },
    clickAfter(){
        this.audio.currentTime = 10


    }
  }
};
</script>
<style scoped>
.line-wrapper{
    width: 100px;
    height: 3px;
    background: darkblue;
}
.line-bg{
    height: 3px;
    position: relative;
    background: yellow;
}
.square{
    width: 20px;
    height: 20px;
    position: absolute;
    background: red;
    border-radius: 50%;
    top: -10px;

}
</style>