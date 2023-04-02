<template>
  <div class="container">
    <MainNav/>
    <router-view class="maincontent"></router-view>
  </div>
</template>

<script>
import MainNav from "../components/MainNav";
export default {
  components: {
    MainNav,
  },
};
</script>

<style lang="less" scoped>

.maincontent{
  margin-left: 210px;
  margin-top: 10px;
  margin-right: 10px;
}
</style>