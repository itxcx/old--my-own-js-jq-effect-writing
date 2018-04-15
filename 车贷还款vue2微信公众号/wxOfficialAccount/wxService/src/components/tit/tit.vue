<!-- 标题栏 -->
<template>
	<div class='tit' @click='a'>
		<i class='iconfont icon-arrow-left'></i>
		{{this.$store.state.tit}}
	</div>    
</template>
<script>
export default {    
  data () {
    return {
      
    }
  },
  methods:{
  	a(){
  		console.log(1);  		
  	}
  },
  mounted: function () {
    
  }
}
</script>
<style scoped>
.tit{height:.9rem;line-height:.9rem;background: #fff;border-bottom:1px solid #e4ebf0;text-align: center;position: relative;font-size: .34rem;}
.tit i{position: absolute;left:0;width:.9rem;font-size: .34rem;color:#000;}
</style>