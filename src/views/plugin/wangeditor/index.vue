<template>
  <a-card>
    <div ref="edit" />
    <div class="editor-content" v-html="content" />
  </a-card>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import E from 'wangeditor'

export default defineComponent({
  setup() {
    const edit = ref()
    const content = ref()
    let instance
    onMounted(() => {
      instance = new E(edit.value)
      Object.assign(instance.config, {
        onchange() {
          content.value = instance.txt.html()
        }
      })
      instance.create()
      instance.txt
        .html(`<p><strong>wangEditor</strong> —— 轻量级 web 富文本编辑器，配置方便，使用简单。</p><ul>
        <li>官网：<a href="http://www.wangeditor.com/" target="_blank">www.wangEditor.com</a></li>
        <li>文档：<a href="http://www.wangeditor.com/doc" target="_blank">www.wangEditor.com/doc</a></li>
        <li>源码：<a href="https://github.com/wangeditor-team/wangeditor" target="_blank">github.com/wangeditor-team/wangEditor</a> （欢迎 star）</li>
        </ul>`)
    })
    onBeforeUnmount(() => {
      instance.destroy()
      instance = null
    })
    return {
      edit,
      content
    }
  }
})
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
