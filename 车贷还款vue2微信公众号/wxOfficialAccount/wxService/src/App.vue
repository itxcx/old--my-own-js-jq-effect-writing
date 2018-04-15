<template>  
  <div id='app' class='flex fd-c'>        
    <!-- <v-tit></v-tit> -->
    <router-view/>   
    <v-pop v-if='this.$store.state.pop.show'></v-pop>
  </div>
</template>

<script>
import tit from '@/components/tit/tit.vue';
import pop from '@/components/pop/pop.vue';
export default {  
  data () {
    return {
      tit: '苏汇金融',      
    }
  },
  components: {
    // 'v-tit': tit,
    'v-pop':pop
  }
}
</script>

<style>
/*公共样式*/
*{margin:0;padding:0;box-sizing: border-box;}
li{list-style: none;}
a{text-decoration: none;}
html,body{height:100%;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  font-size: .3rem;
  background: #f3f2f2;color:#353535;height:100%;position: relative;overflow-x: hidden;
}
button{border: 0;outline: 0;border-radius: 6px;}
input{border: 0;outline: 0;font-size: .3rem;}
/*位置*/
.pr{position: relative;}
.pa{position: absolute;}
/* 元素类型 */
.clear{clear:both;}
.text-right{text-align: right;}
.text-center{text-align: center;}
.text-left{text-align: left;}
.db{display: block;}
.di{display: inline;}
.dib{display: inline-block;}
/* 变黑白 */
.bw{filter: grayscale(100%);}
/*flex布局*/
.flex{display: flex;display: -webkit-flex;}
/*水平轴是主轴 垂直轴是交叉轴*/
/*单根主轴方向*/
.fd-r{flex-direction: row;}
.fd-rr{flex-direction: row-reverse;}
.fd-c{flex-direction: column;}
.fd-cr{flex-direction: column-reverse;}
/*单根换行*/
.fw-n{flex-wrap: nowrap;}
.fw-w{flex-wrap: wrap;}
.fw-wr{flex-wrap: wrap-reverse;}
/*单根主轴对齐方式*/
.jc-fs{justify-content: flex-start;}
.jc-fe{justify-content: flex-end;}
.jc-c{justify-content: center;}
.jc-sb{justify-content: space-between;}
.jc-fs{justify-content: space-around;}
/*单根交叉轴对齐方式*/
.ai-fs{align-items: flex-start;}
.ai-fe{align-items: flex-end;}
.ai-c{align-items: center;}
.ai-b{align-items: baseline;}
.ai-s{align-items: stretch;}
/*多根交叉轴对齐方式*/
/*父层配合fd-r,fw-w。子层配合width:100%。使用*/ 
.ac-fs{align-content: flex-start;}
.ac-fe{align-content: flex-end;}
.ac-c{align-content: center;}
.ac-sb{align-content: space-between;}
.ac-sa{align-content: space-around;}
.ac-s{align-content: stretch;} 
/*item属性*/
/*项目宽高分配比例*/
.fg-1{flex-grow: 1;} 
/**box布局**/
.ub {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: box !important;
  position: relative;
}

.ub-rev {
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  box-direction: reverse;
}

.ub-fh {
  width: 100%;
}

.ub-fv {
  height: 100%;
}

.ub-con {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ub-ac {
  -webkit-box-align: center;
  -moz-box-align: center;
  box-align: center;
}

.ub-at {
  -webkit-box-align: start;
  -moz-box-align: start;
  box-align: start;
}

.ub-ae {
  -webkit-box-align: end;
  -moz-box-align: end;
  box-align: end;
}

.ub-pc {
  -webkit-box-pack: center;
  -moz-box-pack: center;
  box-pack: center;
}

.ub-pe {
  -webkit-box-pack: end;
  -moz-box-pack: end;
  box-pack: end;
}

.ub-pj {
  -webkit-box-pack: justify;
  -mox-box-pack: justify;
  box-pack: justify;
}

.ub-ver {
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  box-orient: vertical;
}

.ub-f1 {
  position: relative;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
}

.ub-f2 {
  position: relative;
  -webkit-box-flex: 2;
  -moz-box-flex: 2;
  box-flex: 2;
}

.ub-f3 {
  position: relative;
  -webkit-box-flex: 3;
  -moz-box-flex: 3;
  box-flex: 3;
}

.ub-f4 {
  position: relative;
  -webkit-box-flex: 4;
  -moz-box-flex: 4;
  box-flex: 4;
}
/**小图标**/
@font-face {font-family: "iconfont";
  src:url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('/libs/iconfont/iconfont.ttf?t=1515650885950') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('/libs/iconfont/iconfont.svg?t=1515650885950#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-gou:before { content: "\e608"; }
.icon-shouji:before { content: "\e64f"; }

.icon-arrow-right:before { content: "\e601"; }

.icon-arrow-left:before { content: "\e600"; }

.icon-renyuanguanli:before { content: "\e68f"; }
</style>

