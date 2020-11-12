<template>
  <a-card>
    <a-table
      ref="dragTable"
      :data-source="list"
      rowKey="id"
      :spinning="loading"
      bordered
    >
      <a-table-column key="id" title="Id" data-index="id" />
      <a-table-column key="timestamp" title="Date" data-index="timestamp" />
      <a-table-column key="author" title="Author" data-index="author" />
      <a-table-column
        key="importance"
        title="Importance"
        data-index="importance"
      >
        <template v-slot="{ text: tags }">
          <span>
            <icon-font
              type="iconstar-fill"
              v-for="tag in tags"
              :key="tag"
              color="blue"
            ></icon-font>
          </span>
        </template>
      </a-table-column>
      <a-table-column key="status" title="Status" data-index="status">
        <template v-slot="{ text: tags }">
          <span>
            <a-tag color="blue">{{ tags }}</a-tag>
          </span>
        </template>
      </a-table-column>
      <a-table-column key="title" title="Title" data-index="title">
      </a-table-column>
    </a-table>
     <div class="list-item">
      <a-tag color="blue">{{ $t('table.dragTips1') }}</a-tag> {{ oldList }}
    </div>
    <div class="list-item">
      <a-tag color="blue">{{ $t('table.dragTips2') }}</a-tag> {{ newList }}
    </div>
  </a-card>
</template>
<script>
import { fetchList } from '@/api/article'
import {
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref
} from 'vue'
import Sortable from 'sortablejs'
export default defineComponent({
  setup() {
    const ctx = getCurrentInstance()
    const list = ref(null)
    const total = ref(0)
    const listQuery = ref({ page: 1, limit: 10 })
    const loading = ref(false)
    const oldList = ref([])
    const newList = ref([])
    const sortable = ref(null)
    const setSort = () => {
      const el = ctx.refs.dragTable.$el.querySelectorAll(
        '.ant-table-body > table > tbody'
      )[0]
      sortable.value = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: (evt) => {
          const targetRow = list.value.splice(evt.oldIndex, 1)[0]
          list.value.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = newList.value.splice(evt.oldIndex, 1)[0]
          newList.value.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
    const getList = async() => {
      loading.value = true
      const { data } = await fetchList(listQuery.value)
      list.value = data.items
      total.value = data.total
      loading.value = false
      oldList.value = list.value.map((v) => v.id)
      newList.value = oldList.value.slice()
      await nextTick()
      setSort()
    }
    onMounted(() => {
      getList()
    })
    return {
      list,
      loading,
      oldList,
      newList
    }
  }
})
</script>
<style scoped>
.list-item{
  margin-top: 15px;
}
</style>
