<template>
  <a-row type="flex" :gutter="[16, 16]" justify="space-between">
    <a-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
      <a-card>
        <div class="user-info">
          <div class="main">
            <a-skeleton
              active
              :avatar="{ size: 72 }"
              :title="false"
              :paragraph="false"
              :loading="userInfoLoading"
            >
              <a-avatar :size="72" :src="avatar"></a-avatar>
            </a-skeleton>
            <a-skeleton
              active
              :paragraph="{ row: 1 }"
              :loading="userInfoLoading"
            >
              <p class="name">
                <strong>{{ name }}</strong>
              </p>
              <p class="info">{{ introduction }}</p>
            </a-skeleton>
          </div>
          <a-skeleton
            active
            :title="false"
            :paragraph="{ row: 1 }"
            :loading="userInfoLoading"
          >
            <div class="desc">
              <div class="desc-item">
                <IdcardOutlined />
                <span class="desc-content">{{ occupation }}</span>
              </div>
              <div class="desc-item">
                <ForkOutlined />
                <span class="desc-content">
                  {{ team }}
                </span>
              </div>
              <div class="desc-item">
                <CompassOutlined />
                <span class="desc-content">{{ address }}</span>
              </div>
            </div>
          </a-skeleton>
          <div class="social">
            <a-row type="flex" justify="space-around" align="middle">
              <a-col :span="4">
                <a-tooltip placement="top">
                  <template v-slot:title>
                    <span>微博</span>
                  </template>
                  <a-skeleton
                    active
                    :avatar="{ size: 32 }"
                    :title="false"
                    :paragraph="false"
                    :loading="userInfoLoading"
                  >
                    <img
                      src="../../assets/img/icon-social-weibo.svg"
                      alt="微博"
                      width="32"
                      height="32"
                    />
                  </a-skeleton>
                </a-tooltip>
              </a-col>
              <a-col :span="4">
                <a-tooltip placement="top">
                  <template v-slot:title>
                    <span>知乎</span>
                  </template>
                  <a-skeleton
                    active
                    :avatar="{ size: 32 }"
                    :title="false"
                    :paragraph="false"
                    :loading="userInfoLoading"
                  >
                    <img
                      src="../../assets/img/icon-social-zhihu.svg"
                      alt="知乎"
                      width="32"
                      height="32"
                    />
                  </a-skeleton>
                </a-tooltip> </a-col
              ><a-col :span="4">
                <a-tooltip placement="top">
                  <template v-slot:title>
                    <span>Facebook</span>
                  </template>
                  <a-skeleton
                    active
                    :avatar="{ size: 32 }"
                    :title="false"
                    :paragraph="false"
                    :loading="userInfoLoading"
                  >
                    <img
                      src="../../assets/img/icon-social-facebook.svg"
                      alt="Facebook"
                      width="32"
                      height="32"
                    />
                  </a-skeleton>
                </a-tooltip> </a-col
              ><a-col :span="4">
                <a-tooltip placement="top">
                  <template v-slot:title>
                    <span>Twitter</span>
                  </template>
                  <a-skeleton
                    active
                    :avatar="{ size: 32 }"
                    :title="false"
                    :paragraph="false"
                    :loading="userInfoLoading"
                  >
                    <img
                      src="../../assets/img/icon-social-twitter.svg"
                      alt="Twitter"
                      width="32"
                      height="32"
                    />
                  </a-skeleton>
                </a-tooltip>
              </a-col>
            </a-row>
          </div>
        </div>
        <a-divider />
        <a-skeleton
          active
          :title="false"
          :paragraph="{ row: 1 }"
          :loading="userInfoLoading"
        >
          <div class="description-list-title">标签</div>
          <div>
            <template v-for="(tag, index) in tags" :key="index">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :key="tag">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else>
                {{ tag }}
              </a-tag>
            </template>
            <a-input
              v-if="inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              v-model:value="inputValue"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag
              v-else
              @click="showInput"
              style="background: #fff; borderstyle: dashed"
            >
              <plus-outlined />
            </a-tag>
          </div>
        </a-skeleton>
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="19" :lg="19" :xl="19">
      <a-card
        style="width: 100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="(key) => onTabChange(key)"
      >
        <p v-if="noTitleKey === 'article'">
          <a-list
            item-layout="vertical"
            size="large"
            :data-source="articleData"
            :pagination="pagination"
          >
            <template v-slot:footer>
              <a-skeleton
                :loading="tabLoading"
                active
                :title="false"
                :paragraph="{ row: 1 }"
              >
                <div><b>ant design vue</b> footer part</div>
              </a-skeleton>
            </template>
            <template v-slot:renderItem="{ item }">
              <a-list-item key="item.title">
                <template v-slot:actions>
                  <span v-for="{ type, text } in actions" :key="type">
                    <component v-bind:is="type" style="margin-right: 8px" />
                    {{ text }}
                  </span>
                </template>
                <template v-slot:extra>
                  <img
                    width="272"
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                </template>
                <a-skeleton :loading="tabLoading" active avatar>
                  <a-list-item-meta :description="item.description">
                    <template v-slot:title>
                      <a :href="item.href">{{ item.title }}</a>
                    </template>
                    <template v-slot:avatar>
                      <a-avatar :src="item.avatar" />
                    </template>
                  </a-list-item-meta>
                  {{ item.content }}
                </a-skeleton>
              </a-list-item>
            </template>
          </a-list>
        </p>
        <p v-else-if="noTitleKey === 'project'">
          <a-list
            :grid="{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 2, xxl: 2 }"
            :data-source="projectData"
          >
            <template v-slot:renderItem="{ item }">
              <a-list-item>
                <a-card hoverable style="width: 100%">
                  <template v-slot:cover>
                    <img alt="example" :src="item.src" />
                  </template>
                  <a-card-meta :title="item.title">
                    <template v-slot:description> {{ item.desc }} </template>
                  </a-card-meta>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </p>
        <p v-else>
          <a-list
            :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }"
            :data-source="appData"
          >
            <template v-slot:renderItem="{ item }">
              <a-list-item>
                <a-card hoverable style="width: 100%">
                  <template v-slot:cover>
                    <img alt="example" :src="item.src" />
                  </template>
                  <template class="ant-card-actions" v-slot:actions>
                    <setting-outlined key="setting" />
                    <edit-outlined key="edit" />
                    <ellipsis-outlined key="ellipsis" />
                  </template>
                  <a-card-meta :title="item.title" :description="item.desc">
                    <template v-slot:avatar>
                      <a-avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    </template>
                  </a-card-meta>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </p>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref, onMounted, nextTick, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import {
  PlusOutlined,
  IdcardOutlined,
  ForkOutlined,
  CompassOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}
