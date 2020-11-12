<template>
  <div>
    <div style="margin-bottom: 15px">
      当前角色: <span style="color: #018ffb">{{ roles }}</span>
    </div>
    切换角色:
    <a-radio-group v-model:value="switchRoles" button-style="solid">
      <a-radio-button value="editor"> editor </a-radio-button>
      <a-radio-button value="admin"> admin </a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  emits: ['change'],
  setup(_, { emit }) {
    const store = useStore()
    const roles = computed(() => store.getters.roles)
    const switchRoles = computed({
      get: () => roles.value[0],
      set: (val) => {
        store.dispatch('user/changeRoles', val).then(() => {
          emit('change')
        })
      }
    })
    return {
      roles,
      switchRoles
    }
  }
})
</script>
