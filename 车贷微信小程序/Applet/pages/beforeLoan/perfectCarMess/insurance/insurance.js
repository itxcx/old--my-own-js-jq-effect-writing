const Url = require('../../../../config.js');
const util = require('../../../../utils/util.js');
Page({

    data: {
        ins: [{ name: '机动车责任事故强制保险单', check: false }, { name: '车损险', check: false }, { name: '盗抢险', check: false }, { name: '第三方责任险', check: false }, { name: '不计免赔', check: false }, { name: '其他', check: false }],
        checked: '',
        checkvalue: [],
        textarea: false,
        text: ''
    },
    onLoad: function (options) {
        let that = this, ins = that.data.ins, checked=[];
        wx.showLoading({
          title: '加载中...',
        });        
        wx.getStorage({
            key: 'insurance',
            success: function (res) {
                console.log(res)
                for (let i = 0; i < ins.length; i++) {
                    for (let j = 0; j < res.data.ins.length; j++) {
                        if (ins[i].name == res.data.ins[j]) {
                            ins[i].check = true
                            checked.push(i+1)
                        }
                    }
                }
                console.log(checked)
                if (res.data.InsuranceOtherType != '' && res.data.InsuranceOtherType != null) {
                    let ind = ins.length
                    ins[ind-1].check = true
                    that.setData({
                        textarea: true,
                        text: res.data.InsuranceOtherType
                    })
                    console.log(checked)
                    checked.push( ind)
                    console.log(checked)
                }
                checked=checked.join(",");
                console.log(checked)
                that.setData({
                    ins: ins,
                    checked: checked
                }, function () { wx.hideLoading();})
            },            
        })
    },
    onReady: function () {

    },
    onShow: function () {

    },
    checkboxChange: function (e) {
        let checked = e.detail.value;
        let res = checked.indexOf('其他'), textarea = false;
        let strCheck = checked.toString();
        let tt = strCheck.replace(/机动车责任事故强制保险单/, '1').replace(/车损险/, '2').replace(/盗抢险/, '3').replace(/第三方责任险/, '4').replace(/不计免赔/, '5').replace(/其他/, '6');
        if (res >= 0) {
            textarea = true
        } else {
            textarea = false;
        }

        this.setData({
            checked: tt,
            textarea: textarea,
            checkvalue: checked
        })
    },
    formsubmit: function (e) {
        let that = this;
        let data = {},
            CarId = wx.getStorageSync('CarId');
        if (that.data.textarea) {
            let area = e.detail.value.text
            if (area == '') {
                util.openMess('请输入其他')
                return false
            } else {
                data = { 'InsuranceOtherType': area, 'InsurancePolicy': that.data.checked, 'CarId': wx.getStorageSync('CarId') }
            }

        } else {
            data = { 'InsurancePolicy': that.data.checked, 'CarId': CarId, 'InsuranceOtherType': '' }
        }
        console.log(data)
        util.myPost(Url.SaveInsurancePolicyInfo, data, function (res) {
            if (res.code == 0) {
                util.openMess('提交成功', 'success');
                setTimeout(function () {
                    wx.navigateBack();
                }, 1500)
            } else {
                util.openMess(res.desc);
            }
        }, false)

    }
})