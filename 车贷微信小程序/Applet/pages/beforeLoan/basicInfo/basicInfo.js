
const Url = require('../../../config.js')
const util = require('../../../utils/util.js')

Page({
    data: {
        personInfo: {},
        WorkUnit: '',
        workAddress: {},
        show: true,
        GuarantorInfo: [],
        infolen: 0
    },
    onLoad: function (options) {

    },
    onReady: function () {

    },
    onShow: function () {
        let that = this,
            data = { CustomerId: wx.getStorageSync('CustomerId'), OrderId: wx.getStorageSync('OrderId'), 'CarId': '' };
        util.myPost(Url.basicInfo, data, function (res) {
            let info = res.data.T_CustomerEntity
            console.log(info)
            wx.setStorage({
                key: 'personInfo',
                data: info,
            })
            /*赋值*/
            that.setData({
                personInfo: info,
                WorkUnit: info.WorkUnit,
                workAddress: info.ResidentialAddress == '' ? '' : JSON.parse(info.ResidentialAddress)
            })
        }, true);

        /*获取紧急联系人*/
        util.myPost(Url.GetGuarantorInfo, data, function (res) {
            console.log(res)
            if (res.code == 0) {
                let info = res.data, show = true, len = info.length;
                if (len >= 4) {
                    show = false
                } else {
                    show = true
                }
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
    saveInfo: function (e) {
        let val = e.detail.value, s = 1,
            MaritalStatus = this.data.personInfo.MaritalStatus,
            GuarantorName = val.GuarantorName,
            workAddress = val.workAddress,
            tel = val.telephone,
            workName = val.workName;
        console.log(e)
        if (tel == '') {
            s = 0
            util.openMess('请输入手机号码')
            return false;
        } else if (!util.Verification.telephone(tel)) {
            util.openMess('手机号码错误')
            return false;
        } 
        if (MaritalStatus==0){
            util.openMess('请选择婚姻状况')
            return false;
        }
        if (workAddress==''){
            util.openMess('请选择居住地址')
            return false;
        }
        if (this.data.infolen < 2) {
            s = 0
            util.openMess('紧急联系人未填')
        }
        let data = { 'OrderId': wx.getStorageSync('OrderId'), 'WSZLType': 'IsDoneJBXX', 'WSZLValues': s }
        util.myPost(Url.SaveCustomerInfo, { 'CustomerId': wx.getStorageSync('CustomerId'), 'Mobile': tel }, function (res) {
            if (res.code == 0) {
                // console.log(res.desc)
            }
        }, true)
        util.myPost(Url.IsDoneWSZL, data, function (res) {
            if (res.code == 0) {
                util.openMess('保存成功', 'success');
                setTimeout(function () {
                    wx.navigateBack();
                }, 1500)
            } else {
                util.openMess(res.desc);
            }
        }, false)
        wx.removeStorage({
            key: 'personInfo',
            success: function (res) { },
        })
    }
})