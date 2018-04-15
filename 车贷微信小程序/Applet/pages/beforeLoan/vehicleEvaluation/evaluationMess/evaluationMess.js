var util = require('../../../../utils/util.js')
var Url = require('../../../../config.js')

Page({
  data: {
       carMess:{},       
       fontSize:70,
       demoPic:'',
       btnShow:true
  },
  onLoad: function (options) {
      let OrderId = options.OrderId;       
      console.log(options)
      if(OrderId){
          wx.setStorageSync('OrderId', OrderId)
      }   
      this.setData({          
          OrderId: OrderId,
          demoPic: Url.picUrl+'/demo.png'
      })                  
  },
  onReady:function(){
    wx.hideLoading()
  },
  onShow:function(){
      this.getCarMess()
  },
  getCarMess:function(){
      let that = this,       
       OrderId = that.data.OrderId
      util.myPost(Url.WxOrderInfo, { 'OrderId': OrderId }, function (res) {
          if (res.code == 0) {
              let mydata = res.data,linkUrl=''
              mydata.ManufactureDate = util.getTime(mydata.ManufactureDate, 2)
              mydata.FirstLicenceTime = util.getTime(mydata.FirstLicenceTime,5)
              let name = parseFloat(mydata.OfflineAssAmount), fontSize, btnShow=true,
                  OrderStatus = mydata.OrderStatus, IsConfirm = mydata.IsConfirm
              console.log(mydata)
              if (OrderStatus == 1 || OrderStatus==2){
                  if (IsConfirm==0){
                      btnShow = true
                  }else{
                      btnShow=false
                      linkUrl = '/pages/beforeLoan/vehicleEvaluation/fillInloan/fillInloan?OrderId=' + mydata.OrderId
                  }
              }else{
                  btnShow=false
                  linkUrl = '/pages/orderM/orderDetails/orderDetails?OrderId=' + mydata.OrderId  + ' &pageEnter=ddgl'
              }
              if (isNaN(name)) {
                  fontSize = 24
              } else {
                  fontSize = 70
              }
              that.setData({
                  carMess: res.data,
                  fontSize: fontSize,
                  btnShow: btnShow,
                  linkUrl: linkUrl
              })
              wx.stopPullDownRefresh();
          }
      }, true)
  },
  noApply:function(){
    //  wx.navigateTo({
    //      url: '/pages/beforeLoan/vehicleEvaluation/loan/loan?OrderId='+ this.data.carMess.OrderId,
    //  })
     wx.navigateBack({ })
  },
  apply:function(){
    wx.redirectTo({
      url: '/pages/beforeLoan/vehicleEvaluation/fillInloan/fillInloan?OrderId=' + this.data.carMess.OrderId,
    })
  },
  fillLoanInfo:function(){
    wx.navigateTo({
      url: '/pages/beforeLoan/vehicleEvaluation/fillInloan/fillInloan?OrderId=' + this.data.carMess.OrderId + 'IsAssessment=1',
    })
  },
  onPullDownRefresh:function(){
    this.getCarMess()
  },
  detailLink:function(){
      wx.redirectTo({
          url: this.data.linkUrl
      })
  }
})