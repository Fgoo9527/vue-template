<template>
  <a-card>
    <a-button
      style="margin-bottom: 20px"
      type="primary"
      @click="handleToClearAll"
      >{{$t('errorLog.clearAll')}}</a-button
    >
    <a-table :columns="columns" :data-source="data" rowKey="info" bordered>
      <template #name="{ text }">
        <a-tag color="red">
          {{ text }}
        </a-tag>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const data = computed(() => store.getters.errorLogs)
    const columns = ref([
      {
        title: 'Msg',
        dataIndex: 'err.message',
        key: 'err.message',
        slots: { customRender: 'name' },
        width: 200
      },
      {
        title: 'Info',
        dataIndex: 'info',
        key: 'info',
        slots: { customRender: 'name' },
        width: 200
      },
      {
        title: 'Url',
        dataIndex: 'url',
        key: 'url',
        slots: { customRender: 'name' },
        width: 200
      },
      {
        title: 'Stack',
        dataIndex: 'err.stack',
        key: 'err.stack'
      }
    ])
    const handleToClearAll = () => {
      store.dispatch('errorLog/clearErrorLog')
    }
    return {
      columns,
      data,
      handleToClearAll
    }
  }
})
</script>
