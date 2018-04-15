<template>  
  <div>
    <div class='up flex jc-sb'>
    	<span class='l'>本期应还本息</span>
    	<span class='r'>{{NowShouldRepaymentAmount}}</span>
    </div>
    <div class='greyNote'>选择还款方式</div>
    <div class='payWay'>
    	<div class='list flex jc-sb ai-c' @click='choose($event)' data-index='2'>
    		<div class='l flex ai-c'>
    			<img src="../../assets/bank.png">
    			<span>银联支付</span>
    		</div>
    		<div v-bind:class='isHook[2]?"r hook":"r"' data-index='2'></div>
    	</div>
    	<div class='list flex jc-sb ai-c' @click='choose($event)' data-index='0'>
    		<div class='l flex ai-c'>
    			<img src="../../assets/wx.png">
    			<span>微信支付</span>
    		</div>
    		<div v-bind:class='isHook[0]?"r hook":"r"' data-index='0'></div>
    	</div>
    	<div class='list flex jc-sb ai-c' @click='choose($event)' data-index='1'>
    		<div class='l flex ai-c'>
    			<img src="../../assets/aliPay.png">
    			<span>支付宝支付</span>
    		</div>
    		<div v-bind:class='isHook[1]?"r hook":"r"' data-index='1'></div>
    	</div>
    </div>
    <button class='btn' @click='conRepay'>确认还款</button>    
    <div class='tip'>
    	<p>还款过程如有疑问，请联系客服</p>
    	<p class='mt20'>客服电话：400-8201-8202</p>
    </div>
  </div>
</template>

<script>
export default {  
  data () {
    return {      
      NowShouldRepaymentAmount:'',
      isHook:[false,false,false],
      payType:null
    }
  },
  mounted(){        
    this.NowShouldRepaymentAmount = this.$route.query.NowShouldRepaymentAmount;
  },
  methods:{
    choose:function(e){
        console.log(1);
        // console.log(e);
        this.payType = e.target.getAttribute('data-index');
        this.isHook = [false,false,false];
        this.isHook[this.payType] = true;                
    },
    //确认还款 接口
    conRepay:function(){                
        let that = this;
        // this.$router.push('/addBankCard');
        if(that.payType==null){
            that.showTip('请选择还款方式',Function,1000);
        }
        else{
            // let param = {merchantOutOrderNo:'',money:that.NowShouldRepaymentAmount,payType:that.payType,OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid,ReceivablesId:JSON.parse(localStorage.getItem('UserRepayment')).ReceivablesId};
            let param = {merchantOutOrderNo:'',money:'0.01',payType:that.payType,OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid,ReceivablesId:JSON.parse(localStorage.getItem('UserRepayment')).ReceivablesId};            
            console.log('param');
            console.log(param);
            this.$axios.post(this.postUrl.EBJPay, param).then(res => {
                console.log(res);        
                if(res.data.code==0){                    
                  console.log(res.data.data);
                  //存支付类型
                  localStorage.setItem('payType',that.payType);
                  if(that.payType=='0'){
                    window.location.href = res.data.data;                  
                  }
                  else if(that.payType=='1'){                                                     
                    //替换&符号
                    res.data.data = res.data.data.replace(/&/g,'encrypt');                                                  
                                                          
                    // window.history.pushState({},null,window.location.origin + '/#/alipaying?returnUrl=' + res.data.data);
                    // that.$router.push(`/alipaying?returnUrl=${res.data.data}`);
                    window.location.href = window.location.origin + '/#/alipaying?returnUrl=' + res.data.data;
                    // window.location.href = window.location.origin + '/alipaying.html?returnUrl=' + res.data.data;                    
                  }                                    
                }
            }, res => {
                console.log(res.desc);
            });
        }        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.up{background: #fff;height:1.2rem;line-height:1.2rem;border-bottom: 1px solid #e4ebf0;padding: 0 .3rem;}
.up .l{}
.up .r{color:#b97d2a;font-size: .34rem;}
.greyNote{height:.84rem;line-height:.84rem;font-size: .26rem;color:#888;text-align: left;padding: 0 .3rem;}
.payWay{background: #fff;border-top: 1px solid #e4ebf0;border-bottom: 1px solid #e4ebf0;}
.payWay .list{border-bottom: 1px solid #e4ebf0;height:1.2rem;padding: 0 .3rem;}
.payWay .list:last-child{border-bottom:0;}
.payWay .list .l{}
.payWay .list .l span{margin-left: .34rem;}
.payWay .list .r{width:.34rem;height:.34rem;border-radius: 50%;border:2px solid #b6c0ca;}
.payWay .list .r.hook{background: url('../../assets/hook.png') no-repeat center;background-size: 100% auto;}
.btn{width:6.2rem;height:.9rem;background: #caac5c;color:#fff;font-size: .32rem;margin: .6rem auto 0;display: block;border-radius: 6px;border:0;outline: 0;}
.tip{text-align: center;position: fixed;width: 100%;bottom: .65rem;}
.tip p{font-size: .26rem;color:#888;}
.tip p.mt20{margin-top: .16rem;}
</style>


