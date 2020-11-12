<template>
  <div ref="imgTooles">
    <img
      @click="imageChange($event)"
      v-for="(src, index) in images"
      :key="index"
      :data-original="`${src}`"
      :src="src"
      class="img"
    />
  </div>
</template>
<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup() {
    const ctx = getCurrentInstance()
    const initImageTools = () => {
      const viewer = new Viewer(ctx.refs.imgTooles, {
        url: 'data-original',
        show: () => {
          viewer.update()
        },
        hide: () => {
          viewer.destroy()
        }
      })
    }
    const imageChange = (e) => {
      if (e.target.nodeName === 'IMG') {
        initImageTools()
      }
    }
    return {
      imageChange
    }
  }
})
</script>
<style lang="less" scoped>
.img {
  width: 330px;
  margin: 10px;
  cursor: pointer;
}
</style>
