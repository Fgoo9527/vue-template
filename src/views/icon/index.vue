<template>
  <a-card class="icon-container">
    <a-alert
      message="点击图标即可复制代码"
      type="success"
      show-icon
      style="margin-bottom: 20px"
    ></a-alert>
    <a-row :gutter="[20, 20]">
      <a-col :span="24">
        <a-input-search
          v-model:value="queryForm.title"
          placeholder="图标名称"
          enter-button
          @search="queryData"
          @keyup.enter="queryData"
        />
      </a-col>
      <template v-if="iconList.length > 0">
        <a-col
          v-for="(item, index) in iconList"
          :key="index"
          :lg="2"
          :md="3"
          :sm="8"
          :xl="2"
          :xs="6"
        >
          <a-tooltip placement="bottom">
            <template v-slot:title>
              <span>{{ item }}</span>
            </template>
            <a-card
              hoverable
              shadow="hover"
              @click="handleCopyIcon(item, $event)"
              class="icon-list"
            >
              <icon-font
                :type="item"
                class="icon-font"
              ></icon-font>
            </a-card>
          </a-tooltip>
        </a-col>
      </template>
      <a-col :span="24" v-else>
        <a-empty />
      </a-col>
      <a-col :span="24">
        <a-pagination
          show-quick-jumper
          v-model:current="queryForm.current"
          v-model:pageSize="queryForm.pageSize"
          :total="total"
          @change="handleCurrentChange"
          @showSizeChange="handlePageSizeChange"
        />
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getIconList } from '@/api/icon'
import clip from '@/utils/clipboard'
export default defineComponent({
  setup() {
    const iconList = ref([])
    const total = ref(0)
    const queryForm = ref({
      current: 1,
      pageSize: 72,
      title: ''
    })
    const fetchData = async() => {
      const { data, totalCount } = await getIconList(queryForm.value)
      iconList.value = data
      total.value = totalCount
    }
    const handlePageSizeChange = (val) => {
      queryForm.value.pageSize = val
      fetchData()
    }
    const handleCurrentChange = (val) => {
      queryForm.value.current = val
      fetchData()
    }
    const queryData = () => {
      queryForm.value.current = 1
      fetchData()
    }
    const handleCopyIcon = (item, event) => {
      clip(`<icon-font type="${item}"></icon-font>`)
    }
    onMounted(() => {
      fetchData()
    })
    return {
      iconList,
      queryForm,
      total,
      handlePageSizeChange,
      handleCurrentChange,
      queryData,
      handleCopyIcon
    }
  }
})
</script>
<style lang="less" scoped>
.icon-container {
  .icon-list {
    ::v-deep .ant-card-body {
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-font {
        font-size: 36px;
      }
    }
  }
}
</style>
