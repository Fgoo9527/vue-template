<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import en from 'ant-design-vue/es/locale/en_US'
import zh from 'ant-design-vue/es/locale/zh_CN'
import es from 'ant-design-vue/es/locale/es_ES'
import ja from 'ant-design-vue/es/locale/ja_JP'
export default defineComponent({
  setup() {
    const store = useStore()
    const localeObj = { en, zh, es, ja }
    const locale = computed(() => localeObj[store.state.settings.locale])
    return {
      locale
    }
  }
})
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
