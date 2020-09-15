<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { category } from '@/type'

export default defineComponent({
  setup() {
    const activeKey = ref('2')
    return {
      activeKey,
    }
  },
})
</script>

<style scoped>
.tags {
  width: 75%;
  margin: 0 auto;
  box-shadow: 3px 2px 3px #ccc;
  padding: 10px 0;
}
.tag-item {
  cursor: pointer;
  padding: 10px 15px;
}
.is-active {
  border-bottom: 2px solid #00b7c2;
}
</style>