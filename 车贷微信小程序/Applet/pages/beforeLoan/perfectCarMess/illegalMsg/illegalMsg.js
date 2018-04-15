
const Url = require('../../../../config.js');
const util = require('../../../../utils/util.js');
Page({

    data: {
        illegal: { 'illegal': false, 'mess': { 'IllegalDeduction': '', 'IllegalFine': '', 'UntreatedNum': '' }}
    },
    onLoad: function (options) {
        let that = this
        wx.getStorage({
            key: 'illegal',
            success: function (res) {
                let myData = res.data
                console.log(myData)
                that.setData({
                    illegal: myData
                })
            }
        })
    },
    onReady: function () {

    },
    onShow: function () {

    },
    switchChange: function (e) {
        let ill = this.data.illegal
        ill.illegal = e.detail.value
        ill.mess = { 'IllegalDeduction': '', 'IllegalFine': '', 'UntreatedNum': '' }
            this.setData({
                illegal: ill
            })
    },
    formSubmit: function (e) {
        let data = {},
            that = this,
            val = e.detail.value,
            CarId = wx.getStorageSync('CarId'),
            points = val.points,
            fine = val.fine,
            handle = val.handle;
      

        if (val.switch){
            data = { 'CarId': CarId, 'IllegalDeduction': points, 'IllegalFine': fine, 'UntreatedNum': handle}
            if (points == '' || fine == '' || handle == '') {
                util.openMess('请填入违章信息');
                return false;
            }
        }else{
            data = { 'CarId': CarId,'IllegalDeduction': 0, 'IllegalFine': 0, 'UntreatedNum': '' }
        }
        util.myPost(Url.SaveIllegalInfo, data,function (res) {
            if (res.code == 0) {
                console.log(res)
                util.openMess('提交成功', 'success');
                setTimeout(function () {
                    wx.navigateBack();
                }, 1500)
            } else {
                util.openMess(res.desc);
            }
        }, false);
    }
})