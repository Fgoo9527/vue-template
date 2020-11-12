<template>
  <a-card>
    <upload-excel
      :on-success="handleSuccess"
      @on-change="change"
      style="margin-bottom: 10px"
    ></upload-excel>
    <a-table :columns="columns" :data-source="data" :loading="loading" bordered>
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import UploadExcel from '@/components/UploadExcel.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { UploadExcel },
  setup() {
    const handleSuccess = ({ results, header }) => {
      data.value = results
      columns.value = header
    }
    const columns = ref([])
    const data = ref([])
    const loading = ref(false)
    const change = (val) => {
      loading.value = val
    }
    return {
      handleSuccess,
      columns,
      data,
      loading,
      change
    }
  }
})
</script>
