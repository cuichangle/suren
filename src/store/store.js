import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        openid:'oUWMrwX2009ZBdhqlKi-rD0OeMSI',//顺序播放 2表示随机 3 表示单曲
  
    },
    getters:{
        getoptionid(state){
            return state.openid
        }
    },
    mutations:{
     
        changeOpenid(state,val){
            state.openid = val
        }
    }
})
export default store