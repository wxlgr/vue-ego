<template>
  <div>
    <div id="wangeditor" ref="wangeditor"></div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  props: {
    initText: {
      type: String,
      default: "",
    },
  },
  watch: {
    // 显示给定的初始化文本
    initText(text) {
      this.editor.txt.html(text);
    },
  },
  data() {
    return {
      editor: null,
      editorContent: "",
    };
  },
  mounted() {
    let editor = new wangEditor(this.$refs.wangeditor);
    editor.create();

    editor.config.onchange = (newHtml) => {
      this.editorContent = newHtml;
      this.$emit("onEditor", newHtml);
    };

    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    this.editor = editor;
  },
};
</script>

<style lang="less" scoped>
</style>