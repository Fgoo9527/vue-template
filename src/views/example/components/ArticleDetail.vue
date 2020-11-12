<template>
  <a-card class="createPost-container">
    <a-form :model="postForm" :rules="rules" class="form-container" ref="form">
      <div :class="'sub-navbar ' + postForm.status">
        <a-space>
          <a-button
            :loading="loading"
            style="margin-left: 10px"
            class="success"
            @click="submitForm"
          >
            Publish
          </a-button>
          <a-button :loading="loading" class="warning" @click="draftForm">
            Draft
          </a-button>
        </a-space>
      </div>
      <div class="createPost-main-container">
        <a-row>
          <a-col :span="24">
            <a-form-item label="Title" class="col-18">
              <a-input v-model:value="postForm.title" />
            </a-form-item>
            <div class="postInfo-container">
              <a-row>
                <a-col :span="8">
                  <a-form-item label="Author:" class="postInfo-container-item col-18">
                    <a-select
                      v-model:value="postForm.author"
                      show-search
                      placeholder="Search user"
                      :default-active-first-option="false"
                      :show-arrow="false"
                      :filter-option="false"
                      :not-found-content="null"
                      :autofocus="true"
                      @search="getRemoteUserList"
                    >
                      <a-select-option v-for="(item,index) in userListOptions" :key="index">
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="10">
                  <a-form-item
                    label="Publish Time:"
                    class="postInfo-container-item"
                  >
                    <a-date-picker
                      v-model:value="displayTime"
                      show-time
                      type="date"
                      placeholder="Pick a date"
                      style="width: 100%"
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item
                    label="Importance:"
                    class="postInfo-container-item"
                  >
                    <a-rate v-model:value="postForm.importance" allow-half />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>
        <a-form-item
          style="margin-bottom: 40px"
          label="Summary:"
          class="article-textarea col-18"
        >
          <a-textarea
            v-model:value="postForm.content_short"
            :rows="1"
            placeholder="Please enter the content"
          />
          <span
v-show="contentShortLength"
class="word-counter"
            >{{ contentShortLength }}words</span
          >
        </a-form-item>
        <a-form-item name="content" class="col-24" style="margin-bottom: 30px">
          <Wangeditor @change="change" v-model:value="postForm.content" />
        </a-form-item>
        <a-form-item style="margin-bottom: 30px">
          <a-row>
            <a-col :span="16">
              <a-upload-dragger
                name="file"
                :multiple="true"
                action="https://httpbin.org/post"
                @change="handleChange"
              >
                <p class="ant-upload-drag-icon">
                  <icon-font type="iconcloud-upload" />
                </p>
                <p class="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p class="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </a-upload-dragger>
            </a-col>
            <a-col :span="8">
              <div class="image-preview">
                <div
                  v-show="postForm.image_uri.length > 1"
                  class="image-preview-wrapper"
                >
                  <img :src="postForm.image_uri" />
                  <div class="image-preview-action">
                    <i class="el-icon-delete" @click="rmImage" />
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-form-item>
      </div>
    </a-form>
  </a-card>
