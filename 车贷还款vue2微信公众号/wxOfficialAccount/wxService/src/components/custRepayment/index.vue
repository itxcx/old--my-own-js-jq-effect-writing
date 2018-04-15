<template>      
  <div>  
    <div class='up'>
      <div class='up2'>                
        <img v-bind:src="headSrc">
        <p class='role'>{{myData.RealName}} {{myData.Gender=='0'?'先生':'女士'}} | <span class='exit' @click='exit'>退出登录</span></p>
        <p class='no'>合同编号：{{myData.ContractNum}}</p>
        <div class='down3 flex jc-sb'>
          <span class='l'>应还款日期</span>          
          <span class='r'>{{conShouldRepaymentDate}}</span>
        </div>
      </div>
      <!-- 未还清 -->
      <div class='down2' v-if='!(myData.PaymentStatus==1||myData.PaymentStatus==4)'>
        <p class='up3'>当月应还本息({{myData.CurrentPeriod}}/{{myData.LoanTerm}}期)</p>
        <p class='mid3'>{{myData.NowShouldRepaymentAmount}}</p>
        <p class='down3'>（含历史逾期金额：{{myData.RemainPaymentAmount}}）</p>
      </div>
      <!-- 已还清 -->
      <div class='down2 payOff' v-if='(myData.PaymentStatus==1||myData.PaymentStatus==4)'>
        <p class='up3'>赞，本月全部还清了</p>
        <img src="../../assets/thumb.png">
      </div>
    </div>
    <div class='mid'>
      <div class='list flex jc-sb'>
        <span class='l'>已还期数</span>
        <span class='r'>{{myData.DonePeriod}} / {{myData.LoanTerm}}期</span>
      </div>
      <div class='list flex jc-sb'>
        <span class='l'>剩余本息</span>
        <span class='r'>
          <span class='inner'>{{myData.SumRemainPaymentAmount}}万元</span>          
        </span>
      </div>
    </div>
    <div class='greyNote'>待还本息</div>
    <div class='wrapDown'>
      <div class="list flex jc-sb ai-c" v-for='item in myData.list'>
        <div class='l flex fw-w ac-sb'>
          <p class='up'>第{{item.CurrentPeriod}}/{{myData.LoanTerm}}期<span class='red' v-if='item.FinalOverduedays!=0'>（逾期{{item.FinalOverduedays}}天）</span></p>
          <p class='down'>{{item.ShouldRepaymentDate}}</p>
        </div>
        <div class='r'>{{item.ShouldRepaymentAmount}}</div>
      </div>      
      <button @click='immedRepay'>立即还款</button>
      <!-- <button @click='immedRepay' v-if='!(myData.PaymentStatus==1||myData.PaymentStatus==4)'>立即还款</button> -->
    </div>  
  </div>
</template>

<script>
export default {  
  data () {
    return {
      myData: {},
      NowShouldRepaymentAmount:'',
      ShouldRepaymentDate:'',      
      headSrc:''    
    }
  },  
  mounted(){            
    let that = this;    
    //改tit
    // this.$store.state.tit = '主页';
    this.headSrc = JSON.parse(localStorage.getItem('UserInfo')).headimgurl;
    console.log(1);                     
    //axios
    //获取OrderId 
    this.$axios.post(this.postUrl.GetUserOrder, {KeyValue: JSON.parse(localStorage.getItem('UserInfo')).openid}).then(res => {
      console.log(res);            
      if(res.data.code==0){
        //获取信息
        return this.$axios.post(this.postUrl.UserRepayment, {KeyValue:res.data.data.OrderId});
      }
      //暂无数据
      else if(res.data.code==201){                
        // that.showTip('贷款尚未完成',function(){
        //   that.$options.methods.exit.call(that);          
        //   // that.exit();
        // });                
      }
    }).then(res=>{      
      console.log(res);        
      if(res.data.code==0){        
        this.ShouldRepaymentDate = res.data.data.ShouldRepaymentDate;         
        this.myData = res.data.data;
        localStorage.setItem('UserRepayment',JSON.stringify(res.data.data));
        this.NowShouldRepaymentAmount = res.data.data.NowShouldRepaymentAmount;  
        // this.$store.state.ReceivablesId = res.data.data.ReceivablesId;          
      }
    }).catch(err => {
      // 处理错误 
      console.log(err);       
    });        
  },
  //Vue实例销毁后调用 钩子
  destroyed(){
    let that = this;
    console.log('clearTimeout');
    that.hideTip();      
  },
  methods: {
    immedRepay:function(){
      console.log(1);                                  
      this.$router.push(`/repayMethod?NowShouldRepaymentAmount=${this.NowShouldRepaymentAmount}`);
    },    
    exit:function(){
      let that = this;
      console.log(1);      
      // console.log(this);
      this.$axios.post(this.postUrl.CustomerUnBind, {OpenId:JSON.parse(localStorage.getItem('UserInfo')).openid}).then(res => {
        console.log(res);        
        if(res.data.code==0){
          that.$store.state.isLogin=false;
          this.$router.push('/');
        }
      }, res => {
        console.log(res.desc);
      });                 
    }
  },
  //计算属性 只有当依赖改变才触发，读缓存 降低开销
  computed:{    
    conShouldRepaymentDate:function(){
      if(this.ShouldRepaymentDate){
        return this.getTime(this.ShouldRepaymentDate,1);        
      }
      else{
        return this.ShouldRepaymentDate;         
      }
    }
  },
  //侦听属性
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.up{background: #fff;}
.up .up2{border-bottom: 1px solid #e7e7e7;height:4.38rem;background: url('../../assets/up2bg.png') no-repeat;background-size: 100% auto;text-align: center;position: relative;}
.up .up2 img{width:1.2rem;height:1.2rem;border-radius: 50%;border:.04rem solid #fef2c2;margin-top: .5rem;}
.up .up2 .role{color:#624e22;margin-top: .2rem;}
.up .up2 .no{color:#a68b4e;font-size: .26rem;margin-top: .2rem;}
.up .up2 .down3{padding: 0 .3rem;line-height: 1rem;height: 1rem;width:100%;margin-top: .44rem;}
.up .up2 .down3 .l{color:#535353;}
.up .up2 .down3 .r{color:#b97d2a;}
.up .down2{text-align: center;border-bottom: 1px solid #e5e5e5;padding-top: .5rem;height:2.9rem;}
.up .down2 .up3{color:#999;font-size: .28rem;}
.up .down2 .mid3{color:#4a3a16;font-size: .6rem;margin-top: .26rem;}
.up .down2 .down3{color:#999;font-size: .26rem;margin: .26rem auto 0;}
.mid{border-top: 1px solid #e5e5e5;margin-top: .2rem;background: #fff;}
.mid .list{border-bottom: 1px solid #e5e5e5;height: .87rem;line-height: .87rem;padding: 0 .3rem;}
.mid .list .l{color:#535353;}
.mid .list .r{color:#000;float: right;}
.mid .list .r .inner{float: left;}
.mid .list .r i{font-size: .5rem;color:#c7c7cc;font-weight: bold;float: left;}
.greyNote{height:.84rem;line-height:.84rem;font-size: .26rem;color:#888;text-align: center;}
.wrapDown{background: #fff;border-top: 1px solid #e5e5e5;padding-bottom: .2rem;}
.wrapDown .list{padding:.3rem;border-bottom: 1px solid #e5e5e5;height:1.37rem;}
.wrapDown .list .l{}
.wrapDown .list .l p{width:100%;}
.wrapDown .list .l .up{}
.wrapDown .list .l .up .red{color:#d92c1a;}
.wrapDown .list .l .down{color:#999;font-size: .26rem;}
.wrapDown .list .r{color:#000;}
.wrapDown button{width:6.9rem;height:1.01rem;background: url('../../assets/btn.png') no-repeat;background-size:100% auto;margin: .2rem auto 0;display: block;border:0;color:#cab96e;font-size: .42rem;outline: 0;}
/**/
.up .down2.payOff{height:2.9rem;}
.up .down2.payOff .up3{font-size: .28rem;}
.up .down2.payOff img{margin-top: .26rem;}
.exit{color:#a68b4e;font-size: .24rem;}
</style>

