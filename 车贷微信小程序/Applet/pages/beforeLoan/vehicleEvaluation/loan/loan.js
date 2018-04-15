var util = require('../../../../utils/util.js')
var Url = require('../../../../config.js')
Page({
    data: {
        star_h: '/images/star_h.png',
        star_y: '/images/star_y.png',
        stars: [false, false, false, false, false],
        carMess: []
    },

    onLoad: function (options) {
        let orderId = options.OrderId, that = this, data = { OrderId: orderId };

        util.myPost(Url.GetIntentionLogLoad, data, function (res) {
            let carMess = res.data
            that.setData({
                carMess: carMess
            })

        }, true);

    },
    chooseStar: function (e) {

        let stars = this.data.stars
        let index = parseInt(e.target.dataset.index)
        if (stars[index]) {
            for (let i = 0; i < index; i++) {
                stars[i] = true
            }
            for (let i = index; i < 5; i++) {
                stars[i] = false
            }
        } else {
            for (let i = 0; i <= index; i++) {
                stars[i] = true
            }
            for (let i = index + 1; i < 5; i++) {
                stars[i] = false
            }
        }
        this.setData({
            stars: stars
        })
    },
    submitForm: function (e) {

        let that = this,
            text = e.detail.value.remarks,
            star = that.data.stars,
            openId = wx.getStorageSync('wxOpenID'),
            orderId = that.data.carMess.OrderId,
            custemId = that.data.carMess.CustomerId,
            starNum=0;

        for (let i = 0; i < star.length; i++) {
            if (star[i]) {
                starNum++
            }
        }
        let data={
            'OpenId': openId,
            'CustomerId': custemId,
            'OrderId': orderId,
            'IntentionLevel': starNum,
            'Remark': text
        }
        util.myPost(Url.SubmitIntentionLog, data, function (res) {
            if(res.code==0){
                util.openMess(res.desc,'success')
                setTimeout(function () {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }, 1500)
            }else{
                util.openMess(res.desc)
            }

        }, false);

    }
})