<template>
  <div class="lock-page"></div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {}
})
</script>
<style scoped>
.lock-page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/img/lock-page.jpg') 0 0/100% 100% no-repeat;
  align-items: center;
  justify-content: flex-end;
}
</style>
