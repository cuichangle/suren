import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        show:false,
        myrank:'',//我的排名
    },
    getters:{
        getmaplight(state){
            return state.show
        }
    },
    mutations:{
        changemaplight(state){
           state.show = true
        },
        changemyrank(state,val){
            state.myrank = val
        }
    }
})
export default store