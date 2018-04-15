const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
    data: {
        MortgagePic: [],
        layer: true,
        detail: false,
        boxAnimation: {},
        closeAnimation: {},
        layer: true,
        camare: '/images/cbp_pic.png',
        picOper: ['修改', '预览'],
        ex_pic: '/images/ex_pic01.jpg',
        swiper: false,
        swiperImg: [],
        swiperind: 0
    },
    onLoad: function (options) {
       
    },
    onReady: function () {

    },
    onShow: function () {
        this.getPicList()
    },
    getPicList: function () {
        let that = this, MortgagePic = [], swiperImg = [],
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType': 'Mortgage', 'ChildPicsType': 'Mortgage' }
        util.myPost(Url.GetPicsList, data, function (res) {  //GetPicsList
            if (res.code == 0) {
                let mydata = res.data
                for (let i = 0; i < mydata.length; i++) {
                    if (mydata[i].PicsType == 28) {
                        let obj = new Object(),
                            url = util.getImgUrl(mydata[i].FilePath);
                        obj.url = url
                        obj.picid = mydata[i].PicsId
                        MortgagePic.push(obj)
                        swiperImg.push(url)
                    }
                }
            } else {

            }
            that.setData({
                MortgagePic: MortgagePic,
                swiperImg: swiperImg
            })
        }, true)
    },
    uploadBtn: function (e) {
        let obj = e.currentTarget.dataset,
            index = obj.index
        this.setData({
            uploadIndex: index,
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
    boxPop: function (e) {
        //替换图片
        let obj = e.currentTarget.dataset

   
        //动画效果 
        var animation = wx.createAnimation({});
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
    picOper: function (e) {
        let that = this,
            myCur = e.currentTarget.dataset,
            PicId = myCur.id,
            ind = myCur.index,
            swiperImg = [],
            picOper = that.data.picOper
        wx.showActionSheet({
            itemList: picOper,
            success: function (res) {
                console.log(res)
                if (res.tapIndex == 1) {
                    that.setData({
                        swiper: true,
                        swiperind: ind
                    })
                } else {
                    let data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': 'Mortgage', 'PicPathType': 'Mortgage', 'CarPicId': PicId }
                    util.choosePic(1, Url.upLoadPic, data, function (res, src) {  // Url.upLoadPic
                        that.getPicList()
                        that.layerHide();
                    })
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    closeSwiper: function () {
        this.setData({
            swiper: false
        })
    },
    uploadPic: function () {
        let that = this,
            cusPic = that.data.cusPic,
            ind = that.data.uploadIndex,
            ex_data = that.data.ex_data,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': 'Mortgage', 'PicPathType': 'Mortgage', 'CarPicId': '' }
        util.choosePic(1, Url.upLoadPic, data, function (res, src) {  // Url.upLoadPic
            that.getPicList()
            that.layerHide();
        })

    },
    nextStep:function(){
        let imgs = this.data.swiperImg
        if(imgs.length>0){
            let data = { 'OrderId': wx.getStorageSync('OrderId'),'OpenId': wx.getStorageSync('wxOpenID')}
            console.log(data)
            util.myPost(Url.SaveMorDone, data,function(res){
                console.log(res);
                if(res.code==0){
                    wx.navigateBack({})
                }
            },true)
            
        }else{
            util.openMess('请上传图片')
        }
       
    }
})