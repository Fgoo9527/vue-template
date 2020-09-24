import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Tabs, Layout, Menu, Breadcrumb, Checkbox } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Button)
  .use(Tabs)
  .use(Layout)
  .use(Menu)
  .use(Breadcrumb)
  .use(Checkbox)
  .mount('#app')
