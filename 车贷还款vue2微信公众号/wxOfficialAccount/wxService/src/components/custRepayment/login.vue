<template>  
  <div class='wrap fg-1'>
    <img src="../../assets/logo.png">    
    <div class='inp flex'>
        <i class='iconfont icon-renyuanguanli'></i>
        <input type="number" placeholder="请输入身份证号" class='fg-1' v-model='idNo'>
    </div>
    <div class='inp flex'>
        <i class='iconfont icon-shouji ti'></i>
        <input type="number" placeholder="请输入手机号" class='fg-1' v-model='phoneNo'>
    </div>    
    <button @click='login'>登录</button>
  </div>
</template>

<script>
export default {  
  data () {
    return {
      idNo: '',//110102194212191913
      phoneNo:''//15720888110
    }
  },
  mounted(){               
    let that = this;
    console.log(this.$store.state.isLogin);
    //isLogin判断从主页返回键时
    if(this.$store.state.isLogin==true){
      this.$axios.post(this.postUrl.CustomerUnBind, {OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid}).then(res => {
        console.log(res);        
        if(res.data.code==0){
          that.$store.state.isLogin=false;
        }
      }, res => {
        console.log(res.desc);
      }); 
    } 
    else{
      //第二次打开时，自动登录
      // 获取OpenId      
      // let appid = 'wxc80fdd43748dfc6e';
      // let appsecret = 'b26e6675fc056d7f5060350070d80f28';
      let params = window.location.search;
      let s = params.split('&')[0];
      let code = s.substring(s.indexOf('=')+1,s.length);    
      //用code获取openid
      // console.log();
      this.$axios.post(this.postUrl.GetWxOpenId, {KeyValue: code}).then(res => {    
        console.log(res);            
        if(res.data.code==0){      
          if(res.data.data.errcode==null){  
            //replaceState去除地址中的code和state参数            
            window.history.replaceState({},null,'/');            
            localStorage.setItem('UserInfo',JSON.stringify(res.data.data));
                                                                          
            //自动登录
            return this.$axios.post(this.postUrl.CustomerAccess,{OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid});
          }          
          else{            
            console.log(res.data.data.errmsg);
          }
        }
        //测试
        localStorage.setItem('UserInfo',JSON.stringify({openid:"o5mQc1fLqFEQ5mgnHHATCpEIDMZ0",headimgurl:"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKj9T6XCjHPaNSUCyumSvXCVL6I935UkIq45LutZmrEj4wavpniaY2ibicDNWJLsbEQNEibApZAsXQ2rg/132"}));            
        return this.$axios.post(this.postUrl.CustomerAccess,{OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid});
      }).then(res=>{              
        console.log(res);        
        if(res.data.code==0){
          localStorage.setItem('token',res.data.data.Token);            
          console.log(res.data.data.Token);
          this.$store.state.isLogin=true;
          this.$router.push('/index');
        }      
      }).catch(err => {
        // 处理错误 
        console.log(err); 
      });     
    }              
  },
  methods: {
    //第一次登录 手动登录
    login:function(){      
      let that = this;
      //axios                       
      // this.$axios.post(this.postUrl.CustomerLogin, {Account: this.idNo,Mobile:this.phoneNo,OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid}).then(res => {
      this.$axios.post(this.postUrl.CustomerLogin, {Account: '110102194212191913',Mobile:'15720888110',OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid}).then(res => {
        console.log(res);        
        if(res.data.code==0){                                                
          localStorage.setItem('token',res.data.data.Token);   
          this.$store.state.isLogin=true;         
          this.$router.push('/index');
        }
        else if(res.data.code==230){             
          console.log(2);                    
          that.showTip('您还不是我们公司客户',Function);                                   
        }
      }, res => {
        console.log(res.desc);
      });          
    },    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{background: url('../../assets/logoBg.png') no-repeat;background-size: 100% 100%;}
.wrap img{margin: 1.06rem auto 1.25rem;display: block;}
.inp{border:2px solid #625037;width:6rem;height:1rem;background:rgba(38,35,31,.8);margin: 0 auto .4rem;border-radius: 5px;}
.inp i{width:.9rem;color:#c2b893;font-size: .4rem;text-align: center;line-height: .96rem;}
.inp input{color:#fff5cd;background:none;line-height: .96rem;}
.inp input::-webkit-input-placeholder{color:#fff5cd;}
.inp input::-moz-placeholder{color:#fff5cd;}
.ti{text-indent: .08rem;}
button{width:6rem;height:1rem;border-radius: 5px;margin:.26rem auto 0;display: block;background:#c1a465;color:#fff;font-size: .34rem;}
</style>