export default defineComponent({
  setup() {
    const ctx = getCurrentInstance()
    const store = useStore()
    const name = store.getters.name
    const avatar = store.getters.avatar
    const introduction = store.getters.introduction
    const occupation = store.getters.occupation
    const address = store.getters.address
    const team = store.getters.team.join('-')
    const tags = ref(store.getters.tags)
    const tabListNoTitle = ref([
      {
        key: 'article',
        tab: '文章'
      },
      {
        key: 'project',
        tab: '项目'
      },
      {
        key: 'application',
        tab: '应用'
      }
    ])
    const noTitleKey = ref('article')
    const key = ref('tab1')
    const tabLoading = ref(true)
    const onTabChange = (key) => {
      noTitleKey.value = key
      setTimeout(() => {
        tabLoading.value = false
      }, 1000)
    }
    const inputVisible = ref(false)
    const showInput = async() => {
      inputVisible.value = true
      await nextTick()
      ctx.refs.input.focus()
    }
    const inputValue = ref('')
    const handleInputConfirm = () => {
      if (inputValue.value.trim() && tags.value.indexOf(inputValue.value.trim()) === -1) {
        tags.value = [...tags.value, inputValue.value.trim()]
        inputVisible.value = false
        inputValue.value = ''
      }
    }
    const articleData = ref(listData)
    const actions = ref([
      { type: 'StarOutlined', text: '156' },
      { type: 'LikeOutlined', text: '156' },
      { type: 'MessageOutlined', text: '2' }
    ])
    const pagination = ref({
      pageSize: 3
    })
    const projectData = ref([
      {
        title: 'Title 1',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/RZ8FQmZfHkcffMlTBCJllBFjEhEsObVo/middle'
      },
      {
        title: 'Title 2',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/WLXm7gp1EbLDtvVQgkeQeyq5OtDm00Jd/middle'
      },
      {
        title: 'Title 3',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/4Z0QR2L0J1XStxBh99jVJ8qLfsGsOgjU/middle'
      },
      {
        title: 'Title 4',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/ttkIjNPlVDuv4lUTvRX8GIlM2QqSe0jg/middle'
      },
      {
        title: 'Title 5',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/fAenQ8nvRjL7x0i0jEfuDBZHvJfHf3v6/middle'
      },
      {
        title: 'Title 6',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/LrCTN2j94lo9N7wEql7cBr1Ux4rHMvmZ/middle'
      },
      {
        title: 'Title 7',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/yeKvhT20lMU0f1T3Y743UlGEOLLnZSnp/middle'
      },
      {
        title: 'Title 8',
        desc: 'Ant Design',
        src:
          'https://dev-file.iviewui.com/CyrCNmTJfv7D6GFAg39bjT3eRkkRm5dI/middle'
      }
    ])
    const appData = ref([
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      },
      {
        title: 'Card title',
        desc: 'This is the description',
        src:
          'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      }
    ])
    const userInfoLoading = ref(true)
    onMounted(() => {
      setTimeout(() => {
        userInfoLoading.value = false
        tabLoading.value = false
      }, 1000)
    })
    return {
      tabListNoTitle,
      noTitleKey,
      key,
      onTabChange,
      tags,
      inputVisible,
      showInput,
      handleInputConfirm,
      inputValue,
      articleData,
      actions,
      pagination,
      projectData,
      appData,
      name,
      avatar,
      introduction,
      occupation,
      address,
      team,
      userInfoLoading,
      tabLoading
    }
  },
  components: {
    PlusOutlined,
    IdcardOutlined,
    ForkOutlined,
    CompassOutlined,
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
    StarOutlined,
    LikeOutlined,
    MessageOutlined
  }
})
</script>
<style lang="less" scoped>
.user-info {
  .main {
    text-align: center;
    margin-bottom: 10px;
    .name {
      font-size: 20px;
      margin: 8px;
    }
  }
  .desc {
    .desc-item {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 10px;
      .desc-content {
        margin-left: 10px;
        position: relative;
        bottom: 4px;
      }
    }
  }
  .social {
    width: 100%;
  }
}
.description-list-title {
  margin-bottom: 16px;
  color: #17233d;
  font-weight: 500;
  font-size: 14px;
}
.ant-tag {
  margin-bottom: 8px;
}
</style>
