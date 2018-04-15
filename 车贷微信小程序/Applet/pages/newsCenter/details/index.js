const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({

  data: {
      list:[],
      orderLink:{}
  },

  onLoad: function (options) {
      let orderId = options.orderId,
          taskId = options.taskId,
          orderLink={},s='',
          that=this
      console.log(taskId)
      util.myPost(Url.GetNoticeDetail + '?id=' + taskId, {},function(res){
           let mtData;
           if (res.Success){
               mtData = res.ResultData[0]
               console.log(mtData)
               let title = mtData.NoticeHeaders
               console.log(s)
               let pData = { KeyValue: mtData.OrderId, OpenId: wx.getStorageSync('wxOpenID') };
               util.myPost(Url.orderDetails, pData, function(res){
                   if(res.code==0){
                       orderLink=res.data
                       console.log(orderLink)
                       if (title.indexOf('抵押登记') > 0) {
                           s = 'dydj'
                       } else if (title.indexOf('GPS') > 0){
                           if (orderLink.IsGpsInstall=="1"){
                               s ='gpsjk'
                           }else{
                               s = 'gpsaz'
                           }
                       }else{
                           s='ddgl'
                       }
                       that.setData({
                           list: mtData,
                           orderLink: orderLink,
                           s: s
                       })
                   }else{
                       util.openMess(res.desc)
                   }
               }, true); 
              
           }
      },true)     
      util.myPost(Url.SetIsRead + '?id=' + taskId, {}, function (res) {
          if (res.Success) {
              console.log(res.Message)
          }else{
              console.log(res.Message)
          }                 
      }, true)     

  },

  onReady: function () {
  
  },

  onShow: function () {
  
  }
})