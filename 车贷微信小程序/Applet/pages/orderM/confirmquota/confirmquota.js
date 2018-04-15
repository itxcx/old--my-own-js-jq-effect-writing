const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    myData:{},
    myData0: {},
    OrderPricingId:'',
    stateBtn:0    
  },
  onLoad: function (options) {          
    let that = this;
    let myData = that.data.myData;
    let OrderPricingId = that.data.OrderPricingId; 
    let stateBtn = 0;
    util.myPost(Url.orderDetails, { KeyValue: wx.getStorageSync('OrderId'), OpenId: wx.getStorageSync('wxOpenID') }, function (res) {
      console.log(res);
      if (res.code == 0) {  
        if (res.data.ActionNames.indexOf('额度确认')==-1){
          stateBtn = 0;
        } 
        else{
          stateBtn = 1;
        }     
        that.setData({
          myData0: res.data,
          stateBtn: stateBtn          
        });
        // console.log(res.data);
      }
      else {
        util.openMess(res.desc);
      }
    }, true);
    util.myPost(Url.quotaConfirPage, { OrderId: wx.getStorageSync("OrderId")}, function(res){
      console.log(res);
      if(res.code==0){
        OrderPricingId = res.data.OrderPricingId;
        myData = res.data;
        console.log(myData);
        that.setData({
          myData: myData,
          OrderPricingId: OrderPricingId
        });
      }
      else{
        util.openMess(res.desc);
      }
    }, true);
  },
  onReady: function () {
   
  },
  onShow: function () {
  
  },
  formsubmit:function(e){
    let that = this;
    let text = e.detail.value;
    let status = e.detail.target.dataset.status;
    let OrderPricingId = that.data.OrderPricingId;
    // console.log(OrderPricingId);
    if (status =='notaccept'){
      wx.navigateTo({
        url: `/pages/orderM/quotanoaccept/quotanoaccept?OrderPricingId=${OrderPricingId}`,
      })
    }else{
      util.myPost(Url.quotaAccept, { OpenId: wx.getStorageSync('wxOpenID'), OrderId: wx.getStorageSync("OrderId"), OrderPricingId: OrderPricingId}, function (res) {
        if(res.code==0){
          util.openMess('提交完成');
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/index/index',
            });
          }, 1000);
        } 
        else{
          util.openMess(res.desc);
        }               
      }, false);      
    }
  },
  goToDetail:function(){
    let that = this;
    let myData0 = that.data.myData0;    
    wx.redirectTo({
      url: '/pages/orderM/orderDetails/orderDetails?OrderId=' + myData0.OrderId + '&pageEnter=ddgl',
    });    
  }
})