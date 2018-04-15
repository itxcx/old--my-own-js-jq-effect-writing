const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
    data: {
        cbp_pic: [
            { imgSrc: '/images/cbp_pic.png', picName: '正前方', CarPicId: '', picType: 'Front' },
            { imgSrc: '/images/cbp_pic.png', picName: '前左', CarPicId: '', picType: 'FrontLeft' },
            { imgSrc: '/images/cbp_pic.png', picName: '前右', CarPicId: '', picType: 'FrontRight' },
            { imgSrc: '/images/cbp_pic.png', picName: '正后', CarPicId: '', picType: 'After' },
            { imgSrc: '/images/cbp_pic.png', picName: '后左', CarPicId: '', picType: 'AfterLeft' },
            { imgSrc: '/images/cbp_pic.png', picName: '后右', CarPicId: '', picType: 'AfterRight' },
            { imgSrc: '/images/cbp_pic.png', picName: '天窗', CarPicId: '', picType: 'SkyLight' },
            { imgSrc: '/images/cbp_pic.png', picName: '中控', CarPicId: '', picType: 'CenterPanel' },
            { imgSrc: '/images/cbp_pic.png', picName: '码表', CarPicId: '', picType: 'Meter' },
            { imgSrc: '/images/cbp_pic.png', picName: '铭牌', CarPicId: '', picType: 'NamePlate' },
            { imgSrc: '/images/cbp_pic.png', picName: '发动机舱', CarPicId: '', picType: 'EngineBay' },
            { imgSrc: '/images/cbp_pic.png', picName: '人车合影', CarPicId: '', picType: 'ManCar' }
        ],
        uploadPics: [],
        boxAnimation: {},
        layer: true,
        ex_pic: '',
        ex_type: '',
        ex_id: '',
        uploadIndex: 0
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
            orderId = wx.getStorageSync('OrderId');
        data.OrderId = orderId
        data.PicsType = 16
        data.ChildPicsType = ''
        console.log(data)
        util.myPost(Url.GetPicsList, data, function (res) {
            if (res.code == 0) {
                console.log(res.data)
                let mydata = res.data,
                    cbp_pic = that.data.cbp_pic,
                    src = '', ind = 0, picid = '';
                for (let i = 0; i < mydata.length; i++) {
                    if (mydata[i].FilePath != '') {
                        src = util.getImgUrl(mydata[i].FilePath)
                    }
                    ind = mydata[i].ChildPicsType - 1
                    picid = mydata[i].CarPicId
                    if (cbp_pic[ind]) {
                        cbp_pic[ind].imgSrc = src
                        cbp_pic[ind].CarPicId = picid
                    }

                }
                that.setData({
                    cbp_pic: cbp_pic
                })
            }


        }, true)
    },
    boxPop: function (e) {
        //替换图片
        let index = e.currentTarget.dataset.index,
            ex_type = e.currentTarget.dataset.type,
            cbp_pic = this.data.cbp_pic,
            picid = e.currentTarget.dataset.id,
            imgsrc = '', ex_id = ''
        imgsrc = Url.picUrl + '/carPics/' + ex_type + '.png'
        ex_id = (cbp_pic[index].CarPicId == "undefined") ? id : cbp_pic[index].CarPicId
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
            CarPicId = that.data.ex_id == undefined ? '' : that.data.ex_id,
            cbp_pic = that.data.cbp_pic,
            index = that.data.uploadIndex,
            _type = that.data.ex_type,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': _type, 'PicPathType': 'CarPicInfo', 'CarPicId': CarPicId }
            console.log(data)
        util.choosePic(1, Url.upLoadPic, data, function (res, url) {
            console.log(res)
            let pic = JSON.parse(res.data)
            if (pic.code == 0) {
                util.openMess(pic.desc, 'success')
            } else {
                util.openMess(pic.desc)
            }
            that.layerHide()
            console.log(index)
            cbp_pic[index].imgSrc = url
            that.setData({
                cbp_pic: cbp_pic
            })
        })
    },
    nextStep: function () {
        let cbp_pic = this.data.cbp_pic, go = false;
        for (let i = 0; i < cbp_pic.length; i++) {
            let src = cbp_pic[i].imgSrc
            if (src == '/images/cbp_pic.png') {
                util.openMess('车身照片不完整');
                go = false
                break;
            } else {
                go = true
            }
        }
        if (go) {
            wx.navigateTo({
                url: '/pages/beforeLoan/certificate/certificate',
            })
        }

    },
})