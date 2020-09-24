<template>
  <div class="home">
    <a-tabs type="card">
      <a-tab-pane key="1" tab="全部">
        <div class="frame">
          <listItem :item="i" v-for="i in all" :key="i.name" />
        </div>
        <div></div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="已做">
        <div class="frame">
          <listItem :item="i" v-for="i in done" :key="i.name" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="未做">
        <div class="frame">
          <listItem :item="i" v-for="i in untreated" :key="i.name" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import listItem from '../components/listItem'

export default defineComponent({
  name: 'Home',
  setup() {
    const all = ref([
      {
        name: '测试1',
        checked: true
      },
      {
        name: '测试2',
        checked: false
      },
      {
        name: '测试3',
        checked: false
      }
    ])
    const done = ref([])
    const untreated = ref([])
    done.value = all.value.filter(i => {
      return i.checked === true
    })
    untreated.value = all.value.filter(i => {
      return i.checked !== true
    })
    return {
      all,
      done,
      untreated
    }
  },
  components: {
    listItem
  }
})
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .frame {
    width: 35%;
    border: 1px solid #ccc;
    padding: 10px 20px;
  }
}
</style>
