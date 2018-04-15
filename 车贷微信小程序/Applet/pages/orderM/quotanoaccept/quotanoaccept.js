const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {     
     star_h: '/images/star_h.png',
     star_y: '/images/star_y.png',
     stars: [false, false, false, false, false],
     switchV:true,
     OrderPricingId:'',
     myData:{},
     IsReCheck:0
  },
  onLoad: function (options) {
    let that = this;
    let OrderPricingId = that.data.OrderPricingId;    
    OrderPricingId = options.OrderPricingId;    
    util.myPost(Url.quotaNotAcceptPage, { OrderId: wx.getStorageSync("OrderId"),OrderPricingId: OrderPricingId}, function(res){
      console.log(res);
      if(res.code==0){        
        that.setData({
          myData: res.data,
          OrderPricingId: OrderPricingId          
        });
        if (res.data.IsReCheck==1){
          that.setData({
            IsReCheck: res.data.IsReCheck,
            switchV:false
          });
        }
      }
      else{
        util.openMess(res.desc);
      }
      console.log(res);      
    }, true);    
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  formsubmit:function(e){    
    let that = this;
    let OrderPricingId = that.data.OrderPricingId;
    let switchV = that.data.switchV;    
    let stars = that.data.stars;  
    let IntentionLevel = 0;     
    console.log(switchV);    
    for(let i=0;i<5;i++){
      if (stars[i]){
        IntentionLevel++;
      }
    };
    //重新申请
    if (switchV){
      util.myPost(Url.quotaNotAccept, { OpenId: wx.getStorageSync('wxOpenID'), OrderId: wx.getStorageSync("OrderId"), OrderPricingId: OrderPricingId, IsAgain:1, AgainAmount: Number(e.detail.value.price), IntentionLevel: 0, Remark: e.detail.value.remarks }, function (res) {
        console.log(res);
        if (res.code == 0) {
          util.openMess('提交成功');
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/index/index',
            });
          },1000);          
        }
        else {
          util.openMess(res.desc);
        }        
      },false);
    }
    //不重新申请
    else{
      util.myPost(Url.quotaNotAccept, { OpenId: wx.getStorageSync('wxOpenID'), OrderId: wx.getStorageSync("OrderId"), OrderPricingId: OrderPricingId, IsAgain:2, AgainAmount:0, IntentionLevel: IntentionLevel, Remark: e.detail.value.remarks }, function (res) {
        if (res.code == 0) {
          util.openMess('提交成功');
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/index/index',
            });
          }, 1000);   
        }
        else {
          util.openMess(res.desc);
        } 
      },false);
    }        
  },
  chooseStar: function (e) {
    let stars = this.data.stars;
    let index = parseInt(e.target.dataset.index);    
    if (stars[index]) {
      for (let i = 0; i < index; i++) {
        stars[i] = true
      }
      for (let i = index; i < 5; i++) {
        stars[i] = false
      }
    } else {
      for (let i = 0; i <= index; i++) {
        stars[i] = true
      }
      for (let i = index + 1; i < 5; i++) {
        stars[i] = false
      }
    }
    this.setData({
      stars: stars
    })    
  },
  switchChange: function (e) {
    let that = this;
    let switchV = that.data.switchV;
    that.setData({
      switchV: e.detail.value
    });    
  }  
});