<template>
  <div>
    <el-dialog title="修改商品" width="70%" :visible.sync="dialogUpdateVisible">
      <el-form label-width="70px" :model="UpdateForm" ref="UpdateForm">
        <el-form-item label="商品类目">
          <el-button
            type="primary"
            class="category"
            @click="dialogCategoryVisible = true"
            >类目选择</el-button
          >
          <span style="margin-left: 10px">{{ treeData.name }}</span>
          <el-dialog
            title="类目选择"
            width="50%"
            :visible.sync="dialogCategoryVisible"
            append-to-body
          >
            <ProductTree @onTree="getTreeData" />
            <span slot="footer" class="dialog-footer">
              <el-button
                @click="
                  dialogCategoryVisible = false;
                  treeText = '';
                "
                >取 消</el-button
              >
              <el-button type="primary" @click="dialogCategoryVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input type="text" v-model="UpdateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点">
          <el-input type="text" v-model="UpdateForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input type="text" v-model="UpdateForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input type="text" v-model="UpdateForm.num"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-button
            type="primary"
            class="uploadBtn"
            @click="dialogUploadVisible = true"
            >上传图片</el-button
          >
          <el-image fit="fit" :src="file.path || ''" class="preViewPic">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <el-dialog
            title="上传图片"
            width="50%"
            :visible.sync="dialogUploadVisible"
            append-to-body
          >
            <ProductUpload @onUpload="getFile" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogUploadVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogUploadVisible = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品描述">
          <WangEditor @onEditor="getEditorData" :initText="editorText" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
      // 控制修改弹窗
      dialogUpdateVisible: false,
      dialogCategoryVisible: false,
      dialogUploadVisible: false,
      UpdateForm: {},
      // 类别tree树形的数据
      treeData: {},
      // 上传的图片信息
      file: {},
      // 富文本编辑器的值
      editorText: "",
    };
  },
  mounted() {
    this.$bus.$on("showUpdateDialog", (row) => {
      // console.log(row);
      // 显示弹窗
      this.dialogUpdateVisible = true;
      // 请求数据

      api
        .preUpdateItem({ id: row.id })
        .then(({ data }) => {
          this.showData(data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  methods: {
    // 将查询到的数据填充到对应位置
    showData(result) {
      this.treeData = { name: result.cid, cid: result.cid };

      //请求来的数据
      const { title, image, sellPoint, price, num, descs, id } = result;
      this.thisId = id;
      //富文本内容
      this.editorText = descs;
      this.file = { path: image };
      const temp = {
        name: title,
        num,
        price,
        sellPoint,
      };
      this.UpdateForm = temp;
    },

    getTreeData(data) {
      this.treeData = data;
    },
    getFile({ file }) {
      const newFile = {
        ...file,
        path: base.baseUrl+'/upload/'+file.filename,
      };
      this.file = newFile;
      console.log(this.file);
    },
    getEditorData(str) {
      this.editorText = str;
    },

    // 点击确认修改
    onUpdate() {
      const { name, num, price, sellPoint } = this.UpdateForm;
      const params = {
        title: name,
        cid: this.treeData.cid,
        price,
        sellPoint,
        num,
        desc: this.editorText,
        image: this.file.path,
        id: this.thisId,
      };
      // console.log(params);

      api
        .updateTbItem(params)
        .then(({ data }) => {
          console.log(data);
          if (data.status === 200) {
            // 关闭对话框
            this.dialogUpdateVisible = false;
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