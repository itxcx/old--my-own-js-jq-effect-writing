import _Promise from 'bluebird';

const HostUrl = require('../config.js');

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**上传图片**/
const choosePic = (num, url, data, callBack) => {
    let openId = wx.getStorageSync('wxOpenID'),
        token = wx.getStorageSync('Token');
    wx.chooseImage({
        count: num,  //最多可以选择的图片总数  
        sizeType: ['compressed'], //压缩--- original (原图)
        sourceType: ['camera'], // 照相机---album (相册)
        success: function (res) {
            let FilePaths = res.tempFilePaths;
            //启动上传等待中...  
            showLoad('等待上传')
            let uploadImgCount = 0;
            for (let i = 0; i < FilePaths.length; i++) {
                wx.uploadFile({
                    url: url,
                    filePath: FilePaths[i],
                    name: 'images',
                    formData: data,
                    header: {
                        'Authorization': 'BasicAuth ' + openId + '&' + token,
                        "Content-Type": "multipart/form-data"
                    },
                    success: function (res) {
                        uploadImgCount++;
                        callBack(res, FilePaths[i])
                        //如果是最后一张,则隐藏等待中
                        if (uploadImgCount == FilePaths.length) {
                            wx.hideLoading();
                        }
                    },
                    fail: function (res) {
                        openMess('上传失败')
                    }
                });
            }
        }
    })
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
        'Authorization': 'BasicAuth ' + openId + '&' + token,
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
/**请求GPS**/
const GPSPost=(data,fn)=>{
    showLoad('加载中...');
    wx.request({
        url: HostUrl.GPS,
        data: data,
        method: "GET",
        success: function (res) {
            fn(res);
        },
        fail: function (error) {
            console.log(error);
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
        case 5: time = year + '/' + month + '/' + day
            break;
    }

    return time
}

/**验证**/
const Verification = {
    carFrame: (str) => {
        let reg = /[A-Za-z0-9]{17}$/, res = true;
        if (str != '' || str != null) {
            if (reg.test(str)) {
                res = true;
            } else {
                openMess('车架号错误')
                res = false;
            }
        } else {
            openMess('车架号不能为空')
            res = false
        }
        return res
    },
    carNumber: (str) => {
        let reg = /[A-Z0-9]{5}$/, res = true;
        if (str != '' || str != null) {
            str = str.toUpperCase();
            if (reg.test(str)) {
                res = true;
            } else {
                openMess('车牌号不合法')
                res = false;
            }
        } else {
            openMess('车牌号不能为空')
            res = false
        }
        return res
    },
    idCard: (str) => {
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var tip = "";
        var pass = true;

        if (!str || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(str)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[str.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (str.length == 18) {
                str = str.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = str[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != str[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        //if (!pass) alert(tip);
        return pass;
    },
    telephone: (str) => {
        var reg = /^1[34578][0-9]{9}$/, res;
        if (str != '' || str != null) {
            if (reg.test(str)) {
                res = true;
            } else {
                openMess('手机号码输入错误')
                res = false;
            }
        } else {
            openMess('手机号码不能为空')
            res = false
        }
        return res;
    },
    address: (str) => {
        var reg = /^(?=.*?[\u4E00-\u9FA5])[\d\u4E00-\u9FA5]{8,}$/, res;
        if (str != '' || str != null) {
            if (reg.test(str)) {
                res = true;
            } else {
                openMess('地址输入不合法')
                res = false;
            }
        }
        return res;
    },
    integer: (str) => {
        var reg = /^[0-9]{0,}$/, res;
        if (str != '' || str != null) {
            if (reg.test(str)) {
                res = true;
            } else {
                openMess('数字输入不合法')
                res = false;
            }
        }
        return res;
    },

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
const getImgUrl = (src) => {
    let url
    if(src){
        url = src.slice(1);
    }
    return HostUrl.ResourceUrl + url;
}
/*错误信息提示 */
const errorMsg = (t) => {

}
/**图片识别**/
const ImageRecognition=(name,fn,b,tt)=>{
    let openId = wx.getStorageSync('wxOpenID'),
        token = wx.getStorageSync('Token'),t=0;
    if (name =='carvin'){
        t=2
    } else if (name=='banknum'){
        t=3
    }else{
        t=1
    }
    let typeA = [];
    if(tt){
      typeA = ['album', 'camera'];
    }
    else{
      typeA = ['camera'];
    }
    wx.chooseImage({
        count: 1,  //最多可以选择的图片总数  
        sizeType: ['compressed'], //压缩--- original (原图)
        sourceType: typeA, // 照相机---album (相册)
        success: function (res) {
            let FilePaths = res.tempFilePaths;
            //启动上传等待中...  
            showLoad('等待上传')
            let data = { 'FileUrl': FilePaths[0], 'PicType': t }
         
                wx.uploadFile({
                    url: HostUrl.GetPictureInfoByOCR,
                    filePath: FilePaths[0], 
                    name: 'images',
                    formData: { 'PicType': t},
                    header: {
                        'Authorization': 'BasicAuth ' + openId + '&' + token
                    },
                    success: function (res) {
                         res=JSON.parse(res.data)
                        fn(res)
                        if(b){

                        }
                        else{
                          wx.hideLoading();
                        }                        
                    },
                    fail: function (res) {
                        openMess('上传失败')
                    }
                });
        }
    })
}

const animation = wx.createAnimation({
    duration:400,
    timingFunction:'ease',
    delay:0,
    transformOrigin:'50% 50% 0'

});

const addDot=(arr)=>{
    if (arr instanceof Array) {
        arr.map(val => {
            if (val.AreaName.length > 4) {
                val.AreaName = val.AreaName.slice(0, 4) + '...';
                return val;
            } else {
                val.AreaName = val.AreaName;
                return val;
            }
        })
    }
}
/**
 * @param {Function} fun 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
 */
function Promise(fun,options){
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
    choosePic: choosePic,
    ImageRecognition: ImageRecognition,
    myPost: myPost,
    GPSPost: GPSPost,
    serverPost: serverPost,
    showLoad: showLoad,
    getTime: getTime,
    changeTime: changeTime,
    formatTamp: formatTamp,
    Verification: Verification,
    moveStorage: moveStorage,
    getImgUrl: getImgUrl,
    animation: animation,
    addDot: addDot,
    Promise: Promise
}
