const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    install: false,
    list: [],
    imgUrls: { show: false, img: [], current:0},
    enter: '',
    tit: '请上传车辆异常照片！'
  },
  onLoad: function (options) {
    let that = this;
    let enter = that.data.enter;
    let tit = that.data.tit;
    enter = options.is;
    if (enter == 'dydj') {
      wx.setNavigationBarTitle({
        title: '抵押登记证明上传'
      });
      tit = '请上传抵押登记证明！';
    }
    that.setData({
      enter: enter,
      tit: tit
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  bindGPS: function () {
    let that = this;
    let list = that.data.list;
    let imgUrls = that.data.imgUrls;
    let data = { 'OrderId': wx.getStorageSync('OrderId'), 'pictype': 'Mortgage', 'PicPathType': 'Mortgage', 'CarPicId': '' };
    util.choosePic(1, Url.upLoadPic, data, function (res, src) {
      var obj = JSON.parse(res.data).data;
      if (obj.code == 0) {
        imgUrls.img.push(src);
        obj.Original_path = src;
        list.push(obj);
        that.setData({
          list: list,
          imgUrls: imgUrls
        });
      }
      else {
        util.openMess('上传失败');
      }
    });
  },
  operGps: function (e) {
    let id = e.currentTarget.dataset.id,
        ind = e.currentTarget.dataset.index,
      that = this,
      imgUrls = that.data.imgUrls;
    imgUrls.current=ind
    imgUrls.show = true;
    that.setData({
      imgUrls: imgUrls
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
  sure: function () {
    wx.navigateBack({

    });
  }
})