<template>
  <a-card class="about">
    <h2>{{$t('menu.title')}}</h2>
    <p>title: {{title}}</p>
    <p>path: {{path}}</p>
  </a-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const title = ref(route.meta.title)
    const path = ref(route.path)
    return {
      path,
      title
    }
  }
})
</script>
