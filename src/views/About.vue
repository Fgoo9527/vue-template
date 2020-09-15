<template>
  <div class="about">
    <Tags />
    <!-- <Suspense>
      <template #default>
      </template>
      <template #fallback>
        <progress class="progress si-primary is-small" />
      </template>
    </Suspense>-->
    <h1>{{ name }}</h1>
    <a-button type="primary">点击</a-button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import Tags from '@/components/tags.vue'

export default defineComponent({
  setup() {
    const name = ref('xiaoxiaozhi')
    return {
      name,
    }
  },
  components: {
    Tags,
  },
})
</script>
