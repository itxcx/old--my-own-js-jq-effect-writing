// pages/beforeLoan/marriageInfoV/marriageInfoV.js
const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    myData:{},
    radius: [{ name: '已婚', value: 0, checked: false }, { name: '未婚', value: 1, checked: false }, { name: '离异', value: 2, checked: false }],
    formShow: true,
    disabled: true,
    region: ['江苏省', '苏州市', '虎丘区']
  },
  onLoad: function (options) {
      let that = this, liveMess = [], workMess = [];
    let myData = that.data.myData;
    let value = wx.getStorageSync('customerDetails');
    console.log(wx.getStorageSync('customerDetails'));
    value.SpousePermanentAddress = JSON.parse(value.SpousePermanentAddress )
    value.SpouseResidentialAddress = JSON.parse(value.SpouseResidentialAddress)
    myData = value;
    that.setData({
      myData: myData,
      c1:'#333',
      c2:'#333'
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  radioChange: function (e) {
    let val = e.detail.value
    if (val == 0) {
      this.setData({
        formShow: true,
        disabled: true
      })
    } else {
      this.setData({
        formShow: false,
        disabled: false
      })
    }
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      c1: "#444"
    })
  },
  navBack:function(){
      wx.navigateBack({
          
      })
  }
})