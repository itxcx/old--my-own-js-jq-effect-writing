const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {
      layer: true,
      install: false,
    keylist: [],
    ex_pic: '/images/ex_pic01.jpg',
    imgUrls: { show: false, img: [], current: 0 },  
    tit:'请上传车辆异常照片！',
    pictype:'',
    operMenu:['定位', '预览'],
    ChildPicsType:1
  },
  onLoad: function (options) {
      if(options.pictype){
          let t=1;
          if (options.pictype =='AbnormalVehiclePicsB'){
              t=2
          } else if (options.pictype == 'AbnormalVehiclePicsC') {
              t = 3
          } else if (options.pictype == 'AbnormalVehiclePicsA') {
              t = 1
          } else {
              t = 4
          }
          
          this.setData({
              pictype: options.pictype,
              ChildPicsType:t
          })
      }
  },
  onReady: function () {

  },
  onShow: function () {
      this.getKeyPic();
  },
  movePreview: function () {
      let that = this,
          imgUrls = that.data.imgUrls;
      imgUrls.show = false;
      that.setData({
          imgUrls: imgUrls
      })
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
      var that = this,
          data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicPathType': 'GPSAbnormal', 'pictype': that.data.pictype, 'CarPicId': '' };
      //上传
      util.choosePic(1, Url.upLoadPic, data, function (res, url) {
          that.layerHide()
          that.getKeyPic()
      })

  },
  operPics: function (e) {
      let id = e.currentTarget.dataset.id,
          that = this,
          ind = e.currentTarget.dataset.index,
          keylist = that.data.keylist,
          imgUrls = that.data.imgUrls;
      wx.showActionSheet({
          itemList: ['删除', '预览'],
          success: function (res) {
              if (res.tapIndex == 0) {
                  util.myPost(Url.RemovePicImage, { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': that.data.pictype, 'PicPathType': 'GPSAbnormal', 'PicId': id }, function (res) {
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
                  imgUrls.img = [];
                  for (let i = 0; i < keylist.length; i++) {
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
  getKeyPic: function () {
      let that = this,
          data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType': that.data.pictype, 'ChildPicsType': 'GPSAbnormal' },
          keylist = []
          console.log(data)
      util.myPost(Url.GetPicsList, data, function (res) {
          if (res.code == 0) {
              let mydata = res.data
              console.log(mydata)
              for (let i = 0; i < mydata.length; i++) {
                  if (mydata[i].PicsType == 29 && mydata[i].ChildPicsType == that.data.ChildPicsType) {
                      let obj = new Object();
                      obj.url = util.getImgUrl(mydata[i].FilePath)
                      obj.picid = mydata[i].PicsId
                      keylist.push(obj)
                  }
              }
          } else {
              keylist = []
          }
          console.log(keylist)
          that.setData({
              keylist: keylist
          })
      }, true)
  },
  sure:function(){
      wx.navigateBack({ })
  }
})