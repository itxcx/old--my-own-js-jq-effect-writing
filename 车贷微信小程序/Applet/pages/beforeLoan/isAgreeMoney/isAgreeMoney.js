// pages/beforeLoan/isAgreeMoney/isAgreeMoney.js
const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is:'',
    switchFlag:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let is = that.data.is;
    is = options.is;
    that.setData({
      is: is
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindFormSubmit:function(e){
    let that = this;
    let is = that.data.is;    
    let switchFlag = that.data.switchFlag;
    let remark = e.detail.value.textarea;    
    if(is=='gps'){
      var url = Url.GPSLoanConfirm;
      var data = { OrderId: wx.getStorageSync('OrderId'), IsGPSConfirm: switchFlag, GPSConfirmDescription: remark};
    }
    else if (is == 'dydj'){
      var url = Url.MORLoanConfirm;
      var data = { OrderId: wx.getStorageSync('OrderId'), IsMortgageConfirm: switchFlag, morLoanConfirmInfo: remark };
    }    
    util.myPost(url, data, function (res) {
      console.log(res);
      if (res.code == 0) {
        util.openMess('上传成功');
        setTimeout(function () {
          wx.navigateBack();
        }, 1000);
      }
      else {
        util.openMess(res.desc);
      }
    }, false);
  },
  switch:function(e){
    let that = this;
    let switchFlag = that.data.switchFlag;    
    if (e.detail.value == true){
      switchFlag=2;
    }
    else{
      switchFlag = 3;
    }
    that.setData({
      switchFlag: switchFlag
    });
  }
})