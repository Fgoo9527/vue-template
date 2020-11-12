<template>
  <div id="vditor" />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import Vditor from 'vditor'
// import readme from '../../../../README.md'

export default defineComponent({
  setup() {
    const contentEditor = ref('')
    // console.log(readme)
    onMounted(() => {
      contentEditor.value = new Vditor('vditor', {
        height: 'auto',
        width: 'auto',
        toolbarConfig: {
          pin: true
        },
        cache: {
          enable: false
        },
        'icon': 'ant',
        'mode': 'sv',
        'preview': {
          'mode': 'both'
        },
        after: () => {
        // this.contentEditor.setValue('hello, Vditor + Vue!')
        }
      })
    })
    return {
      contentEditor
    }
  }
})
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/vditor/dist/index.css');
</style>
<style scoped lang='less'>

#vditor{
  width: 100%;
  height: calc(100vh - 150px);
}
</style>
