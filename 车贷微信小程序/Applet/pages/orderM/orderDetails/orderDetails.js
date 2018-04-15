// pages/orderM/orderDetails/orderDetails.js
const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {    
    myData:{},
    od_up: { name: 'GPS安装进行中', time:'09:30'},    
    od_basic:{mort:true,gps:false},        
    addM: { alink: '../../beforeLoan/addInfoV/addInfoV', name: '未上传' },
    gua: { alink: '../../beforeLoan/GuaranteeV/GuaranteeV', name:'刘四友'},    
    abnorPic: { alink: ''},    
    create:'2017-06-04 10:45:54',
    layer:true,
    popA:{},    
    popListLength:0,
    pageEnter:'',                      
    closeAnimation: {},
    IsMortgage:0,
    IsGpsInstall:0,
    phoneNumber:'',
    options:{}
  },
  viewProgress:function(){    
    var layer = this.data.layer;
    layer = false;
    var animation = wx.createAnimation({

    });    
    animation.top(0).step()
    this.setData({
      layer:layer,
      popA: animation.export()
    });
  },
  popClose:function(){    
    var that = this;
    var layer = this.data.layer;
    layer = true;
    var animation = wx.createAnimation({

    });
    animation.top('100%').step();
    this.setData({      
      popA: animation.export()  
    });
    setTimeout(function(){
      that.setData({
        layer: layer
      });
    },600)    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
      console.log(options)
    this.setData({
      options: options
    });
        
  },
  onReady: function () {
  },
  onShow: function () {
    let that = this;  
    let options = this.options;
    let myData = that.data.myData;
    var pageEnter = that.data.pageEnter;    
    var layer = this.data.layer;  
    wx.setStorageSync('OrderId', options.OrderId);
    let pData = { KeyValue: options.OrderId, OpenId: wx.getStorageSync('wxOpenID')};               
    util.myPost(Url.orderDetails, pData, callBack, true);
    function callBack(res) {
      myData = res.data;
      let amount = myData.BorrowAmount
      if (amount == '' || parseFloat(amount)==0){
          myData.BorrowAmount='--'
      }else{
          myData.BorrowAmount = amount
      }
     
      console.log(myData);
      wx.setStorageSync('CarId', myData.CarInfo.CarId);
      wx.setStorageSync('CustomerId', myData.CustomerInfo.CustomerId);
      //gps未安装
      if (options.pageEnter == 'gpsaz' && myData.IsGpsInstall == '0') {
        pageEnter = options.pageEnter + '_waz';        
      }
      //gps已安装
      else if (options.pageEnter == 'gpsaz' && myData.IsGpsInstall == '1') {
        pageEnter = options.pageEnter + '_yaz';
      }
      //抵押登记 未抵押
      else if (options.pageEnter == 'dydj' && myData.IsMortgage == '0') {
        pageEnter = options.pageEnter + '_wdy';        
      }
      //抵押登记 已抵押
      else if (options.pageEnter == 'dydj' && myData.IsMortgage == '1') {
        pageEnter = options.pageEnter + '_ydy';
      }
      else {
        pageEnter = options.pageEnter;
      }
      if (myData.ActionNames) {
        myData.ActionNames = myData.ActionNames.split(',');
      };            
      //链接
      if (myData.ReviewRemark) {
        myData.addInfoUrl = '../../beforeLoan/addInfo/addInfo';
        myData.guarantee = '../../beforeLoan/Guarantee/Guarantee';
      }
      else {
        myData.addInfoUrl = '../../beforeLoan/addInfo/addInfo?disabled=false';
        myData.guarantee = '../../beforeLoan/GuaranteeV/GuaranteeV';
      }        
      myData.bindGps = '../../Gps/Gpslist/Gpslist';
      myData.carAbnormalPic = '../../Gps/verticalAbPic/verticalAbPic';      
      for (let i = 0; i < myData.ScheduleList.length; i++) {
        myData.ScheduleList[i].Processingtime = myData.ScheduleList[i].Processingtime.substring(0, 5);
      };
      //gps数量
      util.myPost(Url.GetGPSNum, { "OrderId": wx.getStorageSync("OrderId") }, function (res) {
        if (res.code == 0) {
          that.data.myData.GPSnum = [res.data.CurrentWGPSNum, res.data.CurrentWlGPSNum];
          that.setData({
            myData: that.data.myData
          });
        } else {
          util.openMess(res.desc)
        }
      }, true);
      that.getMarNUm();
      that.setData({
        pageEnter: pageEnter,   
        myData: myData,
        popListLength: myData.ScheduleList.length,
        IsMortgage: myData.IsMortgage,
        IsGpsInstall: myData.IsGpsInstall,
        phoneNumber: myData.CustomerInfo.Mobile
      });
    };                        
    // 小弹窗
    // wx.showModal({
    //   title: '风控提醒',
    //   content: '告知当前状态，信息和解决方法',
    //   showCancel:false,
    //   confirmColor:'#4e8cee',
    //   success: function (res) {
    //     if (res.confirm) {
    //       layer = true;
    //       that.setData({
    //         layer: layer
    //       });
    //     }
    //   }
    // });        

  },  
  //抵押登记数量
  getMarNUm:function(){
     let that = this,num=0,
       data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType': 'Mortgage', 'ChildPicsType': 'Mortgage' }
      util.myPost(Url.GetPicsList, data, function (res) {  //GetPicsList
          if (res.code == 0) {
              let mydata = res.data
              for (let i = 0; i < mydata.length; i++) {
                  if (mydata[i].PicsType == 28) {
                      num++
                  }
              }
              that.data.myData.GetMorNum = num;
              that.setData({
                  myData: that.data.myData
              });
          } 
      }, true)
  },
   riskSub:function(){
    let that = this;    
    wx.showActionSheet({
      itemList: ['关注', '高危'],
      success: function (res) {
        // console.log({ OpenId: wx.getStorageSync('wxOpenID'), CustomerId: wx.getStorageSync('CustomerId'), RiskLevel: res.tapIndex + 2 });
        util.myPost(Url.riskSub, { OpenId: wx.getStorageSync('wxOpenID'), CustomerId: wx.getStorageSync('CustomerId'), RiskLevel: res.tapIndex + 2 }, function (res) {
        setTimeout(function () {
          util.openMess('提交成功');
        }, 0)
      }, false);
      },
      fail: function (res) {
          util.openMess(res.errMsg)
      }
    })
  },
   bindGpsBtn:function(){
     let that = this;
     let myData = that.data.myData;
    //  console.log(myData);  
     if (myData.IsGpsLoanApply == 2 || myData.IsSceneInvestigation != 0){
       wx.navigateTo({
         url: '../../Gps/Gpslist/Gpslist'
       });
     }
     else{
       wx.navigateTo({
         url: '../../Gps/isAbnormal/isAbnormal'
       });
     }
   },
   bindDydjBtn: function () {
     wx.navigateTo({
       url: '../../orderM/mortgagePic/index'
     })
   },
   moneySureBtn: function () {     
     wx.navigateTo({
       url: '../../beforeLoan/isAgreeMoney/isAgreeMoney?is=gps'
     })
   },
   dydjmoneySureBtn: function () {
     wx.navigateTo({
       url: '../../beforeLoan/isAgreeMoney/isAgreeMoney?is=dydj'
     })
   },
   quotaConfir:function(){
     wx.navigateTo({
       url: '../../orderM/confirmquota/confirmquota'
     })
   },
   quotaCarPrice:function(){
       wx.redirectTo({
           url: '/pages/beforeLoan/vehicleEvaluation/evaluationMess/evaluationMess?OrderId='+wx.getStorageSync('OrderId')
       })
   },
   reApply:function(){
       wx.redirectTo({
       url: '../../beforeLoan/vehicleEvaluation/index/index?reApply=reApply'
     })
   },
   subAudit:function(){
     util.myPost(Url.subAudit, { OpenId: wx.getStorageSync('wxOpenID'), OrderId: wx.getStorageSync('OrderId')}, function(res){              
       if(res.code==0){
         util.openMess('提交成功');
         setTimeout(function () {
           wx.switchTab({
             url: '../../index/index',
           });
         }, 1000);     
       }
       else{
         util.openMess(res.desc);
       }
     },false);          
   },
   titClose: function () {
     //动画效果 
     var animation = wx.createAnimation({});
     this.closeAnimation = animation;
     animation.height('0').step();
     this.setData({
       closeAnimation: animation.export()
     });
   },
   applyLenders:function(){
     let that = this;
     let IsMortgage = that.data.IsMortgage==0?'未完成':'已完成';
     let IsGpsInstall = that.data.IsGpsInstall == 0 ? '未完成' : '已完成';
     util.openConfirm('温馨提醒',`抵押登记${IsMortgage}，GPS${IsGpsInstall}安装，是否确认申请放款？`,function(){       
       util.myPost(Url.applyLoan, { OpenId: wx.getStorageSync('wxOpenID'), OrderId: wx.getStorageSync('OrderId')}, function(res){
         if(res.code==0){
           util.openMess('提交成功');
           setTimeout(function(){
             wx.switchTab({
               url: '../../index/index',
             });
           },1000)
         }
         else{             
            console.log(res.desc);
            wx.hideLoading();
            util.openMess(res.desc);  
         }
       },false);
     });
   },
   gpsLocation:function(){
     wx.navigateTo({
       url: '../../Gps/Gpslist/Gpslist?location=true'
     })
   },

   contactCust:function(){
     let that = this;
     let phoneNumber = that.data.phoneNumber;     
     wx.makePhoneCall({
       phoneNumber: phoneNumber
     });
   }   
})