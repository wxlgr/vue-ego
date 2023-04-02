<template>
  <el-table border :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="规格参数ID" width="100">
    </el-table-column>
    <el-table-column prop="itemCatId" label="产品管理ID" width="100">
    </el-table-column>
    <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
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
    };
  },
  computed: {
    ...mapState("pubModule", ["search"]),
  },
  watch: {
    // search搜索关键字变化
    search(newSearch) {
      api
        .paramssearch({ search: newSearch })
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
  mounted() {
    this.http(1);
    // 需要更新时
    this.$bus.$on("onRefresh", (flag) => {
      this.http(1);
    });
  },
  methods: {
    http(page) {
      api
        .selectItemParamAll({ page })
        .then(({ data }) => {
          data.result && (this.tableData = data.result)
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDelete(index, row) {
      console.log(index, row);

      // 提醒确认
      this.$confirm("此操作将删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          api
            .deleteParams({ id: row.id })
            .then(({ data }) => {
              // 消息提示
              this.$message({
                message: data.msg,
                duration: 2000,
                showClose: true,
                type: data.status === 200 ? "success" : "error",
              });

              // 重新请求数据,刷新页面
              this.http(1);
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

<style>
</style>