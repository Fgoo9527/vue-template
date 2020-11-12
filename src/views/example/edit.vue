<template>
  <article-detail :is-edit="true" />
</template>

<script>
import ArticleDetail from './components/ArticleDetail'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CreateForm',
  components: { ArticleDetail }
})
</script>
