<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    :action="action"
    list-type="picture"
    :auto-upload="false"
    multiple
    :on-success="onSuccess"
  >
    <el-button slot="trigger" size="small" type="primary"
      ><i class="el-icon-folder-add"></i> 选取文件</el-button
    >
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      ><i class="el-icon-upload"></i> 上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件
    </div>
  </el-upload>
</template>

<script>
import base from '../../api/base';
export default {
  data() {
    return {
      action: base.uploadAction,//上传链接
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSuccess(res,file){
      this.$emit('onUpload',res)
    }
  },
};
</script>

<style lang="less" scoped>
</style>