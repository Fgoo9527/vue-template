<template>
  <div>
    <a-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      style="max-width: 500px; margin: 40px auto 0"
    >
      <a-alert
        :closable="true"
        message="确认转账后，资金将直接打入对方账户，无法退回。"
        style="margin-bottom: 24px"
      />
      <a-form-item
        label="付款账户"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        ant-design@alipay.com
      </a-form-item>
      <a-form-item
        label="收款账户"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        test@example.com
      </a-form-item>
      <a-form-item
        label="收款人姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        Alex
      </a-form-item>
      <a-form-item
        label="转账金额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        ￥ 5,000.00
      </a-form-item>
      <a-divider />
      <a-form-item
        label="支付密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
        name="password"
      >
        <a-input
          v-model:value="form.password"
          type="password"
          style="width: 80%"
        />
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 19, offset: 5 }">
        <a-button
:loading="loading"
type="primary"
@click="nextStep"
          >提交</a-button
        >
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onUnmounted, ref } from 'vue'
export default defineComponent({
  emits: ['next-step', 'prev-step'],
  setup() {
    const ctx = getCurrentInstance()
    const form = ref({
      password: ''
    })
    const rules = ref({
      password: [
        {
          required: true,
          message: '支付密码必须填写',
          trigger: 'blur'
        }
      ]
    })
    const labelCol = ref({ lg: { span: 5 }, sm: { span: 5 }})
    const wrapperCol = ref({ lg: { span: 19 }, sm: { span: 19 }})
    const loading = ref(false)
    const timer = ref(0)
    const nextStep = () => {
      loading.value = true
      ctx.refs.ruleForm
        .validate()
        .then(() => {
          ctx.timer = setTimeout(() => {
            ctx.loading = false
            ctx.emit('next-step')
          }, 1500)
        })
        .catch((error) => {
          loading.value = false
          console.log('error', error)
        })
    }
    const prevStep = () => {
      ctx.emit('prev-step')
    }
    onUnmounted(() => {
      clearTimeout(ctx.timer)
    })
    return {
      form,
      rules,
      labelCol,
      wrapperCol,
      loading,
      timer,
      nextStep,
      prevStep
    }
  }
})
</script>
