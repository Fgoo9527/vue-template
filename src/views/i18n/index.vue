<template>
  <a-card>
    <div class="switch-language">
      <a-radio-group v-model:value="locale" @change="onChange" style="margin-bottom:10px">
        <a-radio-button value="zh"> 中文 </a-radio-button>
        <a-radio-button value="en"> English </a-radio-button>
        <a-radio-button value="es"> Español </a-radio-button>
        <a-radio-button value="ja"> 日本語 </a-radio-button>
      </a-radio-group>
      <a-alert :message="$t('i18n.tips')" type="info" show-icon />
    </div>
    <div class="ant-container">
      <div :key="(!!locale).toString()" class="locale-components">
        <div class="example">
          <a-pagination
            v-model:current="current"
            :total="50"
            show-size-changer
          />
        </div>
        <div class="example">
          <a-select show-search style="width: 200px">
            <a-select-option :value="$t('i18n.jack')"> {{$t('i18n.jack')}} </a-select-option>
            <a-select-option :value="$t('i18n.lucy')"> {{$t('i18n.lucy')}} </a-select-option>
          </a-select>
          <a-date-picker />
          <a-time-picker />
          <a-range-picker style="width: 200px" />
        </div>
        <div class="example">
          <a-button type="primary" @click="showModal">{{$t('i18n.showModal')}}</a-button>
          <a-button @click="info">{{$t('i18n.showInfo')}}</a-button>
          <a-button @click="confirm">{{$t('i18n.showConfirm')}}</a-button>
          <a-popconfirm :title="$t('i18n.question')">
            <a href="#">{{$t('i18n.clickToConfirm')}}</a>
          </a-popconfirm>
        </div>
        <div className="example">
          <a-transfer
            :data-source="[]"
            show-search
            :target-keys="[]"
            :render="(item) => item.title"
          />
        </div>
        <a-modal v-model:visible="visible" :title="$t('i18n.localModal')">
          <p>Locale Modal</p>
        </a-modal>
      </div>
    </div>
  </a-card>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { setLang } from '@/lang/index'
import { Modal } from 'ant-design-vue'
export default defineComponent({
  setup() {
    const store = useStore()
    const locale = ref(store.state.settings.locale)
    const onChange = () => {
      setLang(locale.value)
      store.dispatch('settings/changeLocale', locale.value)
    }
    const current = ref(1)
    const visible = ref(false)
    const showModal = () => {
      visible.value = true
    }
    const hideModal = () => {
      visible.value = false
    }
    const info = () => {
      Modal.info({
        title: 'some info',
        content: 'some info'
      })
    }
    const confirm = () => {
      Modal.confirm({
        title: 'some info',
        content: 'some info'
      })
    }
    return {
      locale,
      onChange,
      current,
      visible,
      showModal,
      hideModal,
      info,
      confirm
    }
  }
})
</script>
<style lang="less" scoped>
.switch-language {
  margin-bottom: 30px;
}
.ant-container {
  .example {
    margin: 16px 0;
  }

  .example > * {
    margin-right: 8px;
  }
}
</style>
