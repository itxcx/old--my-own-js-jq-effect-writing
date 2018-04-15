const util = require('../../../utils/util.js')
const Url = require('../../../config.js')
Page({

  /**
   * 页面的初始数
   */
  data: {
    switchFlag:true,    
    IsSceneInvestigation:1,
    picLength:0,
    links: [{ name: '是否发生过重大事故', url: '/pages/Gps/abPicUpload/abPicUpload?pictype=AbnormalVehiclePicsB' }, { name: '是否有可疑人员', url: '/pages/Gps/abPicUpload/abPicUpload?pictype=AbnormalVehiclePicsC' }, { name: '车内是否有违禁物品', url: '/pages/Gps/abPicUpload/abPicUpload?pictype=AbnormalVehiclePicsA' }, { name: '其他影响放款的问题', url: '/pages/Gps/abPicUpload/abPicUpload?pictype=AbnormalVehiclePicsD' },]
  },
  onLoad: function (options) {
    //   let that = this
    //   util.myPost(Url.GetOrderGPSInfo, { "OrderId": wx.getStorageSync('OrderId') }, function (res) {
    //       console.log(res);
    //       if (res.code == 0) {
    //           let IsSceneInvestigation = parseInt(res.data.IsSceneInvestigation)
    //           if (IsSceneInvestigation !=0){
    //               wx.redirectTo({
    //                   url: '/pages/Gps/Gpslist/Gpslist',
    //               })
    //           }
    //       }      
    //   }, true);  
  },
  onReady: function () {

  },

  onShow: function () {
      let that = this;
      let IsSceneInvestigation = that.data.IsSceneInvestigation;
    util.myPost(Url.GetPicsList, { "OrderId": wx.getStorageSync('OrderId'), 'PicsType': 29, 'ChildPicsType': 'GPSAbnormal' }, function (res1) {
      console.log(res1);      
      that.setData({
        picLength:res1.data.length
      });
    }, true);
  },
  submit: function () {    
    let that = this;    
    let IsSceneInvestigation = that.data.IsSceneInvestigation;    
    let picLength = that.data.picLength;    
    if (picLength <= 0) {
      util.openConfirm('提醒', '请至少上传一种异常照片', function () { });      
    }    
    else{            
      util.myPost(Url.saveAbnormalPic, { "OrderId": wx.getStorageSync('OrderId'), IsSceneInvestigation: IsSceneInvestigation, UserId: wx.getStorageSync('UserId')}, function (res) {
        console.log(res);
        if(res.code==0){
            wx.switchTab({
                url: '/pages/index/index',
            })
        }
        else{
          Util.openMess(res.desc);
        }
      },true);
    }    
  },
  nextStep:function(){
      util.myPost(Url.saveAbnormalPic, { "OrderId": wx.getStorageSync('OrderId'), IsSceneInvestigation: 1, UserId: wx.getStorageSync('UserId') }, function (res) {
          if (res.code == 0) {
              wx.redirectTo({
                  url: '/pages/Gps/Gpslist/Gpslist',
              })
          }
          else {
              Util.openMess(res.desc);
          }
      }, true);
  },
  switch:function(e){
    let that = this;
    let switchFlag = that.data.switchFlag;
    let IsSceneInvestigation = that.data.IsSceneInvestigation;
    switchFlag = e.detail.value;
    if (switchFlag==true){
      IsSceneInvestigation=1;
    }
    else if (switchFlag == false){
      IsSceneInvestigation = 2;
    }
    that.setData({
      switchFlag: switchFlag,
      IsSceneInvestigation: IsSceneInvestigation
    });
  }
})