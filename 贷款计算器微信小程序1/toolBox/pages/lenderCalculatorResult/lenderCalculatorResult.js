// pages/lenderCalculatorResult/lenderCalculatorResult.js
const Url = require('../../config.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myData: [],
    length: 0,
    param:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    let that = this;
    let param = that.data.param;
    //自然进入        
    if (JSON.stringify(options) =='{}'){
      //getCurrentPages方法直接调用页面栈        
      let pages = getCurrentPages();      
      param = pages[pages.length - 2].data.param;          
      console.log(param);                  
    }
    //分享进入
    else{      
      param = { Amount: Number(options.Amount),Term: Number(options.Term)};
    };        
    util.myPost(Url.lendersToolBoxNew, param, function (res) {
      console.log(res);
      if (res.code == 0) {
        that.setData({
          myData: res.data,
          length: res.data.Info.length,
          param: param
        });
      }
      else {
        console.log(res.desc);
      }
    }, true);
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
    let that = this;
    let param = that.data.param;      
    return {
      title: '汽车融资租赁计算器',
      path: `/pages/lenderCalculatorResult/lenderCalculatorResult?Amount=${param.Amount}&Term=${param.Term}`
    }
  }, 
  backCal:function(){
    wx.redirectTo({
      url: '/pages/lenderCalculator/lenderCalculator',
    })
  }
})