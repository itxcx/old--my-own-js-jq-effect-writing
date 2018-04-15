var util = require('../../../../utils/util.js')
var Url = require('../../../../config.js')
Page({

    data: {
        loanType: ['请选择借款类型', '车抵贷'],
        indexloanType: 0,
        indexTime: 0,
        indexbank: 0,
        timeType: ['请选择借款期限', '3个月', '12个月', '24个月'],
        bankType: ['请选择开户行', '中国建设银行', '中国银行', '中国农业银行', '中国邮政储蓄', '中国工商银行', '中国招商银行', '中国华夏银行', '中国交通银行', '中国中信银行',
            '中国光大银行', '中国民生银行', '中国广发银行', '中国浦东发展银行', '中国兴业银行'],
        carMess: {},
        payData: {},
        payMethod: '',
        payRate: '',
        Amount: '',
        IsAssessment:'0',
    },

    onLoad: function (options) {
        let data = { 'OrderId': options.OrderId, 'OpenId': wx.getStorageSync('wxOpenID') },
            that = this, carAmount, LendingRate;            
        let IsAssessment, OrderId
        if (options.IsAssessment){
            IsAssessment=options.IsAssessment
        }
        if (options.OrderId){
            OrderId = options.OrderId;
            wx.setStorageSync('OrderId', OrderId);
        }
        util.myPost(Url.LoadBorrowInfo, data, function (res) {
          console.log(res);
            let carMess = res.data, indexloanType = 0, indexTime = 0, payData = that.data.payData, c1 = '#444', c2 = '#444';
            if (carMess.LoanAmount == '0' || carMess.LoanAmount == '0.00') {
                carMess.LoanAmount = ''
            }
            if (carMess.LoanTerm == 3) {
                indexTime = 1
            } else if (carMess.LoanTerm == 12) {
                indexTime = 2
            } else if (carMess.LoanTerm == 24) {
                indexTime = 3
            } else {
                c2 = '#999'
            }
            if (carMess.LoanType == 1) {
                indexloanType = 1
            } else {
                c1 = '#999'
            }
            payData.RepaymentMethod = carMess.RepaymentMethod
            payData.LendingRate = carMess.LendingRate
            payData.LoanAmount = carMess.LoanAmount
            payData.LoanType = carMess.LoanType
            payData.LoanTerm = carMess.LoanTerm
            payData.LendingRate = carMess.LendingRate
            payData.BorrowId = carMess.BorrowId
            carAmount = parseFloat(carMess.Amount)
            if (payData.LendingRate!=''){
                LendingRate = (parseFloat(payData.LendingRate).toFixed(3) * 100).toFixed(2) + "%"
            }
            
            if (isNaN(carAmount)){
                IsAssessment='1'
            }
            that.setData({
                carMess: carMess,
                payData: payData,
                indexTime: indexTime,
                payMethod: carMess.RepaymentMethod,
                indexloanType: indexloanType,
                payRate: LendingRate ,
                Amount: carMess.LoanAmount,
                c1: c1,
                c2: c2,
                IsAssessment:IsAssessment
            })
        }, true);
    },
    onReady: function () {
        wx.hideLoading()
    },
    LoanChange: function (e) {
        let index = parseInt(e.detail.value), carMess = this.data.payData;
        if (index == 0) {
            this.setData({
                indexloanType: index,
                c1: '#999'
            })
        } else {
            carMess.LoanType = index
            this.setData({
                indexloanType: index,
                c1: '#444',
                payData: carMess
            })
        }

    },
    TimeChange: function (e) {
        let index = parseInt(e.detail.value), carMess = this.data.payData, payMethod = '', payRate = '';
        console.log(index)

        if (index == 0) {
            this.setData({
                indexTime: index,
                c2: '#999'
            })
        } else {
            switch (index) {
                case 1:
                    carMess.LoanTerm = 3  //先息后本
                    carMess.RepaymentMethod = payMethod = '先息后本'
                    payRate = '6.80%'
                    carMess.LendingRate = '0.068'
                    break;
                case 2:
                    carMess.LoanTerm = 12
                    carMess.RepaymentMethod = payMethod = '等额本息'
                    payRate = '8.00%'
                    carMess.LendingRate = '0.08'
                    break;
                case 3:
                    carMess.LoanTerm = 24
                    carMess.RepaymentMethod = payMethod = '等额本息'
                    payRate = '8.50%'
                    carMess.LendingRate = '0.085'
                    break;
            }
            this.setData({
                indexTime: index,
                c2: '#444',
                payMethod: payMethod,
                payData: carMess,
                payRate: payRate
            })
        }
    },
    BankChange: function (e) {
        let index = e.detail.value;
        if (index == 0) {
            this.setData({
                indexbank: index,
                c3: '#999'
            })
        } else {
            this.setData({
                indexbank: index,
                c3: '#444'
            })
        }
    },
    getAmount: function (e) {
        let payData = this.data.payData,
            val = e.detail.value;
            if(val!=''){
                val = parseFloat(val)
                if (!isNaN(val)) {
                    payData.LoanAmount = val = val.toFixed(2)
                } else {
                    val = ''
                    util.openMess('金额输入错误')
                }
            }else{
                val=''
            }
        this.setData({
            Amount: val
        })

    },
    formsubmit: function (e) {
        let that = this,
            data = that.data.payData,
            IndexType = parseInt(e.target.id),
            LoanAmount = that.data.Amount,
            orderId = wx.getStorageSync('OrderId');
        console.log(data)
        data.OpenId = wx.getStorageSync('wxOpenID')
        data.IndexType = IndexType
        data.OrderId = orderId
        data.LoanAmount = LoanAmount
        
        if (IndexType == 1) {
            console.log(data)
            util.myPost(Url.CreateBorrowInfo, data, function (res) {
                if(res.code==0){
                    wx.redirectTo({
                        url: '/pages/orderM/orderCenter/orderCenter?EnCode=ddgl'
                    })
                }else{
                    util.openMess(res.desc)
                }
            }, false)
        } else {
            if (LoanAmount == '') { 
                util.openMess('请输入借款金额')
                return false
            }
            if (that.data.indexloanType == 0) {
                util.openMess('请选择借款类型')
                return false
            }
            if (that.data.indexTime == 0) {
                util.openMess('请选择借款期限')
                return false
            }
           
            util.myPost(Url.CreateBorrowInfo, data, function (res) {
              console.log(res);
                if (res.code == 0) {
                    console.log(res.data)
                    util.openMess(res.desc, 'success');  
                    wx.setStorageSync('CustomerId', res.data.CustomerId);
                    wx.setStorageSync('CarId', res.data.CarId);
                    setTimeout(function () {
                        wx.redirectTo({
                            url: '/pages/beforeLoan/perfectData/index',
                        })
                    }, 1000)
                }else{
                    util.openMess(res.desc);  
                }
            }, false)
        }

    }
})