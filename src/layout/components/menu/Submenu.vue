<template>
  <a-sub-menu :key="item.fullPath">
    <template v-slot:title>
      <item
        :icon="item.meta.icon"
        :title="generateTitle(item.meta.title)"
        :tag="item.meta.tag"
      />
    </template>
    <slot />
  </a-sub-menu>
</template>

<script>
import item from './Item'
import { generateTitle } from '@/utils/i18n'
export default {
  name: 'Submenu',
  components: { item },
  props: {
    item: {
      type: Object,
      default() {
        return null
      }
    },
    routeChildren: {
      type: Object,
      default() {
        return null
      }
    }
  },
  methods: {
    generateTitle
  }
}
</script>
