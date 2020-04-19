import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        openid:localStorage.getItem('openid') || 'oUWMrwX2009ZBdhqlKi-rD0OeMSI',
        money:'',
      
  
    },
    getters:{
        getoptionid(state){
            return state.openid
        }
    },
    mutations:{
     
        changeOpenid(state,val){
            state.openid = val
            
        },
        changeMoney(state,value){
            state.money = value
        }
    }
})
export default store