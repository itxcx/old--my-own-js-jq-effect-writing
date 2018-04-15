const Url = require('../../../config.js');
const util = require('../../../utils/util.js');

Page({
    data: {
        layer: true,
        install: false,
        ex_pic: '/images/ex_pic01.jpg',
        list: [],
        imgUrls: { show: false, img: [], current:0 },
        keylist: [],
        boxAnimation: {},
        GPSnum: [{ 'total': 0, 'over': 0 }, { 'total': 0, 'over': 0 }],   //0 有线   1 无线
        operMenu: []
    },
    onLoad: function (options) {
        let location = options.location,
         operMenu = ['定位', '预览', '修改', '删除']
        if (location){
             operMenu=['定位', '预览']
             location=true
         }else{
            location = false
         }
         this.setData({
             operMenu: operMenu,
             location: location
         })
    },
    onReady: function () {

    },
    onShow: function () {
        this.getBindList();
        this.getGpsNum();
        this.getKeyPic();
    },
    bindGPS: function () {      
      wx.navigateTo({
        url: '/pages/Gps/Gpsbind/Gpsbind',
      })        
    },
    getGpsNum:function(){
        let that = this,
            GPSnum = that.data.GPSnum
        util.myPost(Url.GetGPSNum, { "OrderId": wx.getStorageSync("OrderId") }, function (res) {
            if (res.code == 0) {
                let mydata = res.data

                GPSnum = [{ 'total': mydata.WGPSNum, 'over': mydata.CurrentWGPSNum }, { 'total': mydata.WlGPSNum, 'over': mydata.CurrentWlGPSNum }]
                that.setData({
                    GPSnum: GPSnum
                })

            } else {
                util.openMess(res.desc)
            }
        }, true)
    },
    operGps: function (e) {
        let id = e.currentTarget.dataset.id,
            ind = parseInt(e.currentTarget.dataset.index),
            num = e.currentTarget.dataset.num,
            that = this,
            list = that.data.list,
            imgs = list[ind].GPSPicsList,
            GPSnum = that.data.GPSnum,
            operMenu = that.data.operMenu,
            imgUrls = that.data.imgUrls;
        wx.showActionSheet({
            itemList: operMenu,
            success: function (res) {
                if (res.tapIndex == 2) {
                    wx.navigateTo({
                        url: '../Gpsbind/Gpsbind?id=' + id,
                    })
                } else if (res.tapIndex == 3) {
                    util.myPost(Url.RemoveGPSInfo, {'GPSId':id}, function (res) {
                        console.log(res)
                        if (res.code == 0) {
                            that.getBindList();
                            that.getGpsNum()
                            util.openMess(res.desc, 'success')
                        } else {
                            util.openMess(res.desc)
                        }
                    }, false)
                 }else if (res.tapIndex == 0) {
                    wx.navigateTo({
                        url: '../Gpsmap/Gpsmap?GPSnum=' + num,
                    })
                } else if (res.tapIndex == 1) {
                    imgUrls.show = true
                    imgUrls.img=[]
                    for (let i = 0; i < imgs.length; i++) {
                        imgUrls.img[i] = imgs[i].FilePath
                    }
                    that.setData({
                        imgUrls: imgUrls,
                    })
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    operKey: function (e) {
        let id = e.currentTarget.dataset.id,
            that = this,
            ind = e.currentTarget.dataset.index,
            keylist = that.data.keylist,
            imgUrls = that.data.imgUrls;
            wx.showActionSheet({
            itemList: ['删除', '预览'],
            success: function (res) {
                if (res.tapIndex == 0) {
                    util.myPost(Url.RemovePicImage, { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': 'GPSInstallB', 'PicPathType': 'GPSInstall', 'PicId': id }, function (res) {
                        console.log(res)
                        if (res.code == 0) {
                            that.getKeyPic();
                            util.openMess(res.desc, 'success')
                        } else {
                            util.openMess(res.desc)
                        }
                    }, false)
                } else if (res.tapIndex == 1) {
                    imgUrls.show = true;
                    imgUrls.img=[];
                    for (let i = 0; i < keylist.length;i++){
                        imgUrls.img[i] = keylist[i].url
                    }
                    imgUrls.current = ind
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
    },
    getBindList: function () { 
        let that = this,
            list = [], m = 0, n = 0
        
        util.myPost(Url.GetGPSInfoList, { 'OrderId': wx.getStorageSync('OrderId') }, function (res) {
            if (res.code == 0) {
                let GPSnum = that.data.GPSnum
                let mydata = res.data.GetGPSList
                let len = mydata.length
                console.log(mydata)
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        for (let j = 0; j < mydata[i].GPSPicsList.length; j++) {
                            mydata[i].GPSPicsList[j].FilePath = util.getImgUrl(mydata[i].GPSPicsList[j].FilePath)
                        }
                        list[i] = mydata[i]
                    }
                } else {
                    list = []
                }
                that.setData({
                    list: list,
                })
            } else {
                util.openMess(res.desc)
            }
        }, true)

    },
    addPic: function (e) {
        //替换图片
        //动画效果 

        this.boxAnimation = util.animation;
        util.animation.bottom('0rpx').step();
        this.setData({
            layer: false,
            boxAnimation: util.animation.export()
        });
    },
    layerHide: function () {
        this.boxAnimation = util.animation;
        util.animation.bottom('-700rpx').step();
        this.setData({
            layer: true,
            boxAnimation: util.animation.export()
        });
    },
    uploadPic: function () {
        var  that = this,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicPathType': 'GPSInstall', 'pictype': 'GPSInstallB', 'CarPicId':'' };
        //上传
        util.choosePic(1, Url.upLoadPic, data, function (res, url) {
            console.log(res)
            that.layerHide()
            that.getKeyPic()
        })

    },
    getKeyPic:function(){
        let that = this,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType': 'GPSInstall', 'ChildPicsType':'GPSInstallB'},
        keylist=[]
        util.myPost(Url.GetPicsList,data,function(res){
            if(res.code==0){
                let mydata=res.data
                for (let i = 0; i < mydata.length;i++){
                    if (mydata[i].PicsType==8){
                        let obj=new Object();
                        obj.url = util.getImgUrl(mydata[i].FilePath)
                        obj.picid = mydata[i].PicsId
                        keylist.push(obj)
                    }
                }
            }else{
                keylist=[]
            }
            that.setData({
                keylist: keylist
            })
        },true)
    },
    bindOver:function(){
        let that = this, list = that.data.list,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'OpenId': wx.getStorageSync('wxOpenID')}
            if(list.length>0){
                util.myPost(Url.SaveGPSInstallDone, data, function (res) {
                    console.log(res);
                    wx.navigateBack({
                      
                    })
                }, true)
            }else{
                util.openMess('请绑定GPS')
            }
      
    },
})