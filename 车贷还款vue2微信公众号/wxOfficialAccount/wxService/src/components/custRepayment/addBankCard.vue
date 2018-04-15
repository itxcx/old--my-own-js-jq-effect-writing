<template>  
  <div>
    <div class='row flex'>
        <span class='name'>持卡人</span>
        <input type="text" name="" placeholder="持卡人姓名" class='fg-1'>
    </div>
    <div class='row flex last'>
        <span class='name'>身份证</span>
        <input type="number" name="" placeholder="持卡人身份证" class='fg-1'>
    </div>
    <div class='row flex fir'>
        <span class='name'>开户银行</span>
        <!-- 待完成 -->
        <input type="text" name="" placeholder="选择开户银行" class='fg-1'>
        <i class='iconfont icon-arrow-right'></i>
    </div>
    <div class='row flex last'>
        <span class='name'>银行卡号</span>
        <input type="number" name="" placeholder="输入银行卡号" class='fg-1'>
    </div>
    <div class='row flex fir'>
        <span class='name'>手机号</span>        
        <input type="number" name="" placeholder="银行预留手机号" class='fg-1'>        
    </div>
    <div class='row flex last'>
        <span class='name'>验证码</span>
        <input type="number" name="" placeholder="手机验证码" class='fg-1'>
    </div>
  </div>
</template>

<script>
export default {  
  data () {
    return {            
      // payType:0
    }
  },
  mounted(){        
    // this.NowShouldRepaymentAmount = this.$route.query.NowShouldRepaymentAmount;
  },
  methods:{
    // choose:function(e){
    //     console.log(1);
    //     console.log(e);
    //     this.payType = e.target.getAttribute('data-index');
    //     this.isHook = [false,false,false];
    //     this.isHook[this.payType] = true;                
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{height:.88rem;line-height:.88rem;border-top:1px solid #e5e5e5;padding: 0 .28rem;background:#fff;}
.row.last{border-bottom:1px solid #e5e5e5;}
.row.fir{margin-top:.2rem;}
.row .name{width:1.9rem;}
.row .icon-arrow-right{}
</style>


