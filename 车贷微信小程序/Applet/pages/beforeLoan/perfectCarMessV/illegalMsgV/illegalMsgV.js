const Url = require('../../../../config.js');
const util = require('../../../../utils/util.js');
Page({
  data: {
    myData:{}
  },
  nBack:function(){
    wx.navigateBack();
  },
  onLoad: function (options) {
    let that = this;
    let myData = that.data.myData;
    let value = wx.getStorageSync('carInfo');    
    myData = value;
    that.setData({
      myData: myData
    });
  },
  onReady: function () {

  },
  onShow: function () {

  }
})