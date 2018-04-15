const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
  data: {
    myData:{},    
    imgs: [],//,'/images/d3.png'
    imgMode:'widthFix',
    swiper:false,
    current:0
  },
  onLoad: function (options) {    
    let that = this;
    let myData = that.data.myData;
    if (options.a){
        myData = wx.getStorageSync('customerDetails');    
    }
    else{
        myData = wx.getStorageSync('personInfo');    
    };        
    that.setData({
      myData: myData
    });    
    that.getPicInfo();
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  showSwiper:function(e){
      let current =parseInt(e.currentTarget.dataset.index)
    this.setData({
      swiper:true,
      current: current
    })
  },
  closeSwiper:function(){
    this.setData({
      swiper: false
    })
  },
  getPicInfo: function () {
      let that = this,
          imgs = that.data.imgs,
          data = { 'OrderId': wx.getStorageSync('OrderId'), 'PicsType': 1, 'ChildPicsType': 'Customer' }
      util.myPost(Url.GetPicsList, data, function (res) {
          if (res.code == 0) {
              let mydata = res.data
              util.openMess(res.desc)
              if (mydata.length > 0) {
                  for (let i = 0; i < mydata.length; i++) {
                      mydata[i].FilePath = util.getImgUrl(mydata[i].FilePath)
                      let ChildPicsType = mydata[i].ChildPicsType
                      if (ChildPicsType == 1) {
                          imgs[0]= mydata[i].FilePath
                      } else {
                          imgs[1] = mydata[i].FilePath
                      }
                  }
                  that.setData({
                      imgs: imgs
                  })
              }
          } else {
              util.openMess(res.desc)
              that.setData({
                  imgs: []
              })
          }
      }, false)
  }
})
