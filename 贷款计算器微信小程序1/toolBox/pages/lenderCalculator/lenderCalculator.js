// pages/lenderCalculator/lenderCalculator.js
const Url = require('../../config.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {        
    itemsA: ['3 期', '12 期', '24 期'],
    chooseItem:0,
    money:'',
    param:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  chooseTerms:function(e){    
    let that = this;    
    that.setData({
      chooseItem: e.currentTarget.dataset.index
    });    
  },
  money:function(e){    
    let that = this;
    let num = Number(e.detail.value).toFixed(2);
    that.setData({
      money: num
    });
  },
  clear:function(e){
    let that = this;
    that.setData({
      money: ''
    });    
  },
  calcu: function (e) {
    let that = this;        
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 6000,
      mask: true
    });    
    setTimeout(function(){        
      let money = that.data.money;      
      let itemsA = that.data.itemsA;
      let chooseItem = that.data.chooseItem;
      if (Number(money) <= 0) {
        util.openMess('金额必须大于0');
      }
      else {
        let loanTimeNum = Number(itemsA[chooseItem].split(' ')[0]);
        let param = { Amount: Number(money), Term: loanTimeNum };        
        that.setData({
          param: param
        }, function () {          
          wx.navigateTo({
            url: '../lenderCalculatorResult/lenderCalculatorResult',
          });
        });
      }
    },200);    
  },
})