<template>
    <div class="head">
      <el-form inline ref="searchForm" :model="search"
      @submit.native.prevent>
        <el-form-item >
          <el-input class="searh-input"
            v-model="search.content"
            prefix-icon="el-icon-search"
            placeholder="输入你要查找的关键字"
            @keyup.enter.native="onSubmit"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  export default {
    data() {
      return {
        search: {
          content: "",
        },
      };
    },
    methods: {
      ...mapMutations("pubModule",['setSearch']),
      onSubmit() {
        // 将搜索关键字保存至vuex
        this.setSearch(this.search.content)

      },
      onAdd(){
        // 弹出添加框的控制事件
          this.$bus.$emit("showAddDialog",true)
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  
    .searh-input{
      width: 300px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  
  </style>