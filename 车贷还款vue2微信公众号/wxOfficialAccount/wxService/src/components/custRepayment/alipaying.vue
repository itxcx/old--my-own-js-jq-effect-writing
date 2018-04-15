<template>  
  <div class='wrap'>
    请点击右上角，选择在浏览器打开，完成支付...         
  </div>
</template>

<script>
export default {  
  data () {
    return {            
      // i:0,          
    }
  },
  mounted(){       
    let that = this;                 
    let url = that.$route.query.returnUrl;
    //解密&符号    
    //ce    
    // window.history.replaceState({},null,location.href);
    //ce
    url = url.replace(/encrypt/g,'&');           
    //获取merchantOutOrderNo参数
    let merchantOutOrderNo = that.urlParamsQuery(url).merchantOutOrderNo;      
    // console.log(merchantOutOrderNo);  
    //微信浏览器 则轮询进行请求支付结果接口 
    //判断是否微信内置浏览器    
    if(that.is_weixin()){            
      function recursion (){
        var inter = 0;        
        that.$axios.post(that.postUrl.EBJPayQuery, {merchantOutOrderNo:merchantOutOrderNo,payType:localStorage.getItem('payType')}).then(res => {          
        // that.$axios.post(that.postUrl.EBJPayQuery, {merchantOutOrderNo:'18030614381191377',payType:localStorage.getItem('payType')}).then(res => {
          console.log(res);        
          if(res.data.code==0){
              if(res.data.data.payResult=='True'){
                localStorage.setItem('merchantOutOrderNo',merchantOutOrderNo);
                // localStorage.setItem('merchantOutOrderNo','18030614381191377');
                clearInterval(inter);                
                that.showTip('支付成功',function(){
                  that.$router.push(`/repaySuc`);
                },1000);                                                   
              }
              else{
                //轮询 2s一次
                // that.showTip('正在查询支付结果，请稍等',Function);                                              
                inter = setTimeout(function(){
                  // that.i++;
                  recursion ()
                },2000);
              }
          } 
          else{

          }       
        }, res => {
          console.log(res.desc);
        });
      }      
      recursion ();
    }    
    //系统浏览器调用
    else{            
      callappjs.callAlipay(url);
    }
  },
  methods:{    
    
  },
  //计算属性 只有当依赖改变才触发，读缓存 降低开销
  computed:{    
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{margin:0;padding:0;box-sizing: border-box;}
html,body{height:100%;}
.wrap{padding: .2rem;font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  font-size: .3rem;
  background: #f3f2f2;color:#353535;height:100%;position: relative;overflow-x: hidden;}
</style>
