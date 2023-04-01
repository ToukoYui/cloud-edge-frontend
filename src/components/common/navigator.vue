<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      active: [],
      index1: null,
      index2:null
    }
  },
  computed: mapState(["menu"]),
  methods: {
    getIndex() {
      this.bus.$on('sendIndex',(data)=>{
        this.index1 = data
        this.active = this.menu[data-1]
        //console.log(JSON.stringify(this.active)+'----')    
      })
      this.bus.$on('index',(data)=>{
        this.index2 = data
      })
    }
  },
  created() {
    this.getIndex()
  },
  beforeDestroy() {
    // this.bus.$off('sendIndex') //销毁
  },
}
</script>
<template>
  <div id="nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="title">{{active.title}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="active.content[index2].item1 != null">{{active.content[index2].item1}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="active.content[index2].item2 != null">{{active.content[index2].item2}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="active.content[index2].item3 != null">{{active.content[index2].item3}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
#nav .el-breadcrumb {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
}
#nav .el-breadcrumb .title{
  font-weight: bold;
}
</style>
