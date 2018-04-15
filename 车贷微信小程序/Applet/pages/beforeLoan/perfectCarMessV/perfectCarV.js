const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    myData:{},
    nowdate: '',
    date: '请选择',
    disabled: false,    
    insArr: [],
    isIllegal:false
  },
  nBack:function(){
    wx.navigateBack()
  },
  onLoad: function (options) {
      let that = this, carIns;
    let myData = that.data.myData;    
    let isIllegal = that.data.isIllegal;    
    let insArr = that.data.insArr;   
    let pData = { CarId: wx.getStorageSync('CarId')};
    util.myPost(Url.getCarInfo, pData, callBack, true);
    function callBack(res){
      console.log(res.data);
      myData = res.data;
      carIns = myData.InsurancePolicy;
      if (myData.MortgageNum==0){
          myData.LastMortgageTime='无'
      }else{
          myData.LastMortgageTime = util.getTime(myData.LastMortgageTime,4)
      }
      if (myData.TransferNum == 0) {
          myData.LastLicenceTime = '无'
      }else{
          myData.LastLicenceTime = util.getTime(myData.LastLicenceTime,4)
      }
      myData.FirstLicenceTime = util.getTime(myData.FirstLicenceTime,4)
      myData.ManufactureDate = util.getTime(myData.ManufactureDate,4)
      myData.CommercialImaturitydate = util.getTime(myData.CommercialImaturitydate,4)
      myData.CompulsoryImaturitydate = util.getTime(myData.CompulsoryImaturitydate,4)
      if (myData.IllegalDeduction == '0' && myData.IllegalFine == '0.00' && myData.TransferNum==0){
        isIllegal=false
      }
      else{
        isIllegal = true
      }
      if (carIns != null && carIns!='') {
          carIns = carIns.replace(/1/, '机动车责任事故强制保险单').replace(/2/, '车损险').replace(/3/, '盗抢险').replace(/4/, '第三方责任险').replace(/5/, '不计免赔').replace(/6/, myData.InsuranceOtherType);
          insArr = carIns.split(',');
      } else {
          carIns = ''
          insArr = ''
      }
      that.setData({
        myData: myData,
        isIllegal: isIllegal,
        insArr: insArr
      });
      wx.setStorageSync('carInfo', myData);
    }        
  },
  onReady: function () {

  },
  onShow: function () {
    
  },

})