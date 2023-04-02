<template>
  <el-dialog title="添加规格参数" width="45%" :visible.sync="dialogAddVisible">
    <ParamsTree @onTree="getTreeData" />
    <el-dialog
      width="40%"
      title="添加参数"
      :visible.sync="innerVisible"
      append-to-body
      ><el-button type="primary" size="medium" @click="addMainParams"
        >添加主结构</el-button
      >
      <el-form :model="paramsDoMain" ref="paramsDoMain" label-width="70px">
        <div v-for="(item, index) in paramsDoMain.domains" :key="index">
          <el-form-item class="mainParam" label="规格参数">
            <el-input placeholder="添加主结构" v-model="item.value"></el-input>
            <el-button type="primary" size="mini" @click="addChildParams(index)"
              >添加子结构</el-button
            >
            <el-tag
              class="maintag"
              hit
              closable
              type="danger"
              @close="closeMainTag(index)"
            >
            </el-tag>
            <div
              class="childParam"
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
            >
              <el-tag
                class="childtag"
                hit
                closable
                type="danger"
                @close="closeChildTag(index, childIndex)"
              >
                <el-input
                  placeholder="添加子结构"
                  v-model="childItem.value"
                ></el-input>
              </el-tag>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="finishHandle">确 定</el-button>
      </span>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取 消</el-button>
      <el-button type="primary" @click="innerVisible = true;">确 定</el-button>
    </span>
  </el-dialog>
</template>
  
  <script>
import api from "../../api";
import ParamsTree from "@/components/Tree";
export default {
  data() {
    return {
      dialogAddVisible: false,
      innerVisible: false,
      paramsDoMain: {
        domains: [
          {
            value: "",
            children: [{ childValue: "" }],
          },
          {
            value: "",
            children: [{ childValue: "" }],
          },
        ],
      },
      treeData:{}
    };
  },
  mounted() {
    this.$bus.$on("showAddDialog", (flag) => (this.dialogAddVisible = flag));
  },
  methods: {
    //  添加主结构
    addMainParams() {
      this.paramsDoMain.domains.push({
        value: "",
        children: [{ childValue: "" }],
      });
    },
    // 添加子结构
    addChildParams(idx) {
      this.paramsDoMain.domains[idx].children.push({ childValue: "" });
    },

    //去掉当前主结构
    closeMainTag(index) {
      this.paramsDoMain.domains.splice(index, 1);
    },
    //去掉当前子结构
    closeChildTag(index, childIndex) {
      this.paramsDoMain.domains[index].children.splice(childIndex, 1);
    },
    //获取treedata
    getTreeData(data) {
      this.treeData=data
    },
    // 添加参数
    finishHandle() {
      api
        .insertItemParam({
          itemCatId: this.treeData.cid,
          paramData: JSON.stringify(this.paramsDoMain.domains),
        })
        .then(({ data }) => {
          if (data.status === 200) {
            // 关闭对话框
            this.innerVisible=false
            this.dialogAddVisible = false;
            // 通知表格更新
            this.$bus.$emit("onRefresh", true);
          }
          this.$message({
            message: data.msg,
            duration: 2000,
            showClose: true,
            type: data.status === 200 ? "success" : "error",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  components: {
    ParamsTree,
  },
};
</script>
  
<style lang="less" scoped>
.mainParam {
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 10px 0;
  padding: 10px;
  position: relative;
}
.childParam {
  margin: 10px 0;
}

.maintag,
.childtag {
  padding: 0;
  border: none;
  background-color: transparent;
}
.maintag {
  position: absolute;
  left: -87px;
  top: 6px;
}
</style>