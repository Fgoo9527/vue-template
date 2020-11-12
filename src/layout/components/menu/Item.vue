<template>
  <icon-font v-if="icon" :type="icon"/>
  <span>{{ title }}</span>
  <a-tag :color="tag.color" v-if="tag.value"> {{ tag.value }} </a-tag>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    tag: {
      type: Object,
      default: () => {
        return {
          value: '',
          color: '#108ee9'
        }
      }
    }
  }
})
</script>
<style lang="less" scoped>
::v-deep.ant-tag {
  float: right;
  padding-right: 4px;
  padding-left: 4px;
  margin-top: 10px;
  border: none;
}
</style>
