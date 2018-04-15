// pages/beforeLoan/idAuthen/idAuthen.js
const Url = require('../../../config');
const util = require('../../../utils/util.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgs: [{ id: '', url: '/images/iApic01.png' }, { id: '', url: '/images/iApic02.png'}],
        customerId: '',
        picInfo:{},
        submit: true
    },
    onLoad: function (options) {
        
    },
    onReady: function () {

    },
    onShow: function () {
        this.getPicInfo()
    },
    onHide: function () {

    },
    getPicInfo:function(){
        let that = this,
            imgs = that.data.imgs,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType': 1, 'ChildPicsType': 'Customer' }
        util.myPost(Url.GetPicsList, data, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                util.openMess(res.desc)
                console.log(mydata)
                if (mydata.length > 0) {
                    for (let i = 0; i < mydata.length; i++) {
                        mydata[i].FilePath = util.getImgUrl(mydata[i].FilePath)
                        let ChildPicsType = mydata[i].ChildPicsType
                            if (ChildPicsType==1){
                                imgs[0].url = mydata[i].FilePath
                                imgs[0].id = mydata[i].PicsId
                            }else{
                                imgs[1].url = mydata[i].FilePath
                                imgs[1].id = mydata[i].PicsId
                            }
                    }
                    that.setData({
                        imgs: imgs
                    })
                }
            } else {
                util.openMess(res.desc)
            }

        }, false)

    },
    addPic: function (e) {
        let  that=this,
         id = e.currentTarget.dataset.id,
            _type = e.currentTarget.dataset.type,
                data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': _type, 'PicPathType': 'Customer', 'CarPicId': id };
        util.choosePic(1, Url.upLoadPic, data, function (res, src) {
               that.getPicInfo()
        })
    },
    savePic: function () {
        let that = this,
            imgs = that.data.imgs,
            s = 0;
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].url != '/images/iApic01.png' && imgs[i].url != '/images/iApic02.png') {
                s = 1
            }else{
                util.openMess('您有照片未上传')
                s = 0
                break
            }
        }     

        let data = { 'OrderId': wx.getStorageSync('OrderId'), 'WSZLType': 'IsDoneSFRZ', 'WSZLValues': s }
        util.myPost(Url.IsDoneWSZL, data, function (res) {
            if (res.code == 0) {
                util.openMess('保存成功', 'success');
                setTimeout(function () {
                    wx.navigateBack({});
                }, 1500)
            } else {
                util.openMess(res.desc);
            }
        }, false) 
    }
})