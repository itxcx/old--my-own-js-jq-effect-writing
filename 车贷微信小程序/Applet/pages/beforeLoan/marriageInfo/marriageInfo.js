// pages/beforeLoan/marriageInfo/marriageInfo.js
const Url = require('../../../config.js')
const util = require('../../../utils/util.js')
Page({
    data: {
        myData: {},
        radius: [{ name: '未婚', value: 0, checked: false }, { name: '已婚', value: 1, checked: false }, { name: '离异', value: 2, checked: false }],
        formShow: false,
        live: {arr:{},address:'',mess:''},
        work: {arr: {}, address: '', mess: '' },
        idcard:{},
        value: [0, 0, 0],
        myAnimation: {},
        indexName:''
    },
    onLoad: function (options) {
        let that = this,
            myData = that.data.myData,
            formShow = that.data.formShow,
            idcard = that.data.idcard,
            radius = that.data.radius,
            live =that.data.live, work = that.data.work, MaritalStatus=0;

        wx.getStorage({
            key: 'personInfo',
            success: function (res) {
                myData = res.data
                console.log(myData)
                MaritalStatus = parseInt(myData.MaritalStatus)
                if (MaritalStatus>0){
                    radius[MaritalStatus - 1].checked = true
                }
                if (MaritalStatus == 2) {
                    formShow = true;
                }
                else {
                    formShow = false;
                }
                let add1 = myData.SpousePermanentAddress,
                     add2 = myData.SpouseResidentialAddress
                if (add1 != '' || add2!=''){
                       add1 = JSON.parse(add1)
                       add2 = JSON.parse(add2)
                        live.arr = add1
                        work.arr = add2
                        live.address = add1.ProvinceName+add1.CityName+add1.DistrictName
                        work.address = add2.ProvinceName+add2.CityName+add2.DistrictName
                        live.mess = add1.Address
                        work.mess = add2.Address
                    }
                idcard.Value = myData.SpouseIDcard
                idcard.Name = myData.SpouseName
                that.setData({
                    radius: radius,
                    formShow: formShow,
                    myData: myData,
                    live: live,
                    work: work,
                    idcard: idcard
                });
            },
        });
    },
    onReady: function () {

    },
    onShow: function () {

    },
    radioChange: function (e) {
        let val = e.detail.value
        if (val == 1) {
            this.setData({
                formShow: true,
            })
        } else {
            this.setData({
                formShow: false,
                //disabled: false
            })
        }
    },
    sexChange: function (e) {
        let val = e.detail.value
        console.log(val)
    },
    bindRegionChange: function (e) {
        this.setData({
            liveMess: e.detail.value,
            c1: "#444"
        })
    },
    bindWorkChange: function (e) {
        this.setData({
            workMess: e.detail.value,
            c2: "#444"
        })
    },
    formSubmit: function (e) {
        let sub = e.detail.value, data = {},
            formShow = this.data.formShow,
            MaritalStatus =sub.MaritalStatus,
            CustomerId = wx.getStorageSync('CustomerId'), 
            live=this.data.live,
            work=this.data.work,
            SpouseIDcard, SpouseMobile, SpouseName, SpouseGender, liveAddress, workAddress, SpousePermanentAddress, SpouseResidentialAddress;
         console.log(data)
        if (formShow) {
               SpouseIDcard = sub.SpouseIDcard,
                SpouseMobile = sub.SpouseMobile,
                SpouseName = sub.SpouseName,
                SpouseGender = sub.SpouseGender,
                   liveAddress = sub.live,
                   workAddress = sub.work,
                SpousePermanentAddress = live.arr  ,
                SpouseResidentialAddress = work.arr;

            if (SpouseName == '') {
                util.openMess('请输入配偶姓名')
                return false;
            }
            if (SpouseIDcard == '') {
                util.openMess('请选输入配偶身份证号')
                return false;
            } else {
                if (!util.Verification.idCard(SpouseIDcard)) {
                    util.openMess('身份证不合法')
                    return false;
                }
            }
            if (SpouseMobile == '') {
                util.openMess('请选配偶手机号码')
                return false;
            } else {
                if (!util.Verification.telephone(SpouseMobile)) {
                    util.openMess('手机号码不合法')
                    return false;
                }
            }
            if (SpouseGender == '') {
                util.openMess('请选择性别')
                return false;
            }
            if (sub.liveMess == '' || sub.live=='') {
                util.openMess('请完善户籍地址')
                return false;
            }
            if (sub.workMess == '' || sub.work == '') {
                util.openMess('请完善居住地址')
                return false;
            }
        }
        if (MaritalStatus == '') {
            util.openMess('请选择婚姻状况')
            return false;
        }else{
            MaritalStatus=parseInt(MaritalStatus)+1
        }

        data.CustomerId = CustomerId
        data.MaritalStatus = MaritalStatus
        data.SpouseIDcard = SpouseIDcard!=undefined ? SpouseIDcard:''
        data.SpouseMobile = SpouseMobile ? SpouseMobile:''
        data.SpouseName = SpouseName ? SpouseName:''
        data.SpouseGender = SpouseGender?parseInt(SpouseGender):''
        data.SpousePermanentAddress = SpousePermanentAddress ? JSON.stringify(SpousePermanentAddress):''
        data.SpouseResidentialAddress = SpouseResidentialAddress ? JSON.stringify(SpouseResidentialAddress):''
        console.log(data)
        util.myPost(Url.submitMI, data, callBack, false);
        function callBack(res) {
            if (res.code == 0) {
                util.openMess('提交成功', 'success');
                setTimeout(function () {
                    wx.navigateBack();
                }, 1500)
            } else {
                util.openMess(res.desc);
            }

        }
    },
    getPhoto: function (e) {
        let name = e.currentTarget.dataset.id,
            that = this
        util.ImageRecognition(name, function (res) {
            if (res.code == 0) {
                let mydata = res.data
                if (name == 'idcard') {

                    that.setData({
                        idcard: mydata
                    })
                } else {
                    util.openMess('识别错误')
                }
            }
        },true,2)
    },
    showPickerArea: function (e) {
        let name = e.currentTarget.dataset.name
        let proviceData = this.data.proviceData
        this.animation = util.animation
        util.animation.bottom(0).step()
        this.setData({
            isShow: true,
            myAnimation: util.animation.export(),
            value: [0, 0, 0],
            indexName: name
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
                console.log(res)
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
                    'selectedDistrict.index': 0,
                    'selectedDistric.code': firstDistrict.AreaCode,
                    'selectedDistric.fullName': firstDistrict.AreaName,
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
            cityCode = _data.cityData[value[1]].AreaCode,
            districtName = _data.districtData[value[2]].AreaName,
            districtCode = _data.districtData[value[2]].AreaCode,
            address = { "ProvinceCode": proviceCode, "ProvinceName": proviceName, "CityCode": cityCode, "CityName": cityName, "DistrictCode": districtCode, "DistrictName": districtName, "Address": "" },
            addressMess = proviceName + cityName + districtName,
            indexName = this.data.indexName,
            live = this.data.live,
            work = this.data.work
        if (indexName == 'live') {
            address.Address = live.mess
            live.arr = address
            live.address = addressMess
        } else {
            address.Address = work.mess
            work.arr = address
            work.address = addressMess
        }
        this.setData({
            live:live,
            work: work
        })
        this.hidePicker()
    },
    changeMess:function(e){
        let name = e.currentTarget.dataset.name,
        val=e.detail.value,
        live=this.data.live,
        work=this.data.work
        if (name =='liveMess'){
              live.mess=val
              live.arr.Address=val
        }else{
            work.mess=val
            work.arr.Address = val
        }
        this.setData({
            live: live,
            work: work
        })
    }
})