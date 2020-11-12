<template>
  <div class="error-box">
    <img src="../../assets/img/icon-404-color.svg" class="error-image" />
    <div class="error-content">
      <h1>404</h1>
      <div class="error-desc">{{$t('errorPage.404')}}</div>
      <a-button
      type="primary"
      size="large"
      @click="handleToHome"
        >{{$t('errorPage.backToHome')}}({{ backToHomeTime }})</a-button
      >
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const backToHomeTime = ref(10)
    const timer = ref(null)
    const handleToHome = () => {
      router.replace('/')
    }
    onMounted(() => {
      timer.value = setInterval(() => {
        if (backToHomeTime.value < 1) {
          clearInterval(timer.value)
          router.replace('/')
        } else {
          backToHomeTime.value = backToHomeTime.value - 1
        }
      }, 1000)
    })
    onUnmounted(() => {
      if (timer.value) {
        clearInterval(timer.value)
      }
    })
    return {
      backToHomeTime,
      handleToHome
    }
  }
})
</script>
<style lang="less" scoped>
.error-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  min-height: 500px;
  .error-image {
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  .error-content {
    padding-left: 152px;
    h1 {
      margin-bottom: 24px;
      color: #515a6e;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    .error-desc {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
