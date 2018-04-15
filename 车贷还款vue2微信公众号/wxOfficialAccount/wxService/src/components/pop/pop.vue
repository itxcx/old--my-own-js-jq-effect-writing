<!-- 标题栏 -->
<template>
  <div class='popWrap'>
    <div class='pop'>
      {{this.$store.state.pop.text}}
    </div>
  </div>  
</template>
<script>
export default {    
  data () {
    return {
      // a: 'a',      
    }
  },
  methods:{
  	
  },
  mounted: function () {
    
  }
}
</script>
<style scoped>
.popWrap{width:100%;height:100%;position: absolute;z-index: 5;}
.pop{position: absolute;width: 4rem;height: 3rem;border-radius: 10px;background: rgba(0,0,0,.5);color: #fff;text-align: center;line-height: 3rem;top: 50%;left: 50%;margin: -1.5rem 0 0 -2rem;z-index: 10;}
</style>