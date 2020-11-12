<template>
  <a-card>
    <a-form
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
      v-bind="formItemLayoutWithOutLabel"
    >
      <a-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        v-bind="index === 0 ? formItemLayout : {}"
        :label="index === 0 ? 'Domains' : ''"
        :name="['domains', index, 'value']"
        :rules="{
          required: true,
          message: 'domain can not be null',
          trigger: 'change'
        }"
      >
        <a-input
          v-model:value="domain.value"
          placeholder="please input domain"
          style="width: 60%; margin-right: 8px"
        />
        <MinusCircleOutlined
          v-if="dynamicValidateForm.domains.length > 1"
          class="dynamic-delete-button"
          :disabled="dynamicValidateForm.domains.length === 1"
          @click="removeDomain(domain)"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addDomain">
          <PlusOutlined /> Add field
        </a-button>
      </a-form-item>
      <a-form-item v-bind="formItemLayoutWithOutLabel">
        <a-button
          type="primary"
          html-type="submit"
          @click="submitForm('dynamicValidateForm')"
        >
          Submit
        </a-button>
        <a-button
          style="margin-left: 10px"
          @click="resetForm('dynamicValidateForm')"
        >
          Reset
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    MinusCircleOutlined,
    PlusOutlined
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      dynamicValidateForm: {
        domains: []
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName]
        .validate()
        .then(() => {
          console.log('values', this.dynamicValidateForm.domains)
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      const index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
