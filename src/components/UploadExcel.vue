<template>
  <a-upload-dragger
    name="excelUploader"
    accept=".xlsx, .xls"
    :transform-file="transformFile"
    :showUploadList="false"
  >
    <p class="ant-upload-drag-icon">
      <icon-font type="iconfile-excel"></icon-font>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">
      Support for .xlsx or .xls upload
    </p>
  </a-upload-dragger>
</template>
<script>
import XLSX from 'xlsx'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    onSuccess: Function
  },
  emits: ['on-change'],
  setup(props, { emit }) {
    const excelData = ref({
      header: null,
      results: null
    })
    const transformFile = (file) => {
      emit('on-change', true)
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          results.forEach((element, index) => {
            if (!element.key) {
              element.key = index
            }
          })
          generateData({ header, results })
          emit('on-change', false)
          resolve()
        }
        reader.readAsArrayBuffer(file)
      })
    }
    const generateData = ({ header, results }) => {
      excelData.value.header = header
      excelData.value.results = results
      props.onSuccess && props.onSuccess(excelData.value)
    }
    const getHeaderRow = (sheet) => {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push({ title: hdr, dataIndex: hdr, key: hdr })
      }
      return headers
    }
    return {
      transformFile
    }
  }
})
</script>
