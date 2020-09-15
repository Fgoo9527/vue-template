<template>
  <div id="app">
    <Layout />
  </div>
</template>
<script>
import Layout from '@/layout/index'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Layout,
  },
})
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
