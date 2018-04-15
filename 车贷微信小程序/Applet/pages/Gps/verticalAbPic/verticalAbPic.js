const Url = require('../../../config.js');
const util = require('../../../utils/util.js');
Page({
  data: {    
    list1: [],    
    list2: [],
    list3: [],
    list4: [],
    list1L:0,
    list2L: 0,
    list3L: 0,
    list4L: 0,
    imgUrls: { show: false, img: [], current:0 }    
  },
  onLoad: function (options) {
    let that = this;    
    let list1 = that.data.list1;    
    let list2 = that.data.list2;    
    let list3 = that.data.list3;    
    let list4 = that.data.list4;  
    let list1L = that.data.list1L;
    let list2L = that.data.list2L;
    let list3L = that.data.list3L;
    let list4L = that.data.list4L;    
    util.myPost(Url.gpsAbnormalPic, { "OrderId": wx.getStorageSync('OrderId') }, function (res) {
      console.log(res);
      if(res.code==0){
        list1 = res.data.AbnormalVehiclePicsB;
        list2 = res.data.AbnormalVehiclePicsC;
        list3 = res.data.AbnormalVehiclePicsA;
        list4 = res.data.AbnormalVehiclePicsD;        
        list1L = list1.length;
        list2L = list2.length;
        list3L = list3.length;
        list4L = list4.length;
        for (let i = 0; i < list1L;i++){
          list1[i].Original_path = util.getImgUrl(list1[i].Original_path);
        };
        for (let i = 0; i < list2L; i++) {
          list2[i].Original_path = util.getImgUrl(list2[i].Original_path);
        };
        for (let i = 0; i < list3L; i++) {
          list3[i].Original_path = util.getImgUrl(list3[i].Original_path)         
        };        
        for (let i = 0; i < list4L; i++) {
          list4[i].Original_path = util.getImgUrl(list4[i].Original_path);
        };        
        that.setData({
          list1: list1,
          list2: list2,
          list3: list3,
          list4: list4,
          list1L: list1L,
          list2L: list2L,
          list3L: list3L,
          list4L: list4L
        });
      }
    },true);
  },
  onReady: function () {

  },
  onShow: function () {

  },  
  operGps: function (e) {
    let index = e.currentTarget.dataset.index,
      that = this,
      imgUrls = that.data.imgUrls;
    let list1 = that.data.list1;
    let list2 = that.data.list2;
    let list3 = that.data.list3;
    let list4 = that.data.list4;
    let list1L = that.data.list1L;
    let list2L = that.data.list2L;
    let list3L = that.data.list3L;
    let list4L = that.data.list4L;   
      if(index=='1'){
        for (let i = 0; i < list1L; i++) {
          imgUrls.img.push(list1[i].Original_path);
        }
      }
      else if (index == '2'){
        for (let i = 0; i < list2L; i++) {
          imgUrls.img.push(list2[i].Original_path);
        }
      }
      else if (index == '3') {
        for (let i = 0; i < list3L; i++) {          
          imgUrls.img.push(list3[i].Original_path);          
        }
      }
      else if (index == '4') {
        for (let i = 0; i < list4L; i++) {
          imgUrls.img.push(list4[i].Original_path);
        }
      }
    imgUrls.show = true
    imgUrls.current = index
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