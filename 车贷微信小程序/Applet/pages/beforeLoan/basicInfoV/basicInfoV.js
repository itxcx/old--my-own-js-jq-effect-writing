// pages/beforeLoan/basicInfoV/basicInfoV.js
const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myData:{},    
    submit: true,
    c1: '#999',
    GuarantorInfo:[]
  },
  relationSelect: function (e) {
    this.setData({
      relationIndex: e.detail.value,
      c1: e.detail.value == 0 ? '#999' : '#000'
    })
  },
  nBack:function(){
    wx.navigateBack({})
    wx.removeStorage({
        key: 'personInfo',
        success: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this,
        data = { CustomerId: wx.getStorageSync('CustomerId'), OrderId: wx.getStorageSync('OrderId'), 'CarId': '' }; //wx.getStorageSync('OrderId')

    util.myPost(Url.basicInfo, data, function (res) {
       
        if(res.code==0){
            let info = res.data.T_CustomerEntity
            wx.setStorageSync('customerDetails', info);
            that.setData({
                myData:info,
                WorkUnit: info.WorkUnit,
                workAddress: info.ResidentialAddress == '' ? '' : JSON.parse(info.ResidentialAddress)
            })
        }
    }, true);

    /*获取紧急联系人*/
    util.myPost(Url.GetGuarantorInfo, data, function (res) {
        if (res.code == 0) {
            let info = res.data, show = true, len = info.length;
            that.setData({
                show: show,
                GuarantorInfo: info,
                infolen: len
            })
        } else {
            that.setData({
                GuarantorInfo: {}
            })
        }
    }, true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})