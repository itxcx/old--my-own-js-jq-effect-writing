const Url = require('../../../config.js')
const util=require('../../../utils/util.js')
Page({
    data: {
        layer: true,
        ex_pic: '/images/ex_pic01.jpg',
        boxAnimation: {},
        imgUrls: { show: false, img: [], current:0},
        chooseImgs:[],
        GPSnum: [{ 'total': 0, 'over': 0 }, { 'total': 0, 'over': 0 }],   //0 有线   1 无线
        GPSinfo:{},
        GPSPics:[],
        swich:1,
        GPSId:'',
        GPSStatus:0,
        UserId:''
    },
    onLoad: function (options) {
        let that = this, GPSId = '', GPSinfo={}
        if (options.id){
            GPSId = options.id
            that.setData({
                GPSId: GPSId,
                GPSedit:true
            })
            this.getGPSInfo()
        }else{
            that.setData({
                GPSId: GPSId,
                GPSedit:false
            })
        }
    },
    onReady: function () {
       
    },
    onShow: function () {
        this.getGpsNum()
    },
    getGpsNum: function () {
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
    getNum:function(e){
        let val=e.detail.value,that=this
        util.myPost(Url.GetFunDwGetCheZhdServiceApi, {'GPSNum':val},function(res){
           if(res.code==0){
               let GPSStatus = res.data[0].DWZX
               util.openMess('获取状态中')
               that.setData({
                   GPSStatus: GPSStatus
               })
           }
        },false)
    },
    getGPSInfo:function(){
        let that = this, GPSinfo = {}, imgUrls = that.data.imgUrls, GPSPics=[]
        util.myPost(Url.GetGPSInfoList, { "OrderId": wx.getStorageSync("OrderId"), 'GPSId': that.data.GPSId}, function (res) {
            if (res.code == 0) {
                GPSinfo = res.data.GetGPSList
                imgUrls.img = []
                if (GPSinfo.length>0){
                    GPSinfo = GPSinfo[0]
                    let GPSPicsList = GPSinfo.GPSPicsList
                    for (let i = 0; i < GPSPicsList.length; i++) {
                        GPSPicsList[i].FilePath = util.getImgUrl(GPSPicsList[i].FilePath)
                        imgUrls.img[i] = GPSPicsList[i].FilePath
                    }
                   
                    that.setData({
                        GPSinfo: GPSinfo,
                        imgUrls: imgUrls,
                        GPSPics: GPSPicsList,
                        GPSStatus: GPSinfo.GPSStatus
                    })
                }
                
              
               
            } else {
                util.openMess(res.desc)
            }
        }, true)
    },
    swichChange:function(e){
        let val = e.detail.value, swich
          if(val){
              swich=2
          }else{
              swich=1
          }
          this.setData({
              swich: swich
          })
    },
    submitform:function(e){
        let that=this,
        val = e.detail.value,
        GPSNum = val.GPSNum,
        SIMNum = val.SIMNum,
        Description = val.Description,
        GPSinfo = that.data.GPSinfo,
        GPSedit = that.data.GPSedit,
        chooseImgs = that.data.chooseImgs,
        imgUrls = that.data.imgUrls,
        data = {}, GPSId='';
        if (GPSNum==''){
            util.openMess('请输入GPS编号')
            return false
        }
        if (SIMNum == '') {
            util.openMess('请输入SIM卡号')
            return false
        }
        if (GPSedit) {
            GPSId = GPSinfo.GPSId
            chooseImgs = imgUrls.img
        } else {
            GPSId = ''
        }
        if (chooseImgs.length < 1 && imgUrls.img.length<1){
            util.openMess('请选择位置照片')
            return false
        }
    
        data = { 'OrderId': wx.getStorageSync('OrderId'), 'GPSId': GPSId, 'GPSNum': GPSNum, 'SIMNum': SIMNum, 'GPSType': that.data.swich, 'GPSStatus': that.data.GPSStatus, 'Description': Description }
        util.myPost(Url.SaveGPSInfo,data,function(res){
            if(res.code==0){
               that.getGpsNum()
                that.setData({
                    GPSId: res.data.GPSId,
                })
              //  that.changeStatus();
                that.subUploadPic();
                wx.showModal({
                    title: 'GPS绑定成功',
                    content: "",
                    confirmText: '继续绑定',
                    cancelText: '返回列表',
                    success: function (res) {
                        imgUrls.img=[]
                        if (res.confirm) {
                             that.setData({
                                 GPSinfo:{},
                                 swich:1,
                                 GPSPics:{},
                                 chooseImgs:[],
                                 GPSedit:false,
                                 imgUrls: imgUrls
                             })
                        } else if (res.cancel) {
                            wx.navigateBack({})
                        }
                    }
                })
            }
        },true)
    },
    // changeStatus:function(){
    //     let that=this,
    //         data = { 'OrderId': wx.getStorageSync('OrderId'), 'OpenId': wx.getStorageSync('wxOpenID') }
    //     console.log(data)
    //     util.myPost(Url.SaveGPSInstallDone, data,function(res){
    //           console.log(res)
    //     },true)
    // },
    addPic: function (e) {
        //替换图片
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
        var animation = wx.createAnimation({});
        this.boxAnimation = animation;
        animation.bottom('-700rpx').step();
        this.setData({
            layer: true,
            boxAnimation: animation.export()
        });
    },
    uploadPic: function () {
        var index = this.data.uploadIndex, 
         that = this,
         data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicPathType': 'GPSInstall', 'pictype': 'GPSInstallA', 'CarPicId': that.data.GPSId};
        //上传
        util.choosePic(1,Url.upLoadPic,data,function(res,url){
            //that.layerHide()
            that.getGPSInfo()
        })
    },
    subChoosePic: function () {
        var index = this.data.uploadIndex,
            that = this,
            imgUrls = that.data.imgUrls,
            chooseImgs = that.data.chooseImgs

        //上传
        wx.chooseImage({
            count: 1,  //最多可以选择的图片总数  
            sizeType: ['compressed'], //压缩--- original (原图)
            sourceType: ['camera'], // 照相机---album (相册)
            success: function (res) {
                let FilePaths = res.tempFilePaths
               chooseImgs.push(FilePaths[0])
               imgUrls.img = chooseImgs
                that.setData({
                    chooseImgs: chooseImgs,
                    imgUrls: imgUrls
                })
                //that.layerHide()
            }
        })
    },
    subUploadPic: function () {
        let uploadImgCount = 0, that = this,
            openId = wx.getStorageSync('wxOpenID'),
            token = wx.getStorageSync('Token'),
            chooseImgs = that.data.chooseImgs,
            data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicPathType': 'GPSInstall', 'pictype': 'GPSInstallA', 'CarPicId': that.data.GPSId };
        util.showLoad('等待提交');
        for (let i = 0; i < chooseImgs.length; i++) {
            wx.uploadFile({
                url: Url.upLoadPic,
                filePath: chooseImgs[i],
                name: 'images',
                formData: data,
                header: {
                    'Authorization': 'BasicAuth ' + openId + '&' + token,
                    "Content-Type": "multipart/form-data"
                },
                success: function (res) {
                    uploadImgCount++;
                    //如果是最后一张,则隐藏等待中
                    if (uploadImgCount == chooseImgs.length) {
                        wx.hideLoading()
                        that.layerHide()
                        that.getGPSInfo()
                        util.openMess('提交成功', 'success')
                    }
                },
                fail: function (res) {
                    util.openMess('提交失败')
                }
            });
        }
    },
    getPic:function(res,url){
        this.layerHide()
        this.setData({
            imgSrc: url
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
    operPic:function(e){
        let that =this ,
            ind = e.currentTarget.dataset.index,
            id = e.currentTarget.dataset.picid,
            GPSedit = that.data.GPSedit,
            chooseImgs = that.data.chooseImgs,
            imgUrls = that.data.imgUrls
            console.log(id)
        wx.showActionSheet({
            itemList: ['删除', '预览'],
            success: function (res) {
                if (res.tapIndex == 0) {
                    if (GPSedit){
                        util.myPost(Url.RemovePicImage, { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': 'GPSInstallA', 'PicPathType': 'GPSInstall', 'PicId': id }, function (res) {
                            if (res.code == 0) {
                                that.getGPSInfo();
                                util.openMess(res.desc, 'success');
                            } else {
                                util.openMess(res.desc)
                            }
                        }, false)
                    }else{
                        chooseImgs.splice(ind,1);
                        that.setData({
                            chooseImgs: chooseImgs
                        })
                    }
                    
                } else{
                    imgUrls.show = true
                    imgUrls.current=ind
                    that.setData({
                        imgUrls: imgUrls
                    })
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    }
});