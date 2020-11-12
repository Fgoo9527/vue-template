<template>
  <a-card>
    <a-alert
      :message="message"
      type="info"
      show-icon
      style="margin-bottom: 20px"
    />
    <switch-roles @change="handleRolesChange" />
  </a-card>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const handleRolesChange = (val) => {
      router.push({ path: '/permission/page?' + +new Date() })
    }
    const message = '点击后请查看左侧菜单变化'
    return {
      message,
      handleRolesChange
    }
  },
  components: {
    SwitchRoles
  }
})
</script>
