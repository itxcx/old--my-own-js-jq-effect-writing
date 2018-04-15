<template>  
  <div>
    <!-- p30 -->
    <div class='top flex fd-c'>
        <i class='iconfont icon-gou icon'></i>
        <span class='word'>￥{{myData.orderMoney}}</span>
        <span class='tip'>含历史逾期金额：{{UserRepayment.RemainPaymentAmount}}</span>
    </div>    
    <div class='bottom'>
        <div class='row flex jc-sb'>
            <span class='tit'>期数</span>
            <span class='value'>第{{UserRepayment.CurrentPeriod}}期</span>
        </div>
        <div class='row flex jc-sb'>
            <span class='tit'>交易时间</span>
            <span class='value'>{{ymdCom}}</span>
        </div>
        <div class='row flex jc-sb'>
            <span class='tit'>支付方式</span>
            <span class='value'>{{payMethod}}</span>
        </div>
        <div class='row flex jc-sb'>
            <span class='tit'>支付状态</span>
            <span class='value'>{{myData.payResult=='True'?'支付成功':'支付失败'}}</span>
        </div>
    </div>
    <div class='phone flex jc-sb'>
        <span class='tit'>客服电话</span>
        <span class='value'>400-8252-4325</span>
    </div>
    <button class='finish' @click='finish'>完成</button>    
  </div>
</template>

<script>
export default {  
  data () {
    return {            
      myData:{},
      ymd:'',
      UserRepayment:{},
      payMethod:''      
    }
  },
  mounted(){            
    let that = this;    
    this.UserRepayment = JSON.parse(localStorage.getItem('UserRepayment'));
    let payType = localStorage.getItem('payType');
    let merchantOutOrderNo = '';
    //加载数据
    //微信支付
    // console.log(that.$route.query.merchantOutOrderNo);
    if(payType=='0'){                
        merchantOutOrderNo = that.$route.query.merchantOutOrderNo;
        // merchantOutOrderNo = '18022810534300067';
        that.payMethod = '微信支付'
    }   
    //支付宝支付
    else if (payType=='1'){
        merchantOutOrderNo = localStorage.getItem('merchantOutOrderNo');
        that.payMethod = '支付宝支付'
    }
    //银联快捷支付
    else if (payType=='2'){
        that.payMethod = '银联快捷支付'
    };    
    this.$axios.post(this.postUrl.EBJPayQuery, {merchantOutOrderNo:merchantOutOrderNo,payType:payType}).then(res => {
        console.log(res);        
        if(res.data.code==0){
            this.myData = res.data.data;
            this.ymd = res.data.data.payTime;
        }        
      }, res => {
        console.log(res.desc);
      }); 
  },
  methods:{    
    finish:function(e){
        this.$router.push('/index');
    }
  },
  //计算属性 只有当依赖改变才触发，读缓存 降低开销
  computed:{    
    ymdCom:function(){
      if(this.ymd){
        this.ymd = this.ymd.substring(0,4)+'-'+this.ymd.substring(4,6)+'-'+this.ymd.substring(6,8)+' '+this.ymd.substring(8,10)+':'+this.ymd.substring(10,12)+':'+this.ymd.substring(12,14);
        return this.ymd;        
      }
      else{
        return this.ymd;         
      }
    },        
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{text-align: center;background: #fff;}
.icon{font-size: 1.2rem;color: #caac5c;margin-top: .8rem;}
.word{font-size: .4rem;color:#000;margin: .3rem 0;}
.tip{font-size: .28rem;color:#888;margin-bottom: .5rem;}
.bottom{background: #fff;padding:0 .3rem .1rem;border-bottom: 1px solid #e4eaef;}
.tit{color:#535353;}
.value{color:#000;}
.row{height:.76rem;line-height:.76rem;}
.phone{height:.9rem;line-height:.9rem;background:#fff;padding: 0 .3rem;margin-top: .2rem;border-top: 1px solid #e4eaef;border-bottom: 1px solid #e4eaef;}
.finish{width: 6.2rem;height: .9rem;background: #caac5c;color: #fff;font-size: .36rem;
    margin: .5rem auto 0;
    display: block;
    border-radius: 6px;
    border: 0;
    outline: 0;}
</style>


