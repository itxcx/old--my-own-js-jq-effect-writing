const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
  data: {
      myData:{}
  },
 
  onLoad: function (options) {
    let that = this;
    let myData = that.data.myData;
    wx.getStorage({
        key: 'personInfo',
      success: function (res) {
        console.log(res.data);
        myData = res.data;
        that.setData({
          myData: myData
        })
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  formSubmit: function (e) {
      let data = e.detail.value
      data.CustomerId = wx.getStorageSync('CustomerId');
      util.myPost(Url.submitWU, data, callBack, false);
      function callBack(res) {
          if(res.code==0){
              util.openMess(res.desc, 'success');
              setTimeout(function () { wx.navigateBack();},2000);
          }else{
              util.openMess(res.desc);
          }
      }
  }
})