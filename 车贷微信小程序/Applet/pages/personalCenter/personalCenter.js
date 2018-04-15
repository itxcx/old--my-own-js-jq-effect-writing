const Url = require('../../config.js')
const util = require('../../utils/util.js')
Page({

  data: {
        info:{}
  },

  onLoad: function (options) {
      let that = this,
          token = wx.getStorageSync('Token'), 
          openid = wx.getStorageSync('wxOpenID'),
          data = {OpenId: openid};

      util.myPost(Url.userInfo, data,function(res){
        console.log(res);
          let myData = res.data
          wx.setStorageSync('UserId', myData.UserId);
          console.log(wx.getStorageSync('UserId'))
          that.setData({
              info: myData
          })
      }, true)  
  },

  onReady: function () {
     
  },

  onShow: function () {
  
  },
  Unbind:function(){
      let that=this,
          token = wx.getStorageSync('Token'),
          data = { OpenId: that.data.info.OpenId};
      // console.log("token:" + token + ",data:" + that.data.info.OpenId);
      util.myPost(Url.exit, data,function (res) {
          if (res.code == 0) {
              util.openMess('退出成功','success');
              setTimeout(function(){
                  wx.redirectTo({
                      url: '/pages/login/login'
                  })
              }, 1000)
          }else{
              console.log(res.desc)
          }
      },false) ;
      
  }
})