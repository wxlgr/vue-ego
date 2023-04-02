<template>
  <div>
    <!-- 搜索 -->
    <ProductHead />


    <!-- 表格 -->
    <ProductList />
    <!-- 分页 -->
    <ProductPagination />

    <!-- 新增弹窗,与ProductHead同级，所有用$bus传递数据 -->
    <ProductAdd />
    <ProductUpdate />
  </div>
</template>

<script>
import ProductHead from "../../components/PubHead";
import ProductList from "./productList.vue";
import ProductAdd from "./productAdd.vue";
import ProductPagination from "./productPagination.vue";
import ProductUpdate from "./productUpdate.vue";

export default {
  components: { ProductHead, ProductList, ProductPagination, ProductAdd, ProductUpdate },
};
</script>

<style>
</style>