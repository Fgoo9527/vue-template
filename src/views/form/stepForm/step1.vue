<template>
  <a-form
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 14 }"
    style="max-width: 500px; margin: 40px auto 0"
  >
    <a-form-item label="付款账户" name="account">
      <a-select
        v-model:value="form.account"
        placeholder="ant-design@alipay.com"
      >
        <a-select-option
value="ant-design@alipay.com"
          >ant-design@alipay.com</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item label="付款账户" name="payAccount">
      <a-input-group compact>
        <a-select v-model:value="form.type" style="width: 100px">
          <a-select-option value="alipay">支付宝</a-select-option>
          <a-select-option value="wexinpay">微信</a-select-option>
        </a-select>
        <a-input
          :style="{ width: 'calc(100% - 100px)' }"
          v-model:value="form.payAccount"
        />
      </a-input-group>
    </a-form-item>
    <a-form-item label="收款人姓名" name="name">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item label="转账金额" name="number">
      <a-input v-model:value="form.number" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="nextStep">下一步</a-button>
    </a-form-item>
  </a-form>
  <a-divider />
  <div class="step-form-style-desc">
    <h3>说明</h3>
    <h4>转账到支付宝账户</h4>
    <p>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>
    <h4>转账到银行卡</h4>
    <p>
      如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
    </p>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue'
export default defineComponent({
  emits: ['next-step'],
  setup() {
    const ctx = getCurrentInstance()
    const form = ref({
      account: '',
      type: 'alipay',
      payAccount: 'test@example.com',
      name: 'Alex',
      number: '5000'
    })
    const rules = ref({
      account: [
        {
          required: true,
          message: '付款账户必须填写',
          trigger: 'blur'
        }
      ],
      payAccount: [
        {
          required: true,
          message: '收款账户必须填写',
          trigger: 'blur'
        }
      ],
      name: [
        {
          required: true,
          message: '收款人名称必须核对',
          trigger: 'blur'
        }
      ],
      number: [
        {
          required: true,
          message: '转账金额必须填写',
          trigger: 'blur'
        }
      ]
    })
    const nextStep = () => {
      ctx.refs.ruleForm
        .validate()
        .then(() => {
          ctx.emit('next-step')
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    return {
      form,
      rules,
      nextStep
    }
  }
})
</script>
