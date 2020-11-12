<template>
  <a-row type="flex" :gutter="[16, 16]" justify="space-between">
    <a-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5" class="left-panel">
      <a-card title="个人设置">
        <!-- <div class="setting-content">
          <div
            class="setting-item"
            :class="currentTab === index ? 'selected' : ''"
            @click="handleToChooseSetting(index)"
            v-for="(item, index) in tabMsg"
            :key="index"
          >
            <div class="title">{{item.tab}}</div>
            <div class="desc">{{item.msg}}</div>
          </div>
        </div> -->
        <a-menu
          style="width: 256px"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          theme="light"
          class="setting-content"
        >
          <a-menu-item
            v-for="(item, index) in tabMsg"
            :key="index"
            class="setting-item"
          >
            <div class="title">{{ item.tab }}</div>
            <div class="desc">{{ item.msg }}</div>
          </a-menu-item>
        </a-menu>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="19" :lg="19" :xl="19">
      <a-card>
        <div v-if="currentTab === 0">
          <h2>基本设置</h2>
          <a-form
            ref="infoForm"
            :model="data.infoForm"
            :rules="data.rules"
            layout="vertical"
          >
            <a-row type="flex" justify="space-between">
              <a-col :span="10">
                <a-form-item ref="name" name="name" label="昵称">
                  <a-input v-model:value="data.infoForm.name" />
                </a-form-item>
                <a-form-item ref="email" name="email" label="邮箱">
                  <a-input v-model:value="data.infoForm.email" />
                </a-form-item>
                <a-form-item ref="desc" name="desc" label="个人介绍">
                  <a-textarea
                    v-model:value="data.infoForm.desc"
                    type="textarea"
                    placeholder="请输入个人介绍"
                  />
                </a-form-item>
                <a-form-item ref="company" name="company" label="公司">
                  <a-input v-model:value="data.infoForm.company" />
                </a-form-item>
                <a-form-item ref="address" name="address" label="居住地">
                  <a-cascader
                    v-model:value="data.infoForm.address"
                    :options="options"
                    placeholder="请选择地址"
                    @change="onChange"
                  >
                    <template v-slot:suffixIcon>
                      <smile-outlined class="test" />
                    </template>
                  </a-cascader>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" @click="onSubmit">
                    更新基本信息
                  </a-button>
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item ref="avatar" name="avatar" label="头像">
                  <a-avatar
                    shape="square"
                    :size="90"
                    src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                  />
                </a-form-item>
                <a-form-item>
                  <a-upload
                    v-model:fileList="fileList"
                    name="file"
                    :multiple="true"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :headers="headers"
                    @change="handleChange"
                  >
                    <a-button @click="onSubmit">
                      <template v-slot:icon><CameraOutlined /></template
                      >修改头像
                    </a-button>
                  </a-upload>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div v-else-if="currentTab === 1">
          <h2>安全设置</h2>
          <div class="setting-box">
            <div class="item">
              <div class="title">
                <h4>账户密码</h4>
                <div>绑定手机和邮箱，并设置密码，帐号更安全</div>
              </div>
              <a class="action">修改</a>
            </div>
            <a-divider />
            <div class="item">
              <div class="title">
                <h4>绑定手机</h4>
                <div>已绑定手机号：+86185****0000</div>
              </div>
              <a class="action">修改</a>
            </div>
            <a-divider />
            <div class="item">
              <div class="title">
                <h4>密保问题</h4>
                <div>未设置密保问题，密保问题可有效保护账户安全</div>
              </div>
              <a class="action">设置</a>
            </div>
            <a-divider />
            <div class="item">
              <div class="title">
                <h4>账户密码</h4>
                <div>已绑定域名：ant.design</div>
              </div>
              <a class="action">修改</a>
            </div>
          </div>
        </div>
        <div v-else-if="currentTab === 2">
          <h2>账号绑定</h2>
          <div class="setting-box">
            <div class="item" v-for="(item, index) in channel" :key="index">
              <div class="title">
                <h4>
                  <img :src="item.img" alt="微信" width="24" height="24" />{{
                    item.name
                  }}
                </h4>
                <div>{{ item.info }}</div>
              </div>
              <a class="action">绑定</a>
            </div>
            <a-divider />
          </div>
        </div>
        <div v-else>
          <h2>新消息通知</h2>
          <div class="setting-box">
            <div class="item" v-for="(item, index) in infoMessage" :key="index">
              <div class="title">
                <h4>{{ item.h1 }}</h4>
                <div>{{ item.h2 }}</div>
              </div>
              <a-switch
                checked-children="开"
                un-checked-children="关"
                v-model:checked="item.checked"
              />
            </div>
            <a-divider />
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { CameraOutlined, SmileOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const currentTab = ref(0)
    const handleToChooseSetting = (tab) => {
      currentTab.value = tab
    }
    const data = reactive({
      infoForm: {
        name: store.getters.name,
        email: '',
        desc: store.getters.introduction,
        company: '',
        address: [store.getters.address]
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符内',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        company: [
          {
            required: true,
            message: '请输入公司',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入个人介绍',
            trigger: 'blur'
          }
        ]
      }
    })
    const options = ref([
      {
        value: '深圳市',
        label: '深圳市'
      },
      {
        value: '北京市',
        label: '北京市'
      }
    ])
    const onSubmit = () => {
      console.log(data)
    }
    const onChange = (val) => {
      console.log(val)
    }
    const fileList = ref([])
    const headers = ref({
      authorization: 'authorization-text'
    })
    const handleChange = () => {}
    const infoMessage = ref([
      {
        h1: '陌生人私信',
        h2: '未关注的人向您发私信时的通知',
        checked: true
      },
      {
        h1: '邀请/评论消息',
        h2: '有人对我发出邀请时，我会收到消息通知',
        checked: false
      },
      {
        h1: '赞同/赞赏消息设置',
        h2: '有人对我赞同或赞赏时，我会收到消息通知',
        checked: true
      },
      {
        h1: '邮件设置',
        h2: '重要事件发生时，我将会收到邮件提醒',
        checked: true
      }
    ])
    const channel = ref([
      {
        name: '微信',
        img: require('../../assets/img/icon-social-wechat.svg'),
        info: '当前未绑定 微信 账号'
      },
      {
        name: 'Twitter',
        img: require('../../assets/img/icon-social-twitter.svg'),
        info: '当前未绑定 Twitter 账号'
      },
      {
        name: 'Facebook',
        img: require('../../assets/img/icon-social-facebook.svg'),
        info: '当前未绑定 Facebook 账号'
      },
      {
        name: '微博',
        img: require('../../assets/img/icon-social-weibo.svg'),
        info: '当前未绑定 微博 账号'
      }
    ])
    const tabMsg = ref([
      {
        tab: '账户密码',
        msg: '个人账户信息设置'
      },
      {
        tab: '安全设置',
        msg: '密码、邮箱等设置'
      },
      {
        tab: '账号绑定',
        msg: '绑定第三方社交账户'
      },
      {
        tab: '新消息通知',
        msg: '各种通知的设置'
      }
    ])
    const selectedKeys = ref([0])
    return {
      currentTab,
      handleToChooseSetting,
      data,
      onSubmit,
      options,
      onChange,
      fileList,
      headers,
      handleChange,
      infoMessage,
      channel,
      tabMsg,
      selectedKeys
    }
  },
  components: {
    CameraOutlined,
    SmileOutlined
  }
})
</script>

<style lang="less" scoped>
.left-panel {
  .setting-content {
    width: 100%!important;
    .setting-item {
      margin: 0;
      padding: 7px 16px;
      clear: both;
      white-space: nowrap;
      list-style: none;
      height: 100%;
      .title {
        line-height: 24px;
        font-size: 14px;
      }
      .desc {
        line-height: 1.2;
        font-size: 12px;
      }
    }
  }
  ::v-deep .ant-card-body {
    padding: 10px 0 0 0;
  }
}
.setting-box {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #2d8cf0;
      background: transparent;
      text-decoration: none;
      outline: none;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    .title {
      width: 80%;
      img {
        margin-right: 8px;
      }
      div {
        color: #808695;
      }
      h4 {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
