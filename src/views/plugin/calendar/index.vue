<template>
  <a-card>
    <a-calendar
      v-model:value="dateValue"
      @panelChange="onPanelChange"
      @select="onSelect"
      :mode="calendarMode"
    >
      <template v-slot:dateCellRender="{ current: value }">
        <ul class="events">
          <li v-for="item in getListData(value)" :key="item.content">
            <a-badge
              :status="item.type"
              :text="item.content"
              v-if="item.content"
            />
          </li>
        </ul>
      </template>
      <template v-slot:monthCellRender="{ current: value }">
        <div v-if="getMonthData(value)" class="notes-month">
          <section>你有{{ getMonthData(value) }}件事情待办</section>
        </div>
      </template>
    </a-calendar>
  </a-card>
  <a-modal
    v-model:visible="visible"
    :title="modalTitle"
    :afterClose="afterClose"
  >
    <template v-slot:footer>
      <a-button @click="handleToCancel"> 关闭 </a-button>
      <a-button type="primary" @click="handleToEdit">
        {{ okText }}
      </a-button>
    </template>
    <ul class="events" v-if="modalList.length > 0 && !isEdit">
      <li v-for="item in modalList" :key="item.content">
        <a-badge :status="item.type" :text="item.content" v-if="item.content" />
      </li>
    </ul>
    <a-empty v-if="modalList.length === 0 && !isEdit">
      <a-button type="primary" @click="handleToAdd">新增</a-button>
    </a-empty>
    <template v-if="isEdit">
      <template v-for="item in modalList" :key="item.content">
        <a-input-group compact>
          <a-select v-model:value="item.type">
            <a-select-option value="warning"> warning </a-select-option>
            <a-select-option value="success"> success </a-select-option>
            <a-select-option value="error"> error </a-select-option>
          </a-select>
          <a-input
            style="width: 50%"
            v-model:value="item.content"
            placeholder="请输入信息"
          />
          <a-button @click="handleToRemove(item)">
            <template #icon>
              <icon-font type="iconclose" />
            </template>
          </a-button>
        </a-input-group>
      </template>
      <a-button type="dashed" block @click="handleToAdd"> 新增 </a-button>
    </template>
  </a-modal>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { fetchList } from '@/api/calendar'
export default defineComponent({
  setup() {
    const calendarMode = ref('month')
    const dateValue = ref('')
    const eventList = ref({})
    const visible = ref(false)
    const modalTitle = ref('')
    const modalList = ref([])
    const okText = ref('编辑')
    const getListData = (value) => {
      if (
        eventList.value[value.year()] &&
        eventList.value[value.year()][value.month()] &&
        eventList.value[value.year()][value.month()][value.date()]
      ) {
        return eventList.value[value.year()][value.month()][value.date()]
      } else {
        return []
      }
    }
    const getMonthData = (value) => {
      if (
        eventList.value[value.year()] &&
        eventList.value[value.year()][value.month()]
      ) {
        return Object.values(
          eventList.value[value.year()][value.month()]
        ).flat().length
      } else {
        return 0
      }
    }
    const onPanelChange = (value, mode) => {
      calendarMode.value = mode
    }
    const onSelect = (value) => {
      if (calendarMode.value === 'month') {
        modalTitle.value = `${value.year()}-${value.month()}-${value.date()}`
        if (
          eventList.value[value.year()] &&
          eventList.value[value.year()][value.month()] &&
          eventList.value[value.year()][value.month()][value.date()]
        ) {
          modalList.value =
            eventList.value[value.year()][value.month()][value.date()]
        } else {
          if (!eventList.value[value.year()]) {
            eventList.value[value.year()] = { [value.month()]: {}}
          } else if (!eventList.value[value.year()][value.month()]) {
            eventList.value[value.year()][value.month()] = { [value.day()]: [] }
          }
          modalList.value = eventList.value[value.year()][value.month()][
            value.date()
          ] = []
        }
        visible.value = true
      } else {
        calendarMode.value = 'month'
      }
    }
    const removeEmpty = (list) => {
      if (list.findIndex((item) => item.content === '') === -1) {
        return list
      } else {
        list.splice(
          list.findIndex((item) => item.content === ''),
          1
        )
        return removeEmpty(list)
      }
    }
    const isEdit = ref(false)
    const handleToEdit = () => {
      if (isEdit.value) {
        removeEmpty(modalList.value)
        isEdit.value = false
        okText.value = '编辑'
      } else {
        isEdit.value = true
        okText.value = '完成'
      }
    }
    const handleToCancel = (e) => {
      if (isEdit.value) {
        removeEmpty(modalList.value)
        isEdit.value = false
        okText.value = '编辑'
      }
      visible.value = false
    }
    const handleToAdd = () => {
      if (!isEdit.value) {
        isEdit.value = true
        okText.value = '完成'
      }
      modalList.value.push({
        type: 'success',
        content: ''
      })
    }
    const handleToRemove = (item) => {
      modalList.value.splice(
        modalList.value.findIndex((element) => element === item),
        1
      )
    }
    const afterClose = () => {
      if (isEdit.value) {
        removeEmpty(modalList.value)
        isEdit.value = false
        okText.value = '编辑'
      }
    }
    onMounted(() => {
      fetchList().then((res) => {
        if (res.code === 20000) {
          eventList.value = res.data
        }
      })
    })
    return {
      calendarMode,
      dateValue,
      visible,
      modalTitle,
      modalList,
      okText,
      getListData,
      getMonthData,
      onPanelChange,
      onSelect,
      handleToEdit,
      isEdit,
      handleToCancel,
      handleToAdd,
      handleToRemove,
      afterClose
    }
  }
})
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
::v-deep.ant-input-group {
  margin-bottom: 10px;
}
</style>
