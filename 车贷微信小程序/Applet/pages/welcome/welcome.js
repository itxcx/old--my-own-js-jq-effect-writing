const Url = require('../../config');
const util = require('../../utils/util.js')
Page({
  data: {
  
  },

  onLoad: function (options) {
      wx.showLoading({
          title: '欢迎进入',
      })
  },

  onReady: function () {

      /*wx登录*/
      wx.login({
          success: function (l_res) {
              if (l_res.code) {
                  wx.hideLoading()
                  //发起网络请求          
                  util.myPost(Url.getOpenId, { KeyValue: l_res.code},function(res){
                      if(res.code==0){
                          let openid = res.data.openid,
                              data = { OpenId: openid };
                          wx.setStorageSync('wxOpenID', openid)
                          util.myPost(Url.wxLoginUrl, data, function (res) {
                              if (res.code != 0) {
                                  wx.redirectTo({
                                      url: '/pages/login/login',
                                  })
                              } else {
                                  wx.setStorageSync('Token', res.data.Token);
                                  wx.switchTab({
                                      url: '/pages/index/index',
                                      success: function (e) {
                                          var page = getCurrentPages().pop();
                                          if (page == undefined || page == null) return;
                                          page.onLoad();
                                      }
                                  })       
                                //   wx.navigateTo({
                                //       url: '/pages/template/areaList/index',
                                //   })                                                 
                              }
                          }, true);
                      }else{

                      }
                  },true)
               
              } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
              }
          }
      });

  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})