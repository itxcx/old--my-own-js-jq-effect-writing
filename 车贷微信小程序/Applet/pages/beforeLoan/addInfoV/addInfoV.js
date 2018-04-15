// pages/beforeLoan/addInfo/addInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prop_pic: [
      { imgSrc: '/images/cbp_pic.png', picName: '房屋所有权证', style: 'width:98rpx;height:98rpx;', flag: false },
      { imgSrc: '/images/cbp_pic.png', picName: '营业执照', style: 'width:98rpx;height:98rpx;', flag: false },
      { imgSrc: '/images/cbp_pic.png', picName: '银行流水', style: 'width:98rpx;height:98rpx;', flag: false },
      { imgSrc: '/images/cbp_pic.png', picName: '人行征信', style: 'width:98rpx;height:98rpx;', flag: false }
    ],
    homevisit_pic: [
      { imgSrc: '/images/cbp_pic.png', picName: '后左 未完，看原型', style: 'width:98rpx;height:98rpx;', flag: false },
      { imgSrc: '/images/cbp_pic.png', picName: '后右', style: 'width:98rpx;height:98rpx;', flag: false }
    ],
    boxAnimation: {},
    layer: true,
    ex_pic: '',
    ex_picA: [
      '/images/ex_pic01.jpg',
      '/images/ex_pic02.jpg',
      '/images/ex_pic01.jpg',
      '/images/ex_pic02.jpg',
      '/images/ex_pic01.jpg',
      '/images/ex_pic02.jpg',
      '/images/ex_pic01.jpg',
      '/images/ex_pic02.jpg'
    ],
    carType: [0, 1, 2, 3, 4, 5, 6, 7],
    uploadIndex: 0,
    submit: true,
    closeAnimation: {}
  },
  boxPop: function (e) {
    //替换图片
    // var index = e.currentTarget.dataset.index;
    // this.setData({
    //   uploadIndex: index,
    //   ex_pic: this.data.ex_picA[index]
    // });
    // //动画效果 
    // var animation = wx.createAnimation({

    // });
    // this.boxAnimation = animation;
    // animation.bottom('0rpx').step();
    // this.setData({
    //   layer: false,
    //   boxAnimation: animation.export()
    // });
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
  uploadPic: function (e) {
    var index = this.data.uploadIndex;
    var that = this;
    var cbp_pic = that.data.cbp_pic;
    //上传
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0];
        wx.getImageInfo({
          src: tempFilePaths,
          success: function (res) {
            that.data.cbp_pic[index].style = 'width:' + res.width + 'rpx;height:' + res.height + 'rpx';
            that.data.cbp_pic[index].flag = !that.data.cbp_pic[index].flag;
            cbp_pic[index].imgSrc = tempFilePaths;

            wx.uploadFile({
              url: '', //仅为示例，非真实的接口地址
              filePath: tempFilePaths,
              name: 'file',
              formData: {
                'type': that.data.carType[index]
              },
              success: function (res) {
                var data = res.data
                //图片赋值
                cbp_pic[index].imgSrc = data.imgSrc;
                that.setData({
                  cbp_pic: cbp_pic
                });
              }
            })
            //收回
            that.layerHide();
            var flagAll = true;
            for (var i = 0; i < that.data.cbp_pic.length; i++) {
              if (that.data.cbp_pic[i].flag == false) {
                flagAll = false;
              }
              else {

              }
            }
            if (flagAll) {
              that.setData({
                submit: !that.data.submit
              });
            }
          }
        });
      }
    });
  },
  titClose: function () {
    //动画效果 
    var animation = wx.createAnimation({

    });
    this.closeAnimation = animation;
    animation.height('0').step();
    this.setData({
      closeAnimation: animation.export()
    });
  },
  nextStep: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})