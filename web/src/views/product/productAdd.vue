<template>
  <el-dialog title="添加商品" width="70%" :visible.sync="dialogAddVisible">
    <el-form label-width="70px" :model="addForm" ref="addForm">
      <el-form-item label="商品类目">
        <el-button type="primary" class="category" @click="dialogCategoryVisible = true">类目选择</el-button>
        <span style="margin-left: 10px">{{ treeData.name }}</span>
        <el-dialog title="类目选择" width="50%" :visible.sync="dialogCategoryVisible" append-to-body>
          <ProductTree @onTree="getTreeData" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="
              dialogCategoryVisible = false;
            treeText = '';
            ">取 消</el-button>
            <el-button type="primary" @click="dialogCategoryVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input type="text" v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input type="text" v-model="addForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input type="text" v-model="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input type="text" v-model="addForm.num"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-button type="primary" class="uploadBtn" @click="dialogUploadVisible = true">上传图片</el-button>
        <el-image fit="fit" :src="file.path" class="preViewPic">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <el-dialog title="上传图片" width="50%" :visible.sync="dialogUploadVisible" append-to-body>
          <ProductUpload @onUpload="getFile" />
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogUploadVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogUploadVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品描述">
        <WangEditor @onEditor="getEditorData" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取 消</el-button>
      <el-button type="primary" @click="onAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import base from "@/api/base";
import ProductTree from "../../components/Tree/index.vue";
import ProductUpload from "./productUpload.vue";
import WangEditor from "./wangEditor.vue";
import api from "../../api";
export default {
  data() {
    return {
      dialogAddVisible: false,
      dialogCategoryVisible: false,
      dialogUploadVisible: false,
      addForm: {},
      treeData: {},
      file: {
        path: "",
      },
      editorText: "",
    };
  },
  mounted() {
    this.$bus.$on("showAddDialog", (flag) => (this.dialogAddVisible = flag));
  },
  methods: {
    getTreeData(data) {
      this.treeData = data;
    },

    // static\\upload\\1668101299679.jpg
    getFile({ file }) {
      const newFile = {
        ...file,
        path: base.baseUrl+'/upload/'+file.filename
      };
      this.file = newFile;
      // console.log(this.file);
    },
    getEditorData(str) {
      this.editorText = str;
    },
    onAdd() {
      const { name, num, price, sellPoint } = this.addForm;
      const params = {
        title: name,
        cid: this.treeData.cid,
        price,
        sellPoint,
        num,
        desc: this.editorText,
        image: this.file.path,
      };

      api
        .insert(params)
        .then(({ data }) => {
          console.log(data);
          if (data.status === 200) {
            // 关闭对话框
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

          // 清空表单
          this.addForm = {}
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    ProductTree,
    ProductUpload,
    WangEditor,
  },
};
</script>

<style lang="less" scoped>
.preViewPic {
  margin-top: 10px;
  display: block;
  height: 200px;
  width: 200px;

  i {
    font-size: 32px;
  }
}
</style>