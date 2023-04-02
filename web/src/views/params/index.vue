<template>
  <div>
    <!-- 搜索、新增 -->
    <ParamsHead/>
    <!--表格 -->
    <ParamsList />
    <!-- 新增对话框 -->
    <ParamsAdd/>
  </div>
</template>

<script>
  import ParamsHead from '@/components/PubHead'
import ParamsList from "./paramsList.vue";
import ParamsAdd from './paramsAdd.vue';
export default {
  components: { ParamsList, ParamsHead, ParamsAdd },
};
</script>

<style>
</style>