// pages/lenderCalculator/lenderCalculator.js
const Url = require('../../config.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loanTimeIndex: 0,
    loanTimeArr: ['请选择借款期限', '3期', '12期', '24期'],
    c1:'#999',
    c2: '#999',
    firstRepayTime: '请选择首次还款时间',    
    loanType: '', 
    loanRate: '',
    myData:{},
    length:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loanTimeChange: function (e) {
    let ind = e.detail.value,
      color = '',
      loanTimeArr = this.data.loanTimeArr,
      loanType = this.data.loanTimeArr,
      loanRate = this.data.loanTimeRate;
    if (ind == 0) {
      color='#999';
      loanType = '';
      loanRate = '';
    } else {
      color = '#444'
    };
    if(ind == 1){
      loanType = '先息后本';
      loanRate = '6.8%';
    } 
    else if (ind == 2){
      loanType = '等额本息';
      loanRate = '8%';
    }   
    else if (ind == 3) {
      loanType = '等额本息';
      loanRate = '8.5%';
    }       
    this.setData({
      loanTimeIndex: ind,
      c1: color,
      loanType: loanType,
      loanRate: loanRate
    })
  },  
  firstRepayTimeChange: function (e) {
    this.setData({
      firstRepayTime: e.detail.value,
      c2: '#444'
    })
  },
  sub:function(e){
    let that = this;
    let loanTimeArr = that.data.loanTimeArr;    
    console.log(e.detail.value);
    let details = e.detail.value;
    if (details.loanAmount == '' || details.loanTime == 0 || details.firstRepayTime == '请选择首次还款时间'){
      util.openMess('前三项为必填项');
    }
    else{      
      let loanTimeNum = Number(loanTimeArr[details.loanTime].substring(0, loanTimeArr[details.loanTime].length - 1));
      util.myPost(Url.lendersToolBox, { Amount: Number(details.loanAmount), Term: loanTimeNum, FirstDate: util.changeTime(details.firstRepayTime),LoanType: 1, LendingRage:0}, function (res) {
        console.log(res);
        if(res.code==0){
          that.setData({
            myData:res.data.Info,
            length: res.data.Info.length
          });
        }
        else{
          console.log(res.desc);
        }        
      },true);      
    }
  }
})