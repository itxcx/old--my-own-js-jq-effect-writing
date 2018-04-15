import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    // author: 'Wise Wrong',
    // token:'',
    // tit:'11',
    isLogin:false,
    pop:{show:0,text:''},
    ReceivablesId:'',
    timeout:{},    
    // UserInfo:{}
  }
})

export default store