const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
    data: {
        nowdate: '',
        factory: '请选择',
        mortgage: '请选择',
        card: '请选择',
        business: '请选择',
        insurance: '请选择',
        MortgageNum:'',
        disabled: false,
        illegal: {},
        insArr: [],
        carinfo: {},
        morShow: true,
    },
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    },
    onLoad: function (options) {
        this.getCarInfo()
    },
    onReady: function () {

    },
    onShow: function () {
        this.getCarStatus()
    },
    getCarInfo:function(){
        let carId = wx.getStorageSync('CarId'),
            data = { 'CarId': carId },
            that = this;
        //车辆信息
        util.myPost(Url.getCarInfo, data, function (res) {          
            if (res.code == 0) {
                let carInfo = res.data, insArr, mortgage = '', card = '', business = '', insurance = '', MortgageNum = '', morShow = true, TransferNum = 0, LicenceTime = true;
                console.log(carInfo)
                TransferNum =parseInt(carInfo.TransferNum)
                MortgageNum = parseInt(carInfo.MortgageNum)
                if (TransferNum==0) {
                    LicenceTime =false
                }
                carInfo.LastLicenceTime = util.getTime(carInfo.LastLicenceTime, 4);
                if (MortgageNum==0) {
                    morShow = false
                }
                carInfo.LastMortgageTime = util.getTime(carInfo.LastMortgageTime, 4);
                carInfo.ManufactureDate = util.getTime(carInfo.ManufactureDate, 4);
                carInfo.FirstLicenceTime = util.getTime(carInfo.FirstLicenceTime);
                carInfo.CommercialImaturitydate = util.getTime(carInfo.CommercialImaturitydate, 4);
                carInfo.CompulsoryImaturitydate = util.getTime(carInfo.CompulsoryImaturitydate, 4);
                console.log(carInfo);
                if (carInfo.LastLicenceTime == '1900-1-1' || carInfo.LastLicenceTime == '1899-12-31'){
                    card='请选择'
                }else{
                    card = carInfo.LastLicenceTime
                    that.setData({
                        c3: '#444'
                    })
                }
                if (carInfo.LastMortgageTime == '1900-1-1' || carInfo.LastMortgageTime == '1899-12-31') {
                    mortgage = '请选择'
                } else {
                    mortgage = carInfo.LastMortgageTime
                    that.setData({
                        c2:'#444'
                    })
                }
                if (carInfo.CommercialImaturitydate == '1900-1-1' || carInfo.CommercialImaturitydate == '1899-12-31') {
                    business = '请选择'
                } else {
                    business = carInfo.CommercialImaturitydate
                    that.setData({
                        c4: '#444'
                    })
                }
                if (carInfo.CommercialImaturitydate == '1900-1-1' || carInfo.CommercialImaturitydate == '1899-12-31') {
                    business = '请选择'
                } else {
                    business = carInfo.CommercialImaturitydate
                    that.setData({
                        c5: '#444'
                    })
                }
                if (carInfo.CompulsoryImaturitydate == '1900-1-1' || carInfo.CompulsoryImaturitydate == '1899-12-31') {
                    insurance = '请选择'
                } else {
                    insurance = carInfo.CompulsoryImaturitydate
                    that.setData({
                        c2: '#444'
                    })
                }

                let ill = { 'illegal': true, 'mess': { 'IllegalDeduction': carInfo.IllegalDeduction, 'IllegalFine': carInfo.IllegalFine, 'UntreatedNum': carInfo.UntreatedNum } },
                    carIns = carInfo.InsurancePolicy;
                if (carInfo.IllegalDeduction == '0' && carInfo.IllegalFine == '0.00') {
                    ill.illegal = false;
                } else {
                    ill.illegal = true;
                }
                if (carIns != null) {
                    carIns = carIns.replace(/1/, '机动车责任事故强制保险单').replace(/2/, '车损险').replace(/3/, '盗抢险').replace(/4/, '第三方责任险').replace(/5/, '不计免赔').replace(/6/, carInfo.InsuranceOtherType);
                    insArr = carIns.split(',');
                } else {
                    carIns = ''
                    insArr = ''
                }
                let insObj = { 'ins': insArr, 'InsuranceOtherType': carInfo.InsuranceOtherType }
                wx.setStorage({
                    key: 'illegal',
                    data: ill,
                });
                wx.setStorage({
                    key: 'insurance',
                    data: insObj,
                });
                wx.setStorageSync('CarId', carInfo.CarId);
                that.setData({
                    carinfo: carInfo,
                    illegal: ill,
                    insArr: insArr,
                    mortgage: mortgage,
                    card: card,
                    business: business,
                    insurance: insurance,
                    morShow: morShow,
                    MortgageNum: MortgageNum,
                    LicenceTime: LicenceTime
                }, function () { wx.hideLoading()});                
            } else {
                util.openMess(res.desc);
                wx.hideLoading();
            }
        }, false);
    },
    getCarStatus:function(){
        let carId = wx.getStorageSync('CarId'),
            data = { 'CarId': carId },
            that = this;
        //车辆信息
        util.myPost(Url.getCarInfo, data, function (res) {
            if (res.code == 0) {
                let carInfo = res.data, insArr;
                let ill = { 'illegal': true, 'mess': { 'IllegalDeduction': carInfo.IllegalDeduction, 'IllegalFine': carInfo.IllegalFine, 'UntreatedNum': carInfo.UntreatedNum} },
                    carIns = carInfo.InsurancePolicy;
                if (carInfo.IllegalDeduction == '0' && carInfo.IllegalFine == '0.00') {
                    ill.illegal = false;
                } else {
                    ill.illegal = true;
                }
                if (carIns != null) {
                    carIns = carIns.replace(/1/, '机动车责任事故强制保险单').replace(/2/, '车损险').replace(/3/, '盗抢险').replace(/4/, '第三方责任险').replace(/5/, '不计免赔').replace(/6/, carInfo.InsuranceOtherType);
                    insArr = carIns.split(',');
                } else {
                    carIns = ''
                    insArr = ''
                }
                let insObj = { 'ins': insArr, 'InsuranceOtherType': carInfo.InsuranceOtherType }
                wx.setStorage({
                    key: 'illegal',
                    data: ill,
                });
                wx.setStorage({
                    key: 'insurance',
                    data: insObj,
                });
                wx.setStorageSync('CarId', carInfo.CarId);
                that.setData({
                    illegal: ill,
                    insArr: insArr,
                }, function () { wx.hideLoading()});                
            } else {
              util.openMess(res.desc);   
               wx.hideLoading();
            }
        }, false);
    },
    inputChange: function (e) {
        let val = parseInt(e.detail.value),
            morShow = true;
        if (val == 0) {
            morShow = false
        }
        this.setData({
            morShow: morShow,
            MortgageNum: val
        })
    },
    factoryDate: function (e) {
        this.setData({
            factory: e.detail.value,
            c1: '#444'
        })
    },
    mortgageDate: function (e) {
        this.setData({
            mortgage: e.detail.value,
            c2: '#444'
        })
    },
    cardDate: function (e) {
        this.setData({
            card: e.detail.value,
            c3: '#444'
        })
    },
    businessDate: function (e) {
      console.log(e.detail.value);
        this.setData({
            business: e.detail.value,
            c4: '#444'
        })
    },
    insuranceDate: function (e) {
        this.setData({
            insurance: e.detail.value,
            c5: '#444'
        })
    },
    illegalMsg: function () {
        wx.navigateTo({
            url: 'illegalMsg/illegalMsg',
        })
    },
    insList: function () {
        wx.navigateTo({
            url: 'insurance/insurance',
        })
    },
    formSubmit: function (e) {
        let that = this, OrderId = wx.getStorageSync('OrderId'), CarId = wx.getStorageSync('CarId'),
            insArr = that.data.insArr, Info = {}, val = e.detail.value,
            CommercialImaturitydate = val.CommercialImaturitydate,
            CompulsoryImaturitydate = val.CompulsoryImaturitydate,
            LastLicenceTime =val.LastLicenceTime,
            LastMortgageTime = val.LastMortgageTime,
            ManufactureDate = util.changeTime(val.ManufactureDate),
            MortgageNum = parseInt(val.MortgageNum),
            status = 0,data={};
            console.log(val)
           
        if (LastMortgageTime == '请选择'){
            util.openMess('请选择最近抵押时间!')
            return false
        }
        if (LastLicenceTime == '请选择') {
            util.openMess('请选择最近上牌时间!')
            return false
        }
        if (CommercialImaturitydate == '请选择') {
            util.openMess('请选择商业险到期时间!')
            return false
        }
        if (CompulsoryImaturitydate == '请选择') {
            util.openMess('请选择交强险到期时间!')
            return false
        }
      
            CommercialImaturitydate = util.changeTime(CommercialImaturitydate)
            CompulsoryImaturitydate = util.changeTime(CompulsoryImaturitydate)
            if (LastMortgageTime == '无') {
                LastMortgageTime = '1900-01-01'
            }
            LastMortgageTime = util.changeTime(LastMortgageTime)
            if (LastLicenceTime=='无'){
                LastLicenceTime ='1900-01-01'
            }
            LastLicenceTime = util.changeTime(LastLicenceTime)
            data = { 'CarId': CarId, 'CommercialImaturitydate': CommercialImaturitydate, 'CompulsoryImaturitydate': CompulsoryImaturitydate, 'LastLicenceTime': LastLicenceTime, 'LastMortgageTime': LastMortgageTime, 'ManufactureDate': ManufactureDate, 'MortgageNum': MortgageNum, 'MortgageNum': MortgageNum }
            console.log(data)
            if (insArr.length < 1) {
                util.openMess('请完善保险单!')
                return false;
            }
            util.myPost(Url.SaveCarInfo, data, function (res) {
                if (res.code == 0) {
                    util.openMess('提交成功', 'success');
                    status = 1
                    Info = { 'OrderId': OrderId, 'WSZLType': 'IsDoneCLXX', 'WSZLValues': status }
                    util.myPost(Url.IsDoneWSZL, Info, function (res) {
                        if (res.code == 0) {
                            console.log(res.desc)
                        }
                    }, false)
                    setTimeout(function () {
                        wx.navigateBack();
                    }, 1500)
                } else {
                    util.openMess(res.desc);
                }
            }, false)
        }
    
})