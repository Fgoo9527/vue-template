import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Tabs, Layout, Menu, Breadcrumb, Checkbox, Avatar, Dropdown, Form, Input, Drawer, Tag, Progress, Tooltip, Switch, Badge, Row, Col, Card, Divider, List, Cascader, Upload, DatePicker, Statistic, Table, Popconfirm, Radio, Alert, Space, Modal, Tree, Skeleton, Result, Steps, Popover, Select, Descriptions, ConfigProvider, Pagination, TimePicker, Transfer, Calendar, Affix, Rate, Spin, Empty } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './style/index.less'
import './permission' // permission control
import checkPermission from '@/directive/permission/index.js'
import IconFont from '@/utils/iconFont.js'
import i18n from '@/lang'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  store.dispatch('errorLog/addErrorLog', {
    err,
    vm,
    info,
    url: window.location.href
  })
}

app.directive('permission', {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  }
})

app.component('icon-font', IconFont)

app.use(i18n)

app
  .use(store)
  .use(router)
  .use(Button)
  .use(Tabs)
  .use(Layout)
  .use(Menu)
  .use(Breadcrumb)
  .use(Checkbox)
  .use(Avatar)
  .use(Dropdown)
  .use(Form)
  .use(Input)
  .use(Drawer)
  .use(Tag)
  .use(Progress)
  .use(Tooltip)
  .use(Switch)
  .use(Badge)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Divider)
  .use(List)
  .use(Cascader)
  .use(Upload)
  .use(DatePicker)
  .use(Statistic)
  .use(Table)
  .use(Popconfirm)
  .use(Radio)
  .use(Alert)
  .use(Space)
  .use(Modal)
  .use(Tree)
  .use(Skeleton)
  .use(Result)
  .use(Steps)
  .use(Popover)
  .use(Select)
  .use(Descriptions)
  .use(ConfigProvider)
  .use(Pagination)
  .use(TimePicker)
  .use(Transfer)
  .use(Calendar)
  .use(Affix)
  .use(Rate)
  .use(Spin)
  .use(Empty)
  .mount('#app')
