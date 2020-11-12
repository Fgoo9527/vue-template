<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="填写转账信息" />
      <a-step title="确认转账信息" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <step1 v-if="currentTab === 0" @next-step="nextStep" />
      <step2
        v-if="currentTab === 1"
        @next-step="nextStep"
        @prev-step="prevStep"
      />
      <step3 v-if="currentTab === 2" @prev-step="prevStep" @finish="finish" />
    </div>
  </a-card>
</template>

<script>
import step1 from './step1'
import step2 from './step2'
import step3 from './step3'
export default {
  name: 'StepForm',
  components: {
    step1,
    step2,
    step3
  },
  data() {
    return {
      currentTab: 0,
      form: null
    }
  },
  methods: {
    nextStep() {
      if (this.currentTab < 2) {
        this.currentTab += 1
      }
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish() {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
