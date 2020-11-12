<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/ArticleDetail'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CreateForm',
  components: { ArticleDetail }
})
</script>
