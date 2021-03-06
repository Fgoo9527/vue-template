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
    <a-table :data-source="list" rowKey="id" :spinning="loading" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" bordered>
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
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        let _list = []
        selectedRowKeys.value.forEach(element => {
          _list = [..._list, ...list.value.filter(item => item.id === element)]
        })
        const data = formatJson(filterVal, _list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: filename.value,
          autoWidth: autoWidth.value,
          bookType: bookType.value
        })
        selectedRowKeys.value = []
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
    const selectedRowKeys = ref([])
    const onSelectChange = (keys) => {
      selectedRowKeys.value = keys
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
      bookType,
      selectedRowKeys,
      onSelectChange
    }
  }
})
</script>
