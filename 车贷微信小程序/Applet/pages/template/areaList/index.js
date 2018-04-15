const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
  data: {
     value:[0,0,0],
     myAnimation:{}
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    
  
  },
  onShow: function () {
     
  },
  onHide: function () {
  
  },
  showPickerArea:function(){
      let proviceData = this.data.proviceData;
      this.animation = util.animation
      util.animation.bottom(0).step()
      this.setData({
          isShow: true,
          myAnimation: util.animation.export(),
          value:[0,0,0]
      });
          this.getProvice();
  },
 
  bindChange: function (e) {
      const current_value = e.detail.value, _data = this.data,that=this;
      console.log(_data)
      if (current_value.length > 2) {
          if (this.data.value[0] !== current_value[0] && this.data.value[1] === current_value[1] && this.data.value[2] === current_value[2]) {
              // 滑动省份
              that.getCity(_data.proviceData[current_value[0]].AreaCode)
              current_value[1]=0
              current_value[2] = 0
              
          } else if (this.data.value[0] === current_value[0] && this.data.value[1] !== current_value[1] && this.data.value[2] === current_value[2]) {
              that.getDistrict(_data.cityData[current_value[1]].AreaCode)
              current_value[2] = 0
          } else if (this.data.value[0] === current_value[0] && this.data.value[1] === current_value[1] && this.data.value[2] !== current_value[2]) {
              // 滑动地区
             // that.getDistrict(_data.cityData[current_value[2]].AreaCode)
          }
      }
     let proviceName = _data.proviceData[current_value[0]].AreaName,
          proviceCode = _data.proviceData[current_value[0]].AreaCode,
          cityName = _data.cityData[current_value[1]].AreaName,
          cityCode = _data.cityData[current_value[1]].AreaCode,
          districtName = _data.districtData[current_value[2]].AreaName,
          districtCode = _data.districtData[current_value[2]].AreaCode,
          address = { "ProvinceCode": proviceCode, "ProvinceName": proviceName, "CityCode": cityCode, "CityName": cityName, "DistrictCode": districtCode, "DistrictName": districtName, "Address": ""}
    
      that.setData({
          value: current_value,
          address: address
      })
  },
  getProvice:function(){
      let that=this
      util.myPost(Url.GetAreaList, { 'KeyValue': '' }, function (res) {
          if(res.code==0){
              console.log(res)
              let mydata = res.data
              util.addDot(mydata);
              const firstProvince = mydata[0];
              that.getCity(firstProvince.AreaCode)
              that.setData({
                  proviceData: mydata ,
                  'selectedProvince.index': 0,
                  'selectedProvince.code': firstProvince.AreaCode,
                  'selectedProvince.fullName': firstProvince.AreaName,
              });
          }
      }, true)
  },
  getCity:function(code){
      let that = this
      util.myPost(Url.GetAreaList, { 'KeyValue': code }, function (res) {
           if(res.code == 0) {
               let mydata = res.data
               util.addDot(mydata);
               const firstCity = mydata[0];
               that.getDistrict(firstCity.AreaCode)
              that.setData({
                  cityData: res.data,
                  'selectedCity.index': 0,
                  'selectedCity.code': firstCity.AreaCode,
                  'selectedCity.fullName': firstCity.AreaName,
              });
          }
      }, true)
  },
  getDistrict:function(code){
      let that = this
      util.myPost(Url.GetAreaList, { 'KeyValue': code }, function (res) {
          if (res.code == 0) {
              let mydata = res.data
              util.addDot(mydata);
              const firstDistrict = mydata[0];
              that.setData({
                  districtData: res.data,
                  'selectedDistrict.index': 0,
                  'selectedDistric.code': firstDistrict.AreaCode,
                  'selectedDistric.fullName': firstDistrict.AreaName,
              });
          }
      }, true)
  },
  hidePicker:function(){
      this.animation = util.animation
      util.animation.bottom("-100%").step()
      this.setData({
          isShow: false,
          myAnimation: util.animation.export()
      });
  },
  confirmAddress:function(){
      console.log(this.data.address)
      this.hidePicker()
  }
})