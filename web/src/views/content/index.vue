<template>
  <div class="tags">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      closable
      :type="tag.type"
      @close="handleClose(tag)"
      @click="handClick(tag)"
    >
      {{ tag.name }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
      >+ 添加广告</el-button
    >

    <el-table class="list" border :data="tableData" style="width: 100%" >
      <el-table-column prop="name" label="名字" width="180" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="url" label="地址" width="180" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="image" label="图片" show-overflow-tooltip> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../../api";
const tagTypesArr = ["success", "info", "waring", "danger"];
export default {
  data() {
    return {
      tags: [],
      inputVisible: false,
      inputValue: "",

      //
      tableData: [],
    };
  },
  mounted() {
    this.http();
  },
  methods: {
    //获取内容分类数据
    http() {
      api
        .getContentTitle()
        .then(({ data }) => {
          const newTags = data.result.map((item, index) => {
            return {
              ...item,
              name: item.name,
              type: tagTypesArr[index % tagTypesArr.length],
            };
          });
          this.tags = newTags;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 点击tag
    handClick(tag) {
      api.getContentList({ pid: tag.pid }).then(({ data }) => {
        if(data.status===200){
          this.tableData=data.result
        }else{
          this.tableData=[]
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    // 删除
    handleClose(tag) {
      api
        .deleteContent({ pid: tag.pid })
        .then(({ data }) => {
          // 消息提醒
          this.$message({
            message: data.msg,
            duration: 2000,
            showClose: true,
            type: data.status === 200 ? "success" : "error",
          });
          if (data.status === 200) {
            // 删除成功
            // 重新获取数据
            this.http();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 显示输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // enter回车添加
    handleInputConfirm() {
      let inputValue = this.inputValue.trim();

      if (inputValue) {
        api.addContent({ name: inputValue }).then(({ data }) => {
          // 消息提醒
          this.$message({
            message: data.msg,
            duration: 2000,
            showClose: true,
            type: data.status === 200 ? "success" : "error",
          });
          // 添加
          if (data.status === 200) {
            this.http();
          }
        });
      }

      //
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="less" scoped>
.tags {
  text-align: left;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.list{
  margin-top: 10px;
}
</style>