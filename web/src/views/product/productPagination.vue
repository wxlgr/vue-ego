<template>
    <el-pagination class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageChoseArr"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    >
    </el-pagination>
</template>

<script>
import api from "@/api";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      totalNum: 0,
      pageChoseArr:[3,5,7,9]
    };
  },
  mounted() {
    //首次
    this.getTotalPage();
    // 需要更新时
    this.$bus.$on("onRefresh", (flag) => {
      this.getTotalPage();
    });
  },

  computed: {
    ...mapState("productModule", ["pageSize"]),
  },
  methods: {
    ...mapMutations("productModule", ["setPage", "setPageSize"]),

    // 每页显示条数改变
    handleSizeChange(val) {
      // this.$bus.$emit("onPageSize",val)
      this.setPageSize(val);
    },
    // 当前页改变

    handleCurrentChange(val) {
      console.log(val);
      // this.$bus.$emit("onPage",val)
      this.setPage(val);
    },

    // 获取数据总数
    getTotalPage() {
      api
        .getTotalProductNum(null)
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.totalNum = res.data.result[0].totalNum;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
  .pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>