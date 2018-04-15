// 公共方法
import store from '../vuex/store'
export default{
  install(Vue,options)
  {  	
    Vue.prototype.getTime = function (str, status) {
	    const formatTime = date => {
	      const year = date.getFullYear()
		  const month = date.getMonth() + 1
		  const day = date.getDate()
		  const hour = date.getHours()
		  const minute = date.getMinutes()
		  const second = date.getSeconds()
		  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	    }
	    const formatTamp = (num, status) => {
	    let date = new Date(num);
	    let year = date.getFullYear()
	    let month = date.getMonth() + 1
	    let day = date.getDate()

	    let hour = date.getHours()
	    let minute = date.getMinutes()
	    let second = date.getSeconds()
	    let time=''
	    switch (status) {
	        case 1: time = year + '年' + month + '月' + day + '日'
	            break;
	        case 2: time = year + '年' + month + '月'
	            break;
	        case 3: time = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
	            break;
	        case 4: time = year + '-' + month + '-' + day 
	            break;
	    }

	    return time
		}
      	let timestamp = Date.parse(new Date(str));
	    if (!status){
	        status=1
	    }
	    let time = formatTamp(timestamp, status)
	    return time;
    }
    Vue.prototype.showTip = function(b,callback,t){
    	if(b){
    		store.state.pop.show = 1;
	        store.state.pop.text = b;          
	        store.state.timeout = setTimeout(function(){
	        	store.state.pop.show = 0;
	        	callback();
	        },t==undefined?2000:t);
    	}
    }
    Vue.prototype.hideTip = function(){
    	store.state.pop.show = 0;
    	clearTimeout(store.state.timeout);
    }
    Vue.prototype.alipay = (function (owner, doc) {
    	owner.getAllParams = function(url) {
			var reg = /[(\?|\&)]([^=]+)\=([^&#]+)/g,
				matches, output = {};
			while(matches = reg.exec(url)) {
				var key = decodeURIComponent(matches[1]),
					value = decodeURIComponent(matches[2]);
				output[key] = value;
			}
			return output;
		};
		owner.userAgent = function() {
			var output = {};
			if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
				output['ios'] = true;
			} else if(navigator.userAgent.match(/android/i)) {
				output['android'] = true;
			}
			return output;
		};
		owner.ajax = function(method, uri, options, callback) {
			var xmlhttp;
			if(window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			} else {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange = function() {
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					return callback(xmlhttp.responseText);
				}
			}
			xmlhttp.open(method, uri, true);
			xmlhttp.send(options);
		};
		owner.callAlipay = function(gourl) {
			console.log(gourl);				
			if(gourl) {
				var urlscheme = 'alipays';
				var ug = this.userAgent();
				if(ug.ios) {
					urlscheme = 'alipay';
				}
				var p = 'platformapi';
				var sm = '11';
				var s = '100000' + sm; 
				var gopage = urlscheme + '://' + p + '/startApp?appId=' + s + '&url=' + encodeURIComponent(gourl);
				console.log(gopage);		
				window.location.href = gopage;
			}
		};
    }(window.callappjs = {}, document))
    Vue.prototype.urlParamsQuery = function(s){
    	let string = s.substring(s.indexOf('?')+1);
    	let paramsArray = string.split('&');
    	let paramsObject = {};
    	for(let i=0;i<paramsArray.length;i++){
    		let key = paramsArray[i].split('=')[0];
    		let value = paramsArray[i].split('=')[1];
    		paramsObject[key] = value;
    	};
    	return paramsObject;
    }
    //判断是否微信内置浏览器
    Vue.prototype.is_weixin = function(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  }
}