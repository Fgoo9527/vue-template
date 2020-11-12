<template>
  <a-spin :spinning="loading">
    <a-table :data-source="list" rowKey="id">
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
      <a-table-column key="action" title="Actions" data-index="action">
        <template v-slot="{ record }">
          <span>
            <a-button
              type="primary"
              size="small"
              @click="handleToEdit(record.id)"
              >Edit</a-button
            >
          </span>
        </template>
      </a-table-column>
    </a-table>
  </a-spin>
</template>
<script>
import { fetchList } from '@/api/article'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const list = ref(null)
    const total = ref(0)
    const listQuery = ref({ page: 1, limit: 20 })
    const loading = ref(false)
    const getList = () => {
      loading.value = true
      fetchList(listQuery.value).then((response) => {
        list.value = response.data.items
        total.value = response.data.total
        loading.value = false
      })
    }
    const handleToEdit = (id) => {
      console.log(id)
      router.push('/example/edit/' + id)
    }
    onMounted(() => {
      getList()
    })
    return {
      list,
      handleToEdit,
      loading
    }
  }
})
</script>
