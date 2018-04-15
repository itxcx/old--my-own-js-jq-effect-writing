const HostUrl = require('../config.js');

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/**加载**/
const showLoad = (text) => {
    wx.showLoading({
        title: text,
    })
}


/*信息提示*/
const openMess = (t, i) => {
    if (i != null || i != '') {
        i = 'loading'
    } else {
        i = 'success'
    }
    wx.showToast({
        title: t,
        icon: i,
        duration: 1000,
        mask: true,
        fail: function (res) {
            console.log(res)
        }
    })
}
const openConfirm = (t, c, callback) => {
    wx.showModal({
        title: t,
        content: c,
        success: function (res) {
            if (res.confirm) {
                callback()
            } else if (res.cancel) {
                //let cancel=fc2
            }
        }
    })
}

/**Ajax请求**/
const myPost = (url, data, fn, t) => {
    let openId = wx.getStorageSync('wxOpenID'),
        token = wx.getStorageSync('Token'),
        text = '加载中...';
    showLoad(text);
    let header = {
        // 'Authorization': 'BasicAuth ' + openId + '&' + token,
        'content-type': 'application/json;charset=UTF-8'
    };
    wx.request({
        url: url,
        data: data,
        method: "POST",
        header: header,
        success: function (res) {
            fn(res.data);
        },
        fail: function (error) {
            console.log(error);
        },
        complete: function () {
            if (t) {
                wx.hideLoading()
            }
        }
    });
}


//请求服务商
const serverPost = (url, fn) => {
    let header = {
        'content-type': 'application/json'
    };
    wx.request({
        url: url,
        method: "POST",
        header: header,
        success: function (res) {
            fn(res.data);
        },
        fail: function (error) {
            console.log(error);
        }
    });
}

/**更改时间格式**/
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const getTime = (str, status) => {
    let str1 = str.replace(/-/g, '/');  
    let timestamp = Date.parse(new Date(str1));
    if (!status){
        status=1
    }
    let time = formatTamp(timestamp, status)
    return time
}
const changeTime = (str) => {
    let str1 = str.replace(/-/g, '/');  
    let timestamp = Date.parse(new Date(str1));
  let date = new Date(timestamp);
  return date
}
/**时间戳转换成日期**/
const formatTamp = (num, status) => {
    let date = new Date(num);
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month.toString().length==1){
      month = '0' + month.toString();      
    }
    let day = date.getDate()
    if (day.toString().length == 1) {
      day = '0' + day.toString();
    } 
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
        case 5: time = year + '/' + month + '/' + day
            break;
    }  
    return time
}

/**移除缓存**/
const moveStorage = (key, status) => {
    if (!status) {
        status = 0
    }
    if (!status) {
        try {
            wx.removeStorageSync(key)
        } catch (e) {
            // Do something when catch error
        }
    } else {
        wx.removeStorage({
            key: key,
            success: function (res) {
                console.log(res.data)
            }
        })
    }
}

/**
 * @param {Function} fun 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
 */
const  Promise=(fun, options)=>{
    options = options || {};
    return new _Promise((resolve, reject) => {
        if (typeof fun !== 'function') {
            reject();
        }
        options.success = resolve;
        options.fail = reject;
        fun(options);
    });
}

module.exports = {
    formatTime: formatTime,
    openMess: openMess,
    openConfirm: openConfirm,        
    myPost: myPost,        
    showLoad: showLoad,
    getTime: getTime,
    changeTime: changeTime,
    formatTamp: formatTamp,    
    moveStorage: moveStorage,        
    Promise: Promise
}

