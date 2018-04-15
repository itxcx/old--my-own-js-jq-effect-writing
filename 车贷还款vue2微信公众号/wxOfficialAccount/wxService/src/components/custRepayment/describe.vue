<template>  
  <div>
    <div class='up'>
        <div class='up2'></div>
        <div class='down2'>
            <div class='up3 flex ai-c jc-c tit'>
                <img src="../../assets/dot.png">
                <span>了解苏汇金融车抵贷</span>
                <img src="../../assets/dot.png">
            </div>
            <div class='mid3'>
                汽车抵押借款产品。客户可用自有车辆的所有权进行抵押，获得便捷、专业的借款服务。目前有GPS不押车和押车等多种服务模式可供选择。
            </div>
            <div class='down3 flex'>
                <div class='list'>
                    <img src="../../assets/pic01.png">
                    <span>额度高</span>
                    <p>可借额度最高为车辆估值99%</p>
                </div>
                <div class='list'>
                    <img src="../../assets/pic02.png">
                    <span>放款快</span>
                    <p>最快1小时放款</p>
                </div>
                <div class='list'>
                    <img src="../../assets/pic03.png">
                    <span>还款灵活</span>
                    <p>微信/支付宝/银行卡多种方式还款</p>
                </div>
            </div>
        </div>
    </div>
    <div class='down'>
        <div class='up2'>
            <div class='up3 flex ai-c jc-c tit'>
                <img src="../../assets/dot.png">
                <span>申请流程</span>
                <img src="../../assets/dot.png">
            </div>
            <div class='down3 flex jc-sb bb'>
                <div class='list'>
                    <img src="../../assets/pic04.png">
                    <span>车辆评估</span>
                </div>
                <i class='iconfont icon-arrow-right'></i>    
                <div class='list'>
                    <img src="../../assets/pic05.png">
                    <span>到店签协议</span>
                </div>
                <i class='iconfont icon-arrow-right'></i>    
                <div class='list'>
                    <img src="../../assets/pic06.png">
                    <span>风控审核</span>
                </div>
                <i class='iconfont icon-arrow-right'></i>    
                <div class='list'>
                    <img src="../../assets/pic07.png">
                    <span>成功放款</span>
                </div>                
            </div>
        </div>
        <div class='mid2'>
            <div class='up3 flex ai-c jc-c tit'>
                <img src="../../assets/dot.png">
                <span>准备材料</span>
                <img src="../../assets/dot.png">
            </div>
            <div class='down3 bb'>
                <p>身份证、行驶证、驾驶证、车辆登记证、车辆保单、银行卡</p>
            </div>
        </div>
        <div class='down2'>
            <div class='up3 flex ai-c jc-c tit'>
                <img src="../../assets/dot.png">
                <span>还款方式</span>
                <img src="../../assets/dot.png">
            </div>
            <div class='down3 bb'>
                <p>先息后本：还款期内，用户每月只需偿还利息，在整个还款周期结束时，一次性将本金还清。仅限贷款3个月用户。</p>
                <p>等额本息：还款期内，用户每月需偿还相同本息，可办理期限为12个月与24个月。</p>                
            </div>
            <button class='conCust'>联系客服</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {  
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.up{}
.up .up2{height:3.4rem;background: url('../../assets/banner.png') no-repeat;background-size: 100% auto;}
.up .down2{background: #fff;height:6.2rem;}
.up .down2 .mid3{font-size: .28rem;line-height:.48rem;padding: 0 .4rem;}
.up .down2 .down3{margin-top: .3rem;}
.up .down2 .down3 .list{text-align: center;margin: 0 .4rem;}
.up .down2 .down3 .list *{display: block;}
.up .down2 .down3 .list img{margin: 0 auto;}
.up .down2 .down3 .list span{font-size: .28rem;margin-top: .2rem;}
.up .down2 .down3 .list p{font-size: .24rem;margin-top: .2rem;}
.down{margin-top:.24rem;background: #fff;}
.bb{margin: 0 .4rem;border-bottom: 1px solid #e5e5e5;}
.tit{height:1.26rem;}
.tit span{font-size: .28rem;margin: 0 .16rem;}
.down .up2 .down3{padding-bottom: .6rem;}
.down .up2 .down3 .list img{display: block;margin: 0 auto;}
.down .up2 .down3 .list span{display: block;}
.bb i{font-size: .5rem;color:#e7c369;}
.bb p{font-size: .28rem;padding-bottom:.6rem;}
.conCust{font-size: .32rem;color:#fff;width:6.7rem;text-align: center;background: #caac5c;line-height: .9rem;margin: .4rem auto .22rem;display: block;}
</style>



