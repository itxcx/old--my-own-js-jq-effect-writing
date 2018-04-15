const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
    data: {
        myData: {},
        imgs: [{ 'src': '/images/iApic01.png', 'type': 'GIDCardPoriginalpath' }, { 'src': '/images/iApic02.png', 'type': 'GIDCardOoriginalpath' }],  //, { 'src': '/images/iApic03.png', 'type': 'GIDCardOHoriginalpath' }
        live: { arr: {}, address: '', mess: '' },
        work: { arr: {}, address: '', mess: '' },
        disabled: false,
        idcard: {},
        value: [0, 0, 0],
        myAnimation: {},
        indexName: ''
    },

    onLoad: function (options) {
        let that = this,
            live = that.data.live,
            work = that.data.work,
            idcard = this.data.idcard;
        let imgs = that.data.imgs;
        let data = { CustomerId: wx.getStorageSync('CustomerId'), OrderId: wx.getStorageSync('OrderId'), 'CarId': '' };
        util.myPost(Url.basicInfo, data, function (res) {
            console.log(res);
            let myData = res.data.T_CustomerEntity;
            if (res.code == 0) {
                imgs[0].src = myData.GIDCardPoriginalpath == '' ? '/images/iApic01.png' : util.getImgUrl(myData.GIDCardPoriginalpath);
                imgs[1].src = myData.GIDCardOoriginalpath == '' ? '/images/iApic02.png' : util.getImgUrl(myData.GIDCardOoriginalpath);
                //  imgs[2].src = myData.GIDCardOHoriginalpath == '' ? '/images/iApic03.png' : util.getImgUrl(myData.GIDCardOHoriginalpath);
                let add1 = myData.GuarantorPAddress,
                    add2 = myData.GuarantorRAddress
                idcard.Value = myData.GuarantorIDcard
                idcard.Name = myData.GuarantorName

                if (add1 != '') {
                    add1 = JSON.parse(add1)
                    add2 = JSON.parse(add2)
                    live.arr = add1
                    work.arr = add2
                    live.address = add1.ProvinceName + add1.CityName + add1.DistrictName
                    work.address = add2.ProvinceName + add2.CityName + add2.DistrictName
                    live.mess = add1.Address
                    work.mess = add2.Address

                }
                that.setData({
                    myData: myData,
                    imgs: imgs,
                    live: live,
                    work: work,
                    idcard: idcard
                })
            }
        }, true)

    },
    onReady: function () {

    },
    onShow: function () {

    },
    navBack: function () {
        wx.navigateBack({
            
        })
    },
    
})