<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick"> </el-tree>
  </div>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      props: {
        label:"name"
      }
    };
  },
  methods: {
    loadNode(node,resolve){
      // 第一次加载
      if(node.level===0){
        api.getCategory().then(res=>{
          if(res.data.status===200){
            return resolve(res.data.result)
          }
          return resolve([])
        }).catch(err=>{
          console.log(err)
        })
      }
      // 
      if(node.level>=1){
        api.getCategory({id:node.data.cid}).then(res=>{
          if(res.data.status===200){
            return resolve(res.data.result)
          }
          return resolve([])
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    handleNodeClick(data){
      // 回传父级
      this.$emit("onTree",data)
    }
  },
};
</script>

<style lang="less" scoped>
</style>>