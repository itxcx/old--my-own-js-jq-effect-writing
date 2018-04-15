var host = 'http://192.168.0.100:81/api' //  'https://www.huiby.net/wx/api'   http://192.168.0.100:81/api
var ResourceUrl = 'http://192.168.0.100'
var PhoneServer = 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='
var picUrl ='https://www.huiby.net/Resource/PictureFile/mini'
var config = {
    host,
    ResourceUrl,  //图片路径
    PhoneServer,//手机号码服务商回去
    picUrl,

    //openID
    getOpenId: `${host}/WxLogin/GetXcxOpenId`,

    // 登录地址
    loginUrl: `${host}/WxLogin/UserLogin`,

    // test
    wxLoginUrl: `${host}/WxLogin/DirectLogin`,

    //个人信息
    userInfo: `${host}/User/UserInfo`,

    //退出登录
    exit: `${host}/User/UnBind`,

    //图片上传
    upLoadPic: `${host}/Common/UploadPic`,

    //删除图片
    RemovePicImage: `${host}/Common/RemovePicImage`,

    //图片识别
    GetPictureInfoByOCR: `${host}/Common/GetPictureInfoByOCR`,

    //获取所有图片
    GetPicsList: `${host}/Common/GetPicsList`, 

     //获取身份证正面图片
    GetUserPicsList: `${host}/Common/GetUserPicsList`,

    //首页 
    homeIndex: `${host}/HomePage/HomePageInfo`,

    //订单录入
    CreateOrder: `${host}/OrderEntry/CreateOrder`,

    //获取车牌前缀
    GetCarNum: `${host}/OrderEntry/GetCarNum`,

    //获取车身颜色
    GetCarColor: `${host}/OrderEntry/GetCarColor`,

    //根据VIN码获取车型
    GetCarModelByVin: `${host}/OrderEntry/GetCarModelByVin`,

    //爱车值这个价
    WxOrderInfo: `${host}/OrderEntry/WxOrderInfo`,

    //借款信息获取  
    LoadBorrowInfo: `${host}/OrderEntry/LoadBorrowInfo`,
    
    //借款信息提交或保存  
    CreateBorrowInfo: `${host}/OrderEntry/CreateBorrowInfo`,

    //获取意向备注  
    GetIntentionLogLoad: `${host}/OrderManage/GetIntentionLogLoad`,

    //录入意向备注
    SubmitIntentionLog: `${host}/OrderManage/SubmitIntentionLog`,

    //资料完善状态提交  
    IsDoneWSZL: `${host}/Customer/IsDoneWSZL`,

    //资料完善获取  
    GetIsDoneWSZL: `${host}/Customer/GetIsDoneWSZL`,

    //获取客户个人信息
    GetCustomerInfo: `${host}/Customer/GetCustomerInfo`,

    //基本信息
    basicInfo: `${host}/Customer/GetCustomerInfo`,

    //更新基本信息的手机号码
    SaveCustomerInfo: `${host}/Customer/SaveCustomerInfo`,

    // 提交个人基本信息---婚姻信息    
    submitMI: `${host}/Customer/SaveMaritalInfo`,

    // 提交个人基本信息-- - 居住地址     
    submitPI: `${host}/Customer/SaveResidentialAddressInfo`,

    // 提交个人基本信息-- - 工作单位  
    submitWU: `${host}/Customer/SaveWorkInfo`,

    //提交个人基本信息---担保人信息     
    submitGI: `${host}/Customer/SaveGuarantorInfo`,

    //获取紧急联系人信息 
    GetGuarantorInfo: `${host}/Customer/GetGuarantorInfo`,

    //提交紧急联系人信息 
    SaveEmergencyContactInfo: `${host}/Customer/SaveEmergencyContactInfo`,

    //删除紧急联系人信息 
    RemoveEmergencyContactInfo: `${host}/Customer/RemoveEmergencyContactInfo`,

    // 获取车辆信息
    getCarInfo: `${host}/Car/GetCarInfo`,

    //获取车辆图片信息 /
    GetCarPicInfo: `${host}/Customer/GetCarPicInfo`,

    //银行流水 
    GetBankFlowInfo: `${host}/Customer/GetBankFlowInfo`,

    //人行征信
    GetCreditInvestigationInfo: `${host}/Customer/GetCreditInvestigationInfo`,

    //保证金票据
    GetMarginNoteInfo: `${host}/Customer/GetMarginNoteInfo`,

    //现场勘察
    GetInvestigationInfo: `${host}/Customer/GetInvestigationInfo`,

    //验证服务密码
    PhoneMSGVerification: `${host}/OperatorAuthorization/PhoneMSGVerification`,

    // 验证码认证 
    PhoneVerificationCode: `${host}/OperatorAuthorization/PhoneVerificationCode`,
    
    //重新发送短信验证码
    ReSendSMSCode: `${host}/OperatorAuthorization/ReSendSMSCode`,

    //更新订单状态 
    UpdateOrderStatus: `${host}/OperatorAuthorization/UpdateOrderStatus`,

    //发消息
    SendNoticeTask: `${host}/OperatorAuthorization/SendNoticeTask`,

    // 提交车辆信息-- - 车辆信息
    SaveCarInfo: `${host}/Car/SaveCarInfo`,

    // 提交车辆信息-- - 违章信息 
    SaveIllegalInfo: `${host}/Car/SaveIllegalInfo`,

    // 提交车辆信息-- - 保险单 
    SaveInsurancePolicyInfo: `${host}/Car/SaveInsurancePolicyInfo`,

    //订单详情
    orderDetails: `${host}/DetailInfo/PreLoanOrderDetail`,

    //客户详情
    customerDetails: `${host}/DetailInfo/CustomerDetail`,

    //车辆详情
    vehicleDetails: `${host}/DetailInfo/CarDetail`,

    //获取省市区   DetailInfo/GetAreaList
    GetAreaList: `${host}/DetailInfo/GetAreaList`,

    //订单列表
    orderList: `${host}/OrderManage/OrderManage`,

    //GPS列表
    gpsList: `${host}/GPS/GetGPSList`,

    //抵押登记列表
    mortgageList: `${host}/MorList/GetMorList`,

    //抵押登记图片获取
    GetMorPicList: `${host}/MorList/GetMorPicList`,

    //修改抵押登记状态
    SaveMorDone: `${host}/MorList/SaveMorDone`,

    //修改抵押登记证明
    EdiPicImage: `${host}/MorList/EdiPicImage`,

    //抵押登记放款确认
    MORLoanConfirm: `${host}/MorList/MORLoanConfirm`,

    //消息列表
    GetNoticeContent: `${host}/Notify/GetNoticeContent`,

    //消息详情
    GetNoticeDetail: `${host}/Notify/GetNoticeDetail`,

    //更改消息状态
    SetIsRead: `${host}/Notify/SetIsRead`,

    // 获取GPS异常图片           
    gpsAbnormalPic: `${host}/GPS/GetGPSSceneInvestigationList`,
    
    //删除已绑定的GPS
    RemoveGPSInfo: `${host}/GPS/RemoveGPSInfo`,

    //获取GPS绑定信息
    GetGPSInfoList: `${host}/GPS/GetGPSInfoList`, 

    //获取GPS保存
    SaveGPSInfo: `${host}/GPS/SaveGPSInfo`, 

    //改变GPS状态
    SaveGPSInstallDone: `${host}/GPS/SaveGPSInstallDone`, 

    //获取GPS异常状态
    GetOrderGPSInfo: `${host}/GPS/GetOrderInfo`, 

    //GPS数量 
    GetGPSNum: `${host}/GPS/GetGPSNum`, 

    //GPS状态
    GetFunDwGetCheZhdServiceApi: `${host}/GPS/GetFunDwGetCheZhdServiceApi`, 

    //GPS第三方接口
    GetFunDwGetOneZhdServiceApi: `${host}/GPS/GetFunDwGetOneZhdServiceApi`, 
    
    // 提交车辆异常照片
    saveAbnormalPic: `${host}/GPS/SaveAbnormalVehiclePics`,
    
    // GPS放款确认
    GPSLoanConfirm: `${host}/GPS/GPSLoanConfirm`,
    
    // 风险提交
    riskSub: `${host}/OrderManage/SubmitRiskLevel`,

    // 获取抵押登记图片数量
    GetMorNum: `${host}/MorList/GetMorNum`,

    //额度确认页面
    quotaConfirPage: `${host}/OrderManage/OrderPricingLoad`,

    //额度接受
    quotaAccept: `${host}/OrderManage/AcceptOrderPrice`,

    //额度不接受页面
    quotaNotAcceptPage: `${host}/OrderManage/NotAcceptLoad`,

    //额度不接受
    quotaNotAccept: `${host}/OrderManage/NotAcceptOrderPrice`,

    //重新申请
    reApply: `${host}/OrderManage/ReApply`,

    // 完成并提交审核
    subAudit: `${host}/OrderManage/SubmitAudit`,

    // 申请放款
    applyLoan: `${host}/OrderManage/ApplyLoan`,

    // 贷款计算器
    lendersToolBox: `${host}/Common/LendersToolBox`,    
    GetOrderInfo: `${host}/GPS/GetOrderInfo`,
};
module.exports = config;