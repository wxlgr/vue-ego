<template>
  <el-table
    :data="tableData"
    border
    max-height="500"
    :default-sort="{ prop: 'id', order: 'descending' }"
  >
    <el-table-column
      label="商铺id"
      prop="id"
      sortable
      show-overflow-tooltip
      width="90"
    ></el-table-column>
    <el-table-column
      label="商品名称"
      prop="title"
      show-overflow-tooltip
      width="150"
    ></el-table-column>
    <el-table-column
      label="商品图片"
      prop="image"
      show-overflow-tooltip
      width="100"
    ></el-table-column>
    <el-table-column
      label="商品卖点"
      prop="sellPoint"
      show-overflow-tooltip
      width="200"
    ></el-table-column>
    <el-table-column
      label="商品价格"
      prop="price"
      show-overflow-tooltip
      width="80"
    ></el-table-column>
    <el-table-column
      label="商品数量"
      prop="num"
      show-overflow-tooltip
      width="80"
    ></el-table-column>
    <el-table-column label="商品描述" prop="descs" show-overflow-tooltip>
      <template slot-scope="scope">
        <div v-html="scope.row.descs"></div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      totalPages: 12,
      // 控制修改的弹窗是否显示
      showUpdateDialog: false,
    };
  },
  computed: {
    ...mapState("productModule", ["page", "pageSize"]),
    ...mapState("pubModule", ["search"]),
  },
  watch: {
    // 当前页改变
    page(newPage) {
      this.http(newPage, this.pageSize);
    },
    //每页显示条数改变
    pageSize(newPageSize) {
      this.http(this.page, newPageSize);
    },
    // search搜索关键字变化
    search(newSearch) {
      api
        .productsearch({ search: newSearch })
        .then(({ data }) => {
          const len = (data.result && data.result.length) || 0;
          this.$message({
            message: len > 0 ? `查询到${len}条结果` : data.msg,
            showClose: true,
            duration: 2000,
            type: len > 0 ? "success" : "info",
          });
          if (data.status === 200) {
            this.tableData = data.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //初始显示
  mounted() {
    this.http(1, 5);
    // 需要更新时
    this.$bus.$on("onRefresh", (flag) => {
      this.http(1, 5);
    });
  },
  methods: {
    // 获取表格产品数据
    http(page, pageSize) {
      api
        .getProductList({ page, pageSize })
        .then(({ data }) => {
          data.result && (this.tableData = data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑
    handleEdit(index, row) {
      // console.log(index, row);
      // 弹出修改框
      this.$bus.$emit("showUpdateDialog", row);
    },
    // 删除
    handleDelete(index, row) {
      // console.log(index, row);
      // 提醒确认
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          api
            .delete({ id: row.id })
            .then(({ data }) => {
              // 消息提示
              this.$message({
                message: data.msg,
                duration: 2000,
                showClose: true,
                type: data.status === 200 ? "success" : "error",
              });
              // 重新请求数据,刷新页面
              // 通知表格更新
              this.$bus.$emit("onRefresh", true);
            })
            .catch((err) => console.log(err));
        })
        .catch(() => {
          // 取消删除
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>>