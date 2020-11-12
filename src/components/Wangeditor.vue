<template>
  <div ref="edit" style="z-index: 1" />
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import E from 'wangeditor'
export default defineComponent({
  emits: ['change'],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.instance.txt.html(val)
      }
    }
  },
  setup(props, { emit }) {
    const edit = ref()
    const instance = ref()
    onMounted(() => {
      instance.value = new E(edit.value)
      Object.assign(instance.value.config, {
        onchange() {
          emit('change', instance.value.txt.html())
        }
      })
      instance.value.create()
    })
    onBeforeUnmount(() => {
      instance.value.destroy()
      instance.value = null
    })
    return {
      instance,
      edit
    }
  }
})
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
