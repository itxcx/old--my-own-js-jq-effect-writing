const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
    data: {
        relation: ['请选择关系', '亲人', '朋友', '同事'],
        ind: 0,
        id: '',
        mydata: {},
        info: {},
        show:false,
        c:false,
        EmergencyContactId:''
    },
    onLoad: function (options) {
        let that = this, EmergencyContactId='',
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'CustomerId': wx.getStorageSync('CustomerId') },
            relation = that.data.relation ;
        if (options.info) {
            that.setData({
                disabled: true
            })
        }
        if (options.id){
            EmergencyContactId = options.id
            that.setData({
                EmergencyContactId: EmergencyContactId
            })
        }
        if (options.index) {
            let index =parseInt(options.index)
            util.myPost(Url.GetGuarantorInfo, data, function (res) {
                console.log(res)
                if (res.code == 0) {
                    let info = res.data[index],ind=0
                    for(let i=0;i<relation.length;i++){
                        if (relation[i]==info.EmergencyContactRelation){
                            ind=i
                        }
                    }
                    that.setData({
                        mydata: data,
                        info: info,
                        ind: ind,
                        c1:"#444",
                        show:true
                    })
                }
            }, true)
        } else {
            that.setData({
                mydata: data
            })
        }
    },
    onReady: function () {

    },
    onShow: function () {

    },
    bingChange: function (e) {
        let val = e.detail.value, c1 = '#999'
        if (val != 0) {
            c1 = "#444"
        }
        this.setData({
            ind: val,
            c1: c1
        })
    },
    formSubmit: function (e) {
        let that = this,
            obj = e.detail.value,
            data = that.data.mydata,
            ind =parseInt(that.data.ind),
            EmergencyContactRelation = that.data.relation[ind],
            EmergencyContactId = that.data.EmergencyContactId,
            EmergencyContactName = obj.EmergencyContactName,
            EmergencyContactMobile = obj.EmergencyContactMobile;
            console.log(ind)
        if (ind == 0) {
            util.openMess('请选择关系')
            return false
        }
        if (EmergencyContactName == '') {
            util.openMess('请输入联系人姓名')
            return false
        }
        if (EmergencyContactMobile == '') {
            util.openMess('请输入联系人电话')
            return false
        } else {
            if (!util.Verification.telephone(EmergencyContactMobile)) {
                util.openMess('手机号码不合法')
                return false;
            }
        }
        obj.EmergencyContactRelation = EmergencyContactRelation
        obj.EmergencyContactId = EmergencyContactId
        data = Object.assign(data, obj)
        console.log(data)
        util.myPost(Url.SaveEmergencyContactInfo, data, function (res) {
            if (res.code == 0) {
                util.openMess('保存成功', 'success');
                setTimeout(function () {
                    wx.navigateBack();
                }, 1500)
            } else {
                util.openMess(res.desc);
            }
        }, false)
    },
    deleteInfo:function(){
        let that=this,
            data = that.data.mydata
        data.EmergencyContactId = that.data.EmergencyContactId
        util.myPost(Url.RemoveEmergencyContactInfo, data, function (res) {
            if (res.code == 0) {
                util.openMess('删除成功', 'success');
                setTimeout(function () {
                    wx.navigateBack();
                }, 1500)
            } else {
                util.openMess(res.desc);
            }
        }, false)    
    }
})