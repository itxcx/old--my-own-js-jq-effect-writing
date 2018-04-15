Page({
  data: {
      urls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
     layer: true,
     ex_pic:'/images/ex_pic01.jpg',
     boxAnimation: {},
     swiperAnimation:{},
     imgSrc: '/images/add.png',
     swiper: { indicatorDots: true, current: 0, duration: '500', indicatorColor: '#999', indicatorActive:'red'}
  },
  onLoad: function (options) {
     
  },

  onReady: function () {
  
  },

  onShow: function () {
  
  },
  addPic:function(){
      let  myAnimate = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
      })
      this.boxAnimation = myAnimate;
      myAnimate.bottom('0rpx').step();
      this.setData({
          layer: false,
          boxAnimation: myAnimate.export()
      });
  },
  layerHide:function (){
      let myAnimate = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
      })
      this.boxAnimation = myAnimate;
      myAnimate.bottom('-700rpx').step();
      this.setData({
          layer: true,
          boxAnimation: myAnimate.export()
      });
  },
  uploadPic:function(e){
      var index = this.data.uploadIndex;
      var that = this;
      var cbp_pic = that.data.cbp_pic;
      var urls = this.data.urls;
      //上传
      wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['camera'],
          success: function (res) {
              var tempFilePaths = res.tempFilePaths[0];
              urls.push(tempFilePaths)
              that.setData({
                  urls: urls
              })
              that.layerHide()
          }
      });
  },
  picSwiper:function(e){
      let cur = e.currentTarget.dataset.index;
      let swiper=this.data.swiper;
      swiper.current=cur;
      this.setData({
          swiper: swiper
      });
      let myAnimate = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
      })
      this.animation = myAnimate
      myAnimate.left(0).step()
      this.setData({
          swiperAnimation: myAnimate.export()
      })
  },
   hideSwiper:function(){
       let myAnimate = wx.createAnimation({
           duration: 500,
           timingFunction: 'ease',
       })
       this.animation = myAnimate
       myAnimate.left('100%').step()
       this.setData({
           swiperAnimation: myAnimate.export()
       })
    }
})