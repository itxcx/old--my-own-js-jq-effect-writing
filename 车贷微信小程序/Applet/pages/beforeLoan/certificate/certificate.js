const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({

    data: {
        cbp_pic: [
            { imgSrc: '/images/cbp_pic.png', picName: '行驶证', CarPicId: '', picType: 'DrivingLicense' },
            { imgSrc: '/images/cbp_pic.png', picName: '违章查询', CarPicId: '', picType: 'Illegal' },
            { imgSrc: '/images/cbp_pic.png', picName: '驾驶证', CarPicId: '', picType: 'DriverLicense' },
            { imgSrc: '/images/cbp_pic.png', picName: '车辆保险单', CarPicId: '', picType: 'CarPolicy' }
        ],
        PropertyRight: [],  //{ imgSrc: '/images/cbp_pic.png', picName: '产权证', CarPicId: '', picType: 'PropertyRight' }
        boxAnimation: {},
        layer: true,
        ex_pic: '',
        ex_type: '',
        ex_id: '',
        uploadIndex: 0,
        imgUrls: { show: false, img: [], current:0 }
    },
    onLoad: function (options) {

    },
    onReady: function () {

    },
    onShow: function () {
        this.getPicInfo();
    },
    getPicInfo: function () {
        let that = this,
            data = {},
            orderId = wx.getStorageSync('OrderId'),
            customerId = wx.getStorageSync('CustomerId'),
            imgUrls = that.data.imgUrls,
            carId = wx.getStorageSync('CarId');
        data.OrderId = orderId
        util.myPost(Url.GetCarPicInfo, data, function (res) {
            let mydata = res.data,
                cbp_pic = that.data.cbp_pic,
                PropertyRight = [],
                showImg = [],
                src = '', ind = 0, picid = '';
            for (let i = 0; i < mydata.length; i++) {
                if (mydata[i].CarPicType == 13) {
                    cbp_pic[0].imgSrc = util.getImgUrl(mydata[i].Original_path)
                    cbp_pic[0].CarPicId = mydata[i].PicId
                } else if (mydata[i].CarPicType == 15) {
                    cbp_pic[1].imgSrc = util.getImgUrl(mydata[i].Original_path)
                    cbp_pic[1].CarPicId = mydata[i].PicId
                } else if (mydata[i].CarPicType == 16) {
                    cbp_pic[2].imgSrc = util.getImgUrl(mydata[i].Original_path)
                    cbp_pic[2].CarPicId = mydata[i].PicId
                } else if (mydata[i].CarPicType == 19) {
                    cbp_pic[3].imgSrc = util.getImgUrl(mydata[i].Original_path)
                    cbp_pic[3].CarPicId = mydata[i].PicId
                }
                if (mydata[i].CarPicType == 14) {
                    let obj = new Object()
                    obj.imgSrc = util.getImgUrl(mydata[i].Original_path)
                    obj.CarPicId = mydata[i].PicId
                    obj.picName = '车辆登记证书'
                    obj.picType = 'PropertyRight'
                    PropertyRight.push(obj)
                    showImg.push(util.getImgUrl(mydata[i].Original_path))
                }
            }
            imgUrls.img = showImg
            that.setData({
                cbp_pic: cbp_pic,
                PropertyRight: PropertyRight,
                imgUrls: imgUrls
            })
        }, true)
    },
    boxPop: function (e) {
        //替换图片
        let index = e.currentTarget.dataset.index,
            ex_type = e.currentTarget.dataset.type,
            cbp_pic = this.data.cbp_pic,
            imgsrc = '', ex_id = ''
        imgsrc = Url.picUrl+'/carPics/' + ex_type + '.png'
        ex_id = cbp_pic[index].CarPicId
        this.setData({
            uploadIndex: index,
            ex_pic: imgsrc,
            ex_id: ex_id,
            ex_type: ex_type
        });
        //动画效果 
        var animation = wx.createAnimation({

        });
        this.boxAnimation = animation;
        animation.bottom('0rpx').step();
        this.setData({
            layer: false,
            boxAnimation: animation.export()
        });
    },
    layerHide: function () {
        var animation = wx.createAnimation({

        });
        this.boxAnimation = animation;
        animation.bottom('-700rpx').step();
        this.setData({
            layer: true,
            boxAnimation: animation.export()
        });
    },
    uploadPic: function () {
        let that = this,
            CarPicId = that.data.ex_id,
            cbp_pic = that.data.cbp_pic,
            index = that.data.uploadIndex,
            _type = that.data.ex_type,
            OrderId = wx.getStorageSync('OrderId'),
            data = { 'OrderId': OrderId, 'pictype': _type, 'PicPathType': 'CarPicInfo', 'CarPicId': CarPicId }
        util.choosePic(1, Url.upLoadPic, data, function (res, url) {
            let pic = JSON.parse(res.data)
            if (pic.code == 0) {
                util.openMess(pic.desc, 'success')
                that.getPicInfo()
            } else {
                util.openMess(pic.desc)
            }
            that.layerHide()
            if (_type =='PropertyRight'){
             
            }else{
                cbp_pic[index].imgSrc = url
                that.setData({
                    cbp_pic: cbp_pic
                })
            }
        })
    },
    nextStep: function () {
        let cbp_pic = this.data.cbp_pic, status = 0, Info = {},
            OrderId = wx.getStorageSync('OrderId'),
            PropertyRight = this.data.PropertyRight
        for (let i = 0; i < cbp_pic.length; i++) {
            let src = cbp_pic[i].imgSrc
            if (src == '/images/cbp_pic.png') {
                util.openMess('车身照片不完整');
                status = 0
                break;
            } else {
                status = 1
            }
        }
        if (PropertyRight.length>0){
            status=1
        }else{
            status=0
        }
        Info = { 'OrderId': OrderId, 'WSZLType': 'IsDoneCSZP', 'WSZLValues': status }
        util.myPost(Url.IsDoneWSZL, Info, function (res) {
            if (res.code == 0) {
                util.openMess(res.desc, 'success')
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 2
                    })
                }, 1500)
            } else {
                util.openMess(res.desc)
            }
        }, false)
    },
    PropertyRightPic: function (e) {
        //替换图片
        let ex_type = e.currentTarget.dataset.type,
            imgsrc = Url.picUrl + '/carPics/'  + ex_type + '.png',
            ex_id = e.currentTarget.dataset.id
        this.setData({
            ex_pic: imgsrc,
            ex_id: ex_id,
            ex_type: ex_type
        });
        //动画效果 
        var animation = wx.createAnimation({

        });
        this.boxAnimation = animation;
        animation.bottom('0rpx').step();
        this.setData({
            layer: false,
            boxAnimation: animation.export()
        });
    },
    operPic: function (e) {
        let that = this,
            ind = e.currentTarget.dataset.index,
            id = e.currentTarget.dataset.id,
            imgUrls = that.data.imgUrls
        wx.showActionSheet({
            itemList: ['删除', '预览'],
            success: function (res) {
                if (res.tapIndex == 0) {
                    util.myPost(Url.RemovePicImage, { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': 'PropertyRight', 'PicPathType': 'CarPicInfo', 'PicId': id }, function (res) {
                        if (res.code == 0) {
                            that.getPicInfo();
                            util.openMess(res.desc, 'success')
                        } else {
                            util.openMess(res.desc)
                        }

                    }, false)
                } else {
                    imgUrls.show = true;
                    that.setData({
                        imgUrls: imgUrls
                    })
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    movePreview: function () {
        let that = this,
            imgUrls = that.data.imgUrls;
        imgUrls.show = false;
        that.setData({
            imgUrls: imgUrls
        })
    }
})