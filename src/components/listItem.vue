<template>
  <div class="item">
    <div>
      {{item.name}}
    </div>
    <a-checkbox v-model:checked="checked" @change="choose"/>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props) {
    const checked = ref(props.item.checked)
    const choose = () => {

    }
    return {
      checked,
      choose
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
})
</script>

<style lang="less" scoped>
.item{
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
</style>
