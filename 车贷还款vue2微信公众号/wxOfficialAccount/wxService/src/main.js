// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import util from './util/util.js'
import Vuex from 'vuex'
import store from './vuex/store'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.use(Vuex);
// axios.defaults.headers.common['Authorization'] = 'BasicAuth o5mQc1fLqFEQ5mgnHHATCpEIDMZ0&'+localStorage.getItem('token');
axios.interceptors.request.use(
config => {    
	// console.log(localStorage.getItem('token'));
    // if (localStorage.getItem('token')) {
        // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
        console.log(localStorage.getItem('token'));
        if(localStorage.getItem('UserInfo')){
			config.headers.Authorization = `BasicAuth ${JSON.parse(localStorage.getItem('UserInfo')).openid}&${localStorage.getItem('token')}`;        
        }
        else{

        }
    // }
    return config
},
error => {
    return Promise.reject(error)
});

Vue.use(util);
//生产模式提示
Vue.config.productionTip = false
// 全局变量
//请求路径
let Url = 'http://192.168.0.100:81/api';
// let Url = 'http://shjrjt.imwork.net:8081/api';
Vue.prototype.postUrl = {
	UserRepayment:`${Url}/Receivable/UserRepayment`,
	CustomerAccess:`${Url}/Receivable/CustomerAccess`,
	CustomerLogin:`${Url}/Receivable/CustomerLogin`,
	CustomerUnBind:`${Url}/Receivable/CustomerUnBind`,
	GetUserOrder:`${Url}/Receivable/GetUserOrder`,
	GetWxOpenId:`${Url}/Receivable/GetWxOpenId`,
	EBJPay:`${Url}/Pay/EBJPay`,
	EBJPayQuery:`${Url}/Pay/EBJPayQuery`,  
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})