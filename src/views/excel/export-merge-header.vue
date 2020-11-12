<template>
  <a-card>
    <a-row :gutter="20" style="margin-bottom: 20px">
      <a-col :span="5">
        <div style="display:flex;align-items:center">
          <label class="radio-label" style="padding-right: 10px">Filename:</label>
          <a-input
            placeholder="请输入文件名(默认excel-list)"
            v-model:value="filename"
            ref="userNameInput"
          >
            <template v-slot:prefix>
              <icon-font type="iconfile-excel"></icon-font>
            </template>
          </a-input>
        </div>
      </a-col>
      <a-col :span="4">
        <div style="display:flex;align-items:center">
          <label class="radio-label" style="padding-right: 10px">Cell Auto-Width:</label>
          <a-radio-group v-model:value="autoWidth">
            <a-radio-button :value="true">
              true
            </a-radio-button>
            <a-radio-button :value="false">
              false
            </a-radio-button>
          </a-radio-group>
        </div>
      </a-col>
       <a-col :span="3">
        <div style="display:flex;align-items:center">
          <label class="radio-label" style="padding-right: 10px">Book Type:</label>
          <a-select
            v-model:value="bookType"
            ref="select"
          >
            <a-select-option value="xlsx">
              xlsx
            </a-select-option>
            <a-select-option value="csv">
              csv
            </a-select-option>
            <a-select-option value="txt">
              txt
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="3">
        <a-button
          :loading="downloadLoading"
          type="primary"
          @click="handleDownload"
        >
          <template v-slot:icon>
            <icon-font type="icondownload"></icon-font> </template
          >Export Excel
        </a-button>
      </a-col>
    </a-row>
    <a-table :data-source="list" rowKey="id" :spinning="loading" bordered>
      <a-table-column key="id" title="Id" data-index="id" />
      <a-table-column-group>
        <template v-slot:title><span style="color: #1890ff">Main Information</span></template>
        <a-table-column key="title" title="Title" data-index="title" />
        <a-table-column key="author" title="Author" data-index="author" />
        <a-table-column key="pageviews" title="Readings" data-index="pageviews" />
      </a-table-column-group>
      <a-table-column key="timestamp" title="Date" data-index="timestamp" />
    </a-table>
  </a-card>
</template>
<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  setup() {
    const list = ref(null)
    const total = ref(0)
    const listQuery = ref({ page: 1, limit: 20 })
    const loading = ref(false)
    const downloadLoading = ref(false)
    const getList = () => {
      loading.value = true
      fetchList(listQuery.value).then((response) => {
        list.value = response.data.items
        total.value = response.data.total
        loading.value = false
      })
    }
    const filename = ref('')
    const autoWidth = ref(true)
    const bookType = ref('xlsx')
    const handleDownload = () => {
      downloadLoading.value = true
      import('@/utils/Export2Excel').then((excel) => {
        const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
        const header = ['', 'Title', 'Author', 'Readings', '']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const _list = list.value
        const data = formatJson(filterVal, _list)
        const merges = ['A1:A2', 'B1:D1', 'E1:E2']
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data,
          filename: filename.value,
          autoWidth: autoWidth.value,
          bookType: bookType.value
        })
        downloadLoading.value = false
      })
    }
    const formatJson = (filterVal, jsonData) => {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
    onMounted(() => {
      getList()
    })
    return {
      list,
      loading,
      downloadLoading,
      handleDownload,
      filename,
      autoWidth,
      bookType
    }
  }
})
</script>
