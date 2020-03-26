import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        playstatus:1,//顺序播放 2表示随机 3 表示单曲
  
    },
    getters:{
        getmaplight(state){
            return state.playstatus
        }
    },
    mutations:{
     
        changePlayStatus(state,val){
            state.playstatus = val
        }
    }
})
export default store