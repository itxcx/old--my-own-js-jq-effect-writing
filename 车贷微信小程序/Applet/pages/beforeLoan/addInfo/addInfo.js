const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        cusPic: [
            { imgFrom: 'Customer', imgSrc: '/images/cbp_pic.png', picName: '房屋所有权证', picType: 'HousePermitoriginalpath', picId: '' },
            { imgFrom: 'Customer', imgSrc: '/images/cbp_pic.png', picName: '营业执照', picType: 'BLicenseoriginalpath', picId: '' }
        ],
        bankPic: [],
        creditPic: [],
        homePic: [],
        layer: true,
        ex_data: {
            ex_pic: '/images/ex_pic01.jpg',
            ex_from: '',
            ex_type: '',
            ex_picId: ''
        },
        camare: '/images/cbp_pic.png',
        disabled:false,
        swiper: { 'show': false, 'imgs': [], 'current':0}
    },

    onLoad: function (options) {
        let disabled=false
        if (options.disabled){
            disabled=true
        }
        this.setData({
            disabled: disabled
        })
    },
    onReady: function () {

    },
    onShow: function () {
        this.getProperty()
        this.GetBankFlowInfo()
        this.GetCreditInvestigationInfo()
        this.GetInvestigationInfo()
    },
    uploadPic: function (e) {
        let that = this,
            obj = e.currentTarget.dataset,
            cusPic = that.data.cusPic,
            ind = obj.index,
            pictype = obj.type,
            PicPathType = obj.form,
            CarPicId = obj.id,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': pictype, 'PicPathType': PicPathType, 'CarPicId': CarPicId }
        util.choosePic(1, Url.upLoadPic, data, function (res, src) {
          console.log(res)
          if (PicPathType == 'Customer') {
            cusPic[ind].imgSrc = src
            that.setData({
              cusPic: cusPic
            })
          } else {
            if (pictype == 'BankFlow') {
              that.GetBankFlowInfo();
            } else if (pictype == 'CreditInvestigation') {
              that.GetCreditInvestigationInfo();
            } else {
              that.GetInvestigationInfo(); 
            }
          }
        })       
    },
    titClose: function () {
        //动画效果 
        var animation = wx.createAnimation({});
        this.closeAnimation = animation;
        animation.height('0').step();
        this.setData({
            closeAnimation: animation.export()
        });
    },
    nextStep: function () {
        wx.navigateBack({ })
    },
    picOper: function (e) {
        let that = this,
            myCur = e.currentTarget.dataset,
            name = myCur.name,
            PicId = myCur.id,
            PicPathType = 'AdditionalInformation',
            pictype = myCur.type,
            swiperImg = [],
            swiper = that.data.swiper,
            ind =parseInt(myCur.index)
        console.log(myCur)
        wx.showActionSheet({
            itemList: ['删除', '预览'],
            success: function (res) {
                if (res.tapIndex == 1) {
                    let arr = that.data[name]
                    for (let i = 0; i < arr.length; i++) {
                        swiperImg[i] = arr[i].Original_path
                    }
                    swiper.show=true
                    swiper.imgs = swiperImg
                    swiper.current=ind
                    console.log(swiper)
                    that.setData({
                        swiper: swiper
                    })
                } else {
                    let data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': pictype, 'PicPathType': PicPathType, 'PicId': PicId }
                    util.myPost(Url.RemovePicImage, data, function (res) {
                        if (res.code == 0) {
                            console.log(res.des)
                            util.openMess(res.desc, 'success')
                            if (pictype == 'BankFlow') {
                                that.GetBankFlowInfo();

                            } else if (pictype == 'CreditInvestigation') {
                                that.GetCreditInvestigationInfo();

                            } else {
                                that.GetInvestigationInfo();
                            }
                        } else {
                            util.openMess(res.desc)
                        }
                    }, false)
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    closeSwiper: function () {
        let swiper = this.data.swiper
        swiper.show=false
        swiper.imgs=[]
        swiper.current=0
        this.setData({
            swiper: swiper
        })
    },
    GetBankFlowInfo: function () {
        let that = this,
            data = { OrderId: wx.getStorageSync('OrderId'), CustomerId: wx.getStorageSync('CustomerId'), CarId: wx.getStorageSync('CarId') },
            bankPic = that.data.bankPic
        util.myPost(Url.GetBankFlowInfo, data, function (res) {
            let mydata = res.data
            if (res.code == 0) {
                for (let i = 0; i < mydata.length; i++) {
                    mydata[i].Original_path = util.getImgUrl(mydata[i].Original_path)
                }
            } else if (res.code == 201) {
                mydata = []
            }
            that.setData({
                bankPic: mydata
            })
        }, true)
    },
    GetCreditInvestigationInfo: function () {
        let that = this,
            data = { OrderId: wx.getStorageSync('OrderId'), CustomerId: wx.getStorageSync('CustomerId'), CarId: wx.getStorageSync('CarId') },
            creditPic = that.data.creditPic
        util.myPost(Url.GetCreditInvestigationInfo, data, function (res) {
            let mydata = res.data
            if (res.code == 0) {
                for (let i = 0; i < mydata.length; i++) {
                    mydata[i].Original_path = util.getImgUrl(mydata[i].Original_path)
                }
            } else if (res.code == 201) {
                mydata = []
            }
            that.setData({
                creditPic: mydata
            })
        }, true)
    },
    GetInvestigationInfo: function () {
        let that = this,
            data = { OrderId: wx.getStorageSync('OrderId'), CustomerId: wx.getStorageSync('CustomerId'), CarId: wx.getStorageSync('CarId') },
            homePic = that.data.homePic
        util.myPost(Url.GetInvestigationInfo, data, function (res) {
            let mydata = res.data
            if (res.code == 0) {
                for (let i = 0; i < mydata.length; i++) {
                    mydata[i].Original_path = util.getImgUrl(mydata[i].Original_path)
                }
            } else if (res.code == 201) {
                mydata = []
            }
            that.setData({
                homePic: mydata
            })
        }, true)
    },
    navBack:function(){
        wx.navigateBack()
    },//获取财产证明  
    getProperty:function(){
            let that = this,
                cusPic = that.data.cusPic,
                data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType':35, 'ChildPicsType': 'Customer' }
            util.myPost(Url.GetPicsList, data, function (res) {
                if (res.code == 0) {
                    let mydata = res.data
                    for(let i in mydata){
                        let PicsType = mydata[i].ChildPicsType
                        if (PicsType==4){
                            cusPic[0].imgSrc = util.getImgUrl(mydata[i].FilePath)
                            cusPic[0].picId = mydata[i].PicsId
                        } else if (PicsType == 5){
                            cusPic[1].imgSrc = util.getImgUrl(mydata[i].FilePath)
                            cusPic[1].picId = mydata[i].PicsId
                        }
                    }
                    that.setData({
                        cusPic: cusPic
                    })
                } 

            }, true)

    }
    
})