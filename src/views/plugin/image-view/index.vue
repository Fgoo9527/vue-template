<template>
  <a-card>
    <a-alert
      :message="$t('image-view.tips')"
      type="info"
      show-icon
    />
    <image-preview :images="images"></image-preview>
  </a-card>
</template>
<script>
import ImagePreview from '@/components/ImagePreview'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { ImagePreview },
  setup() {
    const images = ref([
      'https://picsum.photos/id/60/1440/900',
      'https://picsum.photos/id/61/1440/900',
      'https://picsum.photos/id/62/1440/900',
      'https://picsum.photos/id/63/1440/900',
      'https://picsum.photos/id/64/1440/900',
      'https://picsum.photos/id/65/1440/900',
      'https://picsum.photos/id/66/1440/900',
      'https://picsum.photos/id/67/1440/900',
      'https://picsum.photos/id/68/1440/900',
      'https://picsum.photos/id/69/1440/900'
    ])
    return {
      images
    }
  }
})
</script>
<style lang="less" scoped>
.img {
  width: 330px;
  margin: 10px;
  cursor: pointer;
}
</style>
