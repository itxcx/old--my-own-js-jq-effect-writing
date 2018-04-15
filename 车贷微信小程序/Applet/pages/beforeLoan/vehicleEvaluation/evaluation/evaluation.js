// pages/beforeLoan/vehicleEvaluation/evaluation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{},
    errorMess:'',
    btnStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })
    animation.height(40).step()
    this.setData({
      animationData: animation.export()
    })
  },
  nextStep:function(){
    wx.navigateTo({
      url: 'evaluationMess',
    })
  }
})