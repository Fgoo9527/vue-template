<template>
  <section class="app-main">
    <router-view v-slot="{ Component }" :key="key">
      <!-- <transition mode="out-in" name="fade-transform"> -->
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      <!-- </transition> -->
    </router-view>
  </section>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const route = useRoute()
    const store = useStore()
    const cachedViews = computed(() => store.getters.cachedViews)
    const key = computed(() => route.path)
    return {
      key,
      cachedViews
    }
  }
})
</script>

<style lang="less" scoped>
.app-main {
  height: 100%;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
