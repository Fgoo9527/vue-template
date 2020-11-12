<template>
  <icon-font
    @click="toggleFullScreen"
    v-if="ifFullScreen"
    type="iconcompress"
    class="nav-icon"
  />
  <icon-font
    @click="toggleFullScreen"
    v-else
    type="iconexpend"
    class="nav-icon"
  />
</template>
<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
export default defineComponent({
  setup() {
    const ifFullScreen = ref(true)
    const toggleFullScreen = () => {
      if (!screenfull.isEnabled) {
        return false
      }
      screenfull.toggle()
    }
    const change = () => {
      ifFullScreen.value = screenfull.isFullscreen
    }
    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change)
      }
    })
    onUnmounted(() => {
      if (screenfull.isEnabled) {
        screenfull.off('change', change)
      }
    })
    return {
      ifFullScreen,
      toggleFullScreen
    }
  }
})
</script>
<style lang="less" scoped>
</style>
