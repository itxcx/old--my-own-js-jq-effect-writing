var host = 'https://www.huiby.net/wx/api' //  'https://www.huiby.net/wx/api'   http://192.168.0.100:81/api
var ResourceUrl = 'https://www.huiby.net'
var PhoneServer = 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='
var picUrl ='https://www.huiby.net/Resource/PictureFile/mini'
var config = {
    host,
    ResourceUrl,  //图片路径
    PhoneServer,//手机号码服务商回去
    picUrl,    
    // 贷款计算器
    lendersToolBoxNew: `${host}/Common/LendersToolBoxNew`,        
};
module.exports = config;