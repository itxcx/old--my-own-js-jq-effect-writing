const util=require('../../../utils/util.js')
const Url = require('../../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      IsDoneCLXX:0,
      IsDoneJBXX:0,
      IsDoneSFRZ:0,
      IsDoneZSZL:0,
      IsDoneCSZP:0,
      IsDoneFJXX:0
  },

  onLoad: function (options) {
     
  },

  onReady: function () {
  
  },

  onShow: function () {
      let that = this,
          orderId = wx.getStorageSync('OrderId'),
          data = { 'OrderId': orderId };
      util.myPost(Url.GetIsDoneWSZL, data, function (res) {
          if (res.code == 0) {
              let d=res.data
              console.log(d)
              that.setData({
                  IsDoneCLXX: d.IsDoneCLXX,
                  IsDoneCSZP: d.IsDoneCSZP,
                  IsDoneFJXX: d.IsDoneFJXX,
                  IsDoneJBXX: d.IsDoneJBXX,
                  IsDoneSFRZ: d.IsDoneSFRZ,
                  IsDoneZSZL: d.IsDoneZSZL
              })
          }
      }, true);
  },
  nextStep: function () {
      let data = this.data,
       IsDoneCLXX = data.IsDoneCLXX,
       IsDoneJBXX = data.IsDoneJBXX,
       IsDoneSFRZ = data.IsDoneSFRZ,
       IsDoneCSZP = data.IsDoneCSZP;
      if (!IsDoneSFRZ){
          util.openMess('请完善身份认证');
          return false;
      }
      if (!IsDoneJBXX){
          util.openMess('请完善基本信息');
          return false;
      }
      if (!IsDoneCLXX) {
          util.openMess('请完善车辆信息');
          return false;
      }
      if (!IsDoneCSZP) {
          util.openMess('请完善车身照片');
          return false;
      }
      wx.navigateTo({
          url: '/pages/beforeLoan/operator/operator',
      })
  }

})