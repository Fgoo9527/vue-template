<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    rowKey='name'
    bordered
  >
    <template
      v-for="col in ['name', 'age', 'address']"
      v-slot:[col]="{ text, record }"
      :key="col"
    >
      <div>
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template v-slot:operation="{ record }">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a
            v-bind="editingKey !== '' ? { disabled: 'disabled' } : {}"
            @click="edit(record.key)"
          >
            Edit
          </a>
        </span>
      </div>
    </template>
  </a-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const columns = ref([
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        slots: { customRender: 'name' }
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        slots: { customRender: 'age' }
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        slots: { customRender: 'address' }
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        slots: { customRender: 'operation' }
      }
    ])
    const _data = []
    for (let i = 0; i < 100; i++) {
      _data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      })
    }
    const data = ref(_data)
    const _cacheData = _data.map((item) => ({ ...item }))
    const cacheData = ref(_cacheData)
    const editingKey = ref('')
    const handleChange = (value, key, column) => {
      const newData = [...data.value]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        data.value = newData
      }
    }
    const edit = (key) => {
      const newData = [...data.value]
      const target = newData.filter((item) => key === item.key)[0]
      editingKey.value = key
      if (target) {
        target.editable = true
        data.value = newData
      }
    }
    const save = (key) => {
      const newData = [...data.value]
      const newCacheData = [...cacheData.value]
      const target = newData.filter((item) => key === item.key)[0]
      const targetCache = newCacheData.filter((item) => key === item.key)[0]
      if (target && targetCache) {
        delete target.editable
        data.value = newData
        Object.assign(targetCache, target)
        cacheData.value = newCacheData
      }
      editingKey.value = ''
    }
    const cancel = (key) => {
      const newData = [...data.value]
      const target = newData.filter((item) => key === item.key)[0]
      editingKey.value = ''
      if (target) {
        Object.assign(
          target,
          cacheData.value.filter((item) => key === item.key)[0]
        )
        delete target.editable
        data.value = newData
      }
    }
    const pagination = ref({
      pageSize: 10,
      showLessItems: true,
      showQuickJumper: true,
      showSizeChanger: true
    })
    return {
      columns,
      data,
      cacheData,
      editingKey,
      handleChange,
      edit,
      save,
      cancel,
      pagination
    }
  }
})
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
