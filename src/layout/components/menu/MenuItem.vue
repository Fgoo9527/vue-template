<template>
  <a-menu-item :key="routeChildren.fullPath">
    <component
      :is="routeChildren.meta.target ? 'a' : 'router-link'"
      v-bind="linkProps(routeChildren)"
    >
      <item
        :icon="routeChildren.meta.icon"
        :title="generateTitle(routeChildren.meta.title)"
        :tag="routeChildren.meta.tag"
      />
    </component>
  </a-menu-item>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import item from './Item'
export default {
  name: 'MenuItem',
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
      default: () => null
    }
  },
  methods: {
    generateTitle,
    linkProps(routeChildren) {
      if (routeChildren.meta.target) {
        return {
          href: routeChildren.fullPath,
          target: routeChildren.meta.target
        }
      } else {
        return {
          to: routeChildren.fullPath
        }
      }
    }
  }
}
</script>
