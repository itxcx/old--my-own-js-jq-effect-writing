const Url = require('../../../config.js');
const util = require('../../../utils/util.js');


Page({

  data: {
      longitude:'',
      latitude:'',
      markers:{},
      rgcData: {
          address:'',
          status:'',
          times:'',
          signal:0
      },
  },
  onLoad: function (options) {
      let num = options.GPSnum
      let that = this
      this.getMapMess(num)
  } ,
  onReady: function () {
      this.mapCtx = wx.createMapContext('map')
      //this.mapCtx.moveToLocation()
      
  },
  onShow: function () {
      
  },
  getMapMess:function(num){
      let that=this,
          rgcData = that.data.rgcData,
          lon = that.data.longitude,
          lat = that.data.latitude, controls
      util.myPost(Url.GetFunDwGetOneZhdServiceApi, { 'GPSNum':num }, function (res) {
          if (res.code == 0) {
              util.openMess('加载完成','success')
              let mydata = res.data, status;
              console.log(mydata)
              rgcData.address = mydata.DZ
              status = mydata.ZTEX 
              switch (status){
                  case 0: rgcData.status = '未知'
                  break;
                  case 1: rgcData.status = '在线'
                      break;
                  case 2: rgcData.status = '在线'
                      break;
                  case 3: rgcData.status = '异常'
                      break;
                  case 4: rgcData.status = '离线'
                      break;
              }
              rgcData.times = mydata.ZTSJEX  
              rgcData.signal = (mydata.XH  == 255) ? 0 : mydata.XH 
              lon = mydata.JD
              lat = mydata.WD
              let marker = [{
                  iconPath: "/images/marker_red.png",
                  id:0,
                  name: '',
                  latitude: lat,
                  longitude: lon,
                  width: 20,
                  height: 20
              }];
              that.setData({
                  rgcData: rgcData,
                  longitude:lon,
                  latitude:lat,
                  markers: marker
              })
             
          } else {
              util.openMess(res.desc)
          }
      }, false)
  },
  makertap:(e)=>{
      console.log(e.markerId)
  }
})