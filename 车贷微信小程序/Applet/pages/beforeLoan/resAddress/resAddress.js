const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
    data: {
        value: [0, 0, 0],
        myAnimation: {},
        address: {  },
        addressMess:'',
        addressDetail:''
    },
    onLoad: function (options) {
        let that = this,
            address = {},
            addressMess = '',
        addressDetail=''
        wx.getStorage({
            key: 'personInfo',
            success: function (res) {
                let myData = res.data
                let add = myData.ResidentialAddress
                if (add != '') {
                    add = JSON.parse(add)
                    address = add
                    addressMess = add.ProvinceName+ add.CityName,+add.DistrictName
                    addressDetail=add.Address
                }
                that.setData({
                    address: address,
                    addressMess: addressMess,
                    addressDetail: addressDetail
                });
            },
        })
    },
    onReady: function () {

    },
    onShow: function () {

    },
    formSubmit: function (e) {
        let that = this,
            CustomerId = wx.getStorageSync('CustomerId'),
            data = {},
            form = e.detail.value, 
            ResidentialAddress = this.data.address;
        if (form.live== '') {
            util.openMess('请选择地址')
            return false
        }
        if (form.liveMess == '') {
            util.openMess('请输入详细地址')
            return false
        }
        ResidentialAddress.Address = form.liveMess
        data.CustomerId = CustomerId
        data.ResidentialAddress = JSON.stringify(ResidentialAddress)
        util.myPost(Url.submitPI, data, callBack, false);
        function callBack(res) {
            if (res.code == 0) {
                util.openMess(res.desc, 'success');
                setTimeout(function () { wx.navigateBack(); }, 2000)
            } else {
                util.openMess(res.desc);
            }
        }
    },
    showPickerArea: function () {
        let proviceData = this.data.proviceData;
        this.animation = util.animation
        util.animation.bottom(0).step()
        this.setData({
            isShow: true,
            myAnimation: util.animation.export(),
            value: [0, 0, 0]
        });
        this.getProvice();
    },

    bindChange: function (e) {
        const current_value = e.detail.value, _data = this.data, that = this;
        if (current_value.length > 2) {
            if (this.data.value[0] !== current_value[0] && this.data.value[1] === current_value[1] && this.data.value[2] === current_value[2]) {
                // 滑动省份
                that.getCity(_data.proviceData[current_value[0]].AreaCode)
                current_value[1] = 0
                current_value[2] = 0

            } else if (this.data.value[0] === current_value[0] && this.data.value[1] !== current_value[1] && this.data.value[2] === current_value[2]) {
                that.getDistrict(_data.cityData[current_value[1]].AreaCode)
                current_value[2] = 0
            } else if (this.data.value[0] === current_value[0] && this.data.value[1] === current_value[1] && this.data.value[2] !== current_value[2]) {
                // 滑动地区
                // that.getDistrict(_data.cityData[current_value[2]].AreaCode)
            }
        }

        that.setData({
            value: current_value,
        })
    },
    getProvice: function () {
        let that = this
        util.myPost(Url.GetAreaList, { 'KeyValue': '' }, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                //   util.addDot(mydata);
                const firstProvince = mydata[0];
                that.getCity(firstProvince.AreaCode)
                that.setData({
                    proviceData: mydata,
                    'selectedProvince.index': 0,
                    'selectedProvince.code': firstProvince.AreaCode,
                    'selectedProvince.fullName': firstProvince.AreaName,
                });
            }
        }, true)
    },
    getCity: function (code) {
        let that = this
        util.myPost(Url.GetAreaList, { 'KeyValue': code }, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                // util.addDot(mydata);
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
    getDistrict: function (code) {
        let that = this
        util.myPost(Url.GetAreaList, { 'KeyValue': code }, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                // util.addDot(mydata);
                const firstDistrict = mydata[0];
                that.setData({
                    districtData: res.data,
                });
            }
        }, true)
    },
    hidePicker: function () {
        this.animation = util.animation
        util.animation.bottom("-100%").step()
        this.setData({
            isShow: false,
            myAnimation: util.animation.export()
        });
    },
    confirmAddress: function () {
        let _data = this.data,
            value = this.data.value,
            proviceName = _data.proviceData[value[0]].AreaName,
            proviceCode = _data.proviceData[value[0]].AreaCode,
            cityName = _data.cityData[value[1]].AreaName,
            cityCode = _data.cityData[value[1]].AreaCode, districtName = '', districtCode = ''
        if (_data.districtData.length > 0) {
            districtName = _data.districtData[value[2]].AreaName
            districtCode = _data.districtData[value[2]].AreaCode
        }
            
         let   address = { "ProvinceCode": proviceCode, "ProvinceName": proviceName, "CityCode": cityCode, "CityName": cityName, "DistrictCode": districtCode, "DistrictName": districtName, "Address": "" },
            addressMess = proviceName + cityName + districtName
        this.setData({
            address: address,
            addressMess: addressMess
        })
        this.hidePicker()
    }
})