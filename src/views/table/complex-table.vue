<template>
  <a-table :columns="columns" :data-source="data" :pagination="pagination">
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template v-slot:customTitle>
      <span><smile-outlined /> Name</span>
    </template>
    <template v-slot:tags="{ text: tags }">
      <span>
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template>
    <template v-slot:action="{ record }">
      <span>
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <down-outlined /> </a>
      </span>
    </template>
    <template
      v-slot:filterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column
      }"
    >
      <div style="padding: 8px">
        <a-input
          :ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template v-slot:icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template v-slot:filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
  </a-table>
</template>

<script>
import {
  SmileOutlined,
  DownOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance()
    const columns = ref([
      {
        dataIndex: 'name',
        key: 'name',
        slots: { title: 'customTitle', customRender: 'name' },
        filters: [
          {
            text: 'John Brown',
            value: 'John Brown'
          },
          {
            text: 'Jim Green',
            value: 'Jim Green'
          }
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value, record) =>
          record.address.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus()
            }, 0)
          }
        }
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        slots: { customRender: 'tags' }
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' }
      }
    ])
    const data = ref([
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ])
    const pagination = ref({
      pageSize: 10,
      showLessItems: true,
      showQuickJumper: true,
      showSizeChanger: true
    })
    const searchText = ref('')
    const searchedColumn = ref('')
    const searchInput = ref(null)
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm()
      searchText.value = selectedKeys[0]
      searchedColumn.value = dataIndex
      ctx.$forceUpdate()
    }
    const handleReset = (clearFilters) => {
      clearFilters()
      searchText.value = ''
    }
    return {
      columns,
      data,
      pagination,
      searchText,
      searchedColumn,
      searchInput,
      handleSearch,
      handleReset
    }
  },
  components: {
    SmileOutlined,
    DownOutlined,
    SearchOutlined
  }
})
</script>
