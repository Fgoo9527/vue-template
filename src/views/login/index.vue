<template>
  <div class="login-box">
    <div class="login-form">
      <div class="login-top">
        <div class="login-logo">
          <img src="@/assets/img/logo.jpg" alt="" srcset="">
        </div>
        <div class="login-title">
          {{$t('login.title')}}
        </div>
      </div>
      <a-form :model="loginForm">
        <a-form-item>
          <a-input
            size="large"
            v-model:value="loginForm.username"
            :placeholder="$t('login.username')"
          >
            <template v-slot:prefix><UserOutlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            size="large"
            v-model:value="loginForm.password"
            :placeholder="$t('login.password')"
            autocomplete="off"
            @keyup.enter="onSubmit"
          >
            <template v-slot:prefix><LockOutlined /></template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button size="large" type="primary" @click="onSubmit" block>
            {{$t('login.logIn')}}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const redirect = ref(undefined)
    const otherQuery = ref({})
    const loginForm = ref({
      username: 'admin',
      password: 'admin'
    })
    const onSubmit = () => {
      store.dispatch('user/login', loginForm.value).then(() => {
        router.push({ path: redirect.value || '/', query: otherQuery.value })
      })
    }
    const getOtherQuery = (query) => {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    const route = useRoute()
    watch(route, (route) => {
      const query = route.query
      if (query) {
        redirect.value = query.redirect
        otherQuery.value = getOtherQuery(query)
      }
    })
    return {
      loginForm,
      onSubmit
    }
  },
  components: { UserOutlined, LockOutlined }
})
</script>

<style lang="less" scoped>
.login-box {
  background-image: url(../../assets/img/body.svg);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  .login-form {
    flex: 1;
    padding: 10% 0;
    text-align: center;
    width: 384px;
    margin: 0 auto;
    .login-top {
      padding: 32px 0;
      .login-logo{
        img{
          width: 350px;
        }
      }
      .login-title {
        font-size: 14px;
        color: #808695;
      }
    }
    ::v-deep .ant-col{
      width: 100%;
    }
  }
}
</style>