</template>
<script>
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  onMounted
} from 'vue'
import { validateURL } from '@/utils/validate'
import { message, notification } from 'ant-design-vue'
import Wangeditor from '@/components/Wangeditor'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import moment from 'moment'
const defaultForm = {
  status: 'draft',
  author: undefined,
  title: '', // 文章题目
  content: '111', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: { Wangeditor },
  setup(props) {
    const route = useRoute()
    const store = useStore()
    const ctx = getCurrentInstance()
    const tempRoute = ref({})
    const postForm = ref(Object.assign({}, defaultForm))
    const loading = ref(false)
    const displayTime = computed({
      get: () => moment(postForm.value.display_time),
      set: (val) => {
        postForm.value.display_time = moment(val)
      }
    })
    const contentShortLength = computed(
      () => postForm.value.content_short.length
    )
    const validateRequire = async(rule, value, callback) => {
      if (value === '') {
        message.error(rule.field + '为必传项')
        Promise.reject(rule.field + '为必传项')
      } else {
        return Promise.resolve()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          return Promise.resolve()
        } else {
          message.error('外链url填写不正确')
          Promise.reject('外链url填写不正确')
        }
      } else {
        return Promise.resolve()
      }
    }
    const rules = ref({
      image_uri: [{ validator: validateRequire }],
      title: [{ validator: validateRequire }],
      content: [{ validator: validateRequire }],
      source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
    })
    const submitForm = () => {
      console.log(ctx.refs.form.validate())
      ctx.refs.form
        .validate()
        .then(() => {
          loading.value = true
          notification.success({
            message: '成功',
            description: '发布文章成功'
          })
          postForm.value.status = 'published'
          loading.value = false
        })
        .catch(() => {
          console.log('error submit!!')
          return false
        })
    }
    const draftForm = () => {
      if (
        postForm.value.content.length === 0 ||
        postForm.value.title.length === 0
      ) {
        message.warning('请填写必要的标题和内容')
        return
      }
      message.success('保存成功')
      postForm.value.status = 'draft'
    }
    const change = (val) => {
      postForm.value.content = val
    }
    const handleChange = (info) => {
      const status = info.file.status
      if (status !== 'uploading') {
        postForm.value.image_uri = info.file.response.files.file
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
    const lang = computed(() => store.getters.language)
    const setTagsViewTitle = () => {
      const title = lang.value === 'zh' ? '编辑文章' : 'Edit Article'
      tempRoute.value.meta.title = `${title}-${postForm.value.id}`
      const route = Object.assign({}, tempRoute.value)
      store.dispatch('tagsView/updateVisitedView', route)
    }
    const setPageTitle = () => {
      const title = lang.value === 'zh' ? '编辑文章' : 'Edit Article'
      document.title = `${title} - ${postForm.value.id}`
    }
    const fetchData = (id) => {
      fetchArticle(id)
        .then((response) => {
          postForm.value = response.data
          // set tagsview title
          setTagsViewTitle()
          // set page title
          setPageTitle()
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const userListOptions = ref([])
    const getRemoteUserList = (query) => {
      searchUser(query).then((response) => {
        if (!response.data.items) return
        userListOptions.value = response.data.items.map((v) => v.name)
      })
    }
    onMounted(() => {
      if (props.isEdit) {
        const id = route.params && route.params.id
        fetchData(id)
        tempRoute.value = Object.assign({}, route)
      }
    })
    return {
      postForm,
      rules,
      loading,
      submitForm,
      draftForm,
      contentShortLength,
      change,
      handleChange,
      getRemoteUserList,
      userListOptions,
      displayTime
    }
  }
})
</script>
<style lang="less" scoped>
.createPost-container {
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
  }
  .sub-navbar {
    height: 50px;
    line-height: 50px;
    position: relative;
    width: 100%;
    text-align: right;
    padding-right: 20px;
    transition: position 0.6s ease;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#20b6f9),
      color-stop(0, #20b6f9),
      color-stop(100%, #2178f1),
      to(#2178f1)
    );
    background: linear-gradient(
      90deg,
      #20b6f9,
      #20b6f9 0,
      #2178f1 100%,
      #2178f1 0
    );
  }
  .success {
    color: #fff;
    background-color: #13ce66;
    border-color: #13ce66;
    &:hover {
      background: #42d885;
      border-color: #42d885;
      color: #fff;
    }
  }
  .warning {
    color: #fff;
    background-color: #ffba00;
    border-color: #ffba00;
    &:hover {
      background: #ffc833;
      border-color: #ffc833;
      color: #fff;
    }
  }
  .deleted {
    background: #d0d0d0;
  }
  .draft {
    background: #d0d0d0;
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: -10px;
  }
  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #bfcbd9;
      &:focus {
        box-shadow: none;
      }
    }
  }
  .col-24 {
    ::v-deep .ant-col {
      width: 100%;
    }
  }
  .col-18 {
    ::v-deep .ant-form-item-control-wrapper {
      width: 75%;
    }
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
