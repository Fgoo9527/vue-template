<template>
  <a-dropdown :trigger="['click']" placement="bottomCenter">
    <icon-font type="iconearth" class="nav-icon"/>
    <template v-slot:overlay>
      <a-menu>
        <a-menu-item
          v-for="item in localeList"
          :key="item.key"
          :disabled="locale === item.key"
          @click="handleToChangeLocale(item.key)"
          >{{ item.name }}</a-menu-item
        >
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { setLang } from '@/lang/index'
export default defineComponent({
  setup() {
    const store = useStore()
    const locale = computed(() => store.state.settings.locale)
    const localeList = ref([
      { name: '中文', key: 'zh' },
      { name: 'English', key: 'en' },
      { name: 'Español', key: 'es' },
      { name: '日本語', key: 'ja' }
    ])
    const handleToChangeLocale = (locale) => {
      setLang(locale)
      store.dispatch('settings/changeLocale', locale)
    }
    return {
      locale,
      localeList,
      handleToChangeLocale
    }
  }
})
</script>
<style lang="less" scoped>
.nav-icon {
  font-size: 20px;
  margin: 0 10px;
}
</style>
