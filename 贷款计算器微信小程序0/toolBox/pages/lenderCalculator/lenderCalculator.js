// pages/lenderCalculator/lenderCalculator.js
const Url = require('../../config.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loanTimeIndex: 0,
    loanTimeArr: ['请选择借款期限', '3期', '12期', '24期', '36期'],
    c1:'#999',
    c2: '#444',
    firstRepayTime: '请选择首次还款时间',    
    loanType: '', 
    loanRate: '',
    myData:[],
    length:0,
    param:{},
    startTime:''
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
    let that = this;
    let startTime = that.data.startTime;        
    let firstRepayTime = that.data.firstRepayTime;    
    let today = util.formatTamp(new Date().getTime(), 4);    
    let y = new Date().getFullYear();
    let m = new Date().getMonth()+1;
    let d = new Date().getDate();
    function isLeapYear(year) {
      var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
      var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
      var cond3 = year % 400 == 0;  //条件3：年份是400的倍数      
      var cond = cond1 && cond2 || cond3;
      if (cond) {        
        return true;
      } else {        
        return false;
      }
    }
    let month = [];    
    if (isLeapYear(y)){
      month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];    
    }
    else{
      month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];    
    }    
    if(m==12){
      y++;
      m=1;      
    }
    else{
      m++;
    }
    //字符串年月日'2018-02-05'
    if (d - 1 > month[m - 1]){
      d = month[m - 1] - 1
    }
    else{
      if(d==1){
        if(m==1){
          y--;
          m=12;
          d=31;
        }
        else{
          m--;
          d = month[m-1];
        }
      }
      else{
        d--;
      }      
    }
    let ymd = y +'-'+ m +'-'+ d;    
    that.setData({
      startTime: today,
      firstRepayTime: util.formatTamp(new Date(ymd).getTime(), 4)
    });
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
      loanType = '等额本金';
      loanRate = '7.5%';
    }   
    else if (ind == 3) {
      loanType = '等额本金';
      loanRate = '16%';
    }
    else if (ind == 4) {
      loanType = '等额本金';
      loanRate = '24%';
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
    let param = that.data.param;
    if (details.loanAmount == '' || details.loanTime == 0 || details.firstRepayTime == '请选择首次还款时间'){
      util.openMess('前三项为必填项');
    }
    else if (parseFloat(details.loanAmount)<=0){
      util.openMess('金额必须大于0');
    }
    else{      
      let loanTimeNum = Number(loanTimeArr[details.loanTime].substring(0, loanTimeArr[details.loanTime].length - 1));
      param = { Amount: Number(details.loanAmount), Term: loanTimeNum, FirstDate: util.changeTime(details.firstRepayTime), LoanType: 1, LendingRage: 0 };      
      that.setData({
        param: param
      },function(){
        wx.navigateTo({
          url: '../lenderCalculatorResult/lenderCalculatorResult',
        });
      });               
    }
  }
})