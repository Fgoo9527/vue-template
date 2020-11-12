<template>
  <template>
    <a-descriptions size="small">
      <a-descriptions-item label="创建人">曲丽丽</a-descriptions-item>
      <a-descriptions-item label="订购产品">XX 服务</a-descriptions-item>
      <a-descriptions-item label="创建时间">2017-07-07</a-descriptions-item>
      <a-descriptions-item label="关联单据">
        <a href="">12421</a>
      </a-descriptions-item>
      <a-descriptions-item label="生效日期">2017-07-07 ~ 2017-08-08</a-descriptions-item>
      <a-descriptions-item label="备注">请于两个工作日内确认</a-descriptions-item>
    </a-descriptions>
  </template>

  <template>
    <a-button-group style="margin-right: 4px">
      <a-button>操作</a-button>
      <a-button>操作</a-button>
      <a-button><EllipsisOutlined /></a-button>
    </a-button-group>
    <a-button type="primary">主操作</a-button>
  </template>

  <template>
    <a-row class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">状态</div>
        <div class="heading">待审批</div>
      </a-col>
      <a-col :xs="12" :sm="12">
        <div class="text">订单金额</div>
        <div class="heading">¥ 568.08</div>
      </a-col>
    </a-row>
  </template>

  <a-card :bordered="false" title="流程进度">
    <a-steps :current="1" progressDot>
      <a-step>
        <template v-slot:title>
          <span>创建项目</span>
        </template>
        <template v-slot:description>
          <div class="antd-pro-pages-profile-advanced-style-stepDescription">
            曲丽丽<DingdingOutlined style="margin-left: 8px" />
            <div>2016-12-12 12:32</div>
          </div>
        </template>
      </a-step>
      <a-step>
        <template v-slot:title>
          <span>部门初审</span>
        </template>
        <template v-slot:description>
          <div class="antd-pro-pages-profile-advanced-style-stepDescription">
            周毛毛
            <DingdingOutlined
              style="color: rgb(0, 160, 233); margin-left: 8px"
            />
            <div><a>催一下</a></div>
          </div>
        </template>
      </a-step>
      <a-step title="财务复核" />
      <a-step title="完成" />
    </a-steps>
  </a-card>

  <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
    <a-descriptions>
      <a-descriptions-item label="用户姓名">付晓晓</a-descriptions-item>
      <a-descriptions-item label="会员卡号">32943898021309809423</a-descriptions-item>
      <a-descriptions-item label="身份证">3321944288191034921</a-descriptions-item>
      <a-descriptions-item label="联系方式">18112345678</a-descriptions-item>
      <a-descriptions-item label="联系地址">浙江省杭州市西湖区黄姑山路工专路交叉路口</a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="信息组">
      <a-descriptions-item label="某某数据">725</a-descriptions-item>
      <a-descriptions-item label="该数据更新时间">2018-08-08</a-descriptions-item>
      <a-descriptions-item label="某某数据">725</a-descriptions-item>
      <a-descriptions-item label="该数据更新时间">2018-08-08</a-descriptions-item>
    </a-descriptions>
    <a-card type="inner" title="多层信息组">
      <a-descriptions title="组名称" size="small">
        <a-descriptions-item label="负责人">林东东</a-descriptions-item>
        <a-descriptions-item label="角色码">1234567</a-descriptions-item>
        <a-descriptions-item label="所属部门">XX公司-YY部</a-descriptions-item>
        <a-descriptions-item label="过期时间">2018-08-08</a-descriptions-item>
        <a-descriptions-item label="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin: 16px 0" />
      <a-descriptions title="组名称" size="small" :col="1">
        <a-descriptions-item label="学名">
          Citrullus lanatus (Thunb.) Matsum. et
          Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</a-descriptions-item
        >
      </a-descriptions>
      <a-divider style="margin: 16px 0" />
      <a-descriptions title="组名称" size="small" :col="2">
        <a-descriptions-item label="负责人">付小小</a-descriptions-item>
        <a-descriptions-item label="角色码">1234567</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </a-card>

  <a-card style="margin-top: 24px" :bordered="false" title="用户近半年来电记录">
    <div class="no-data"><FrownOutlined />暂无数据</div>
  </a-card>

  <a-card
    style="margin-top: 24px"
    :bordered="false"
    :tabList="operationTabList"
    :activeTabKey="operationActiveTabKey"
    @tabChange="
      (key) => {
        this.operationActiveTabKey = key
      }
    "
  >
    <a-table
      v-if="operationActiveTabKey === '1'"
      :columns="operationColumns"
      :dataSource="operation1"
      :pagination="false"
    >
      <template v-slot:status="{ text: status }">
        <a-badge
          :status="status === 'agree' ? 'success' : 'error'"
          :text="status === 'agree' ? '成功' : '驳回'"
        />
      </template>
    </a-table>
    <a-table
      v-if="operationActiveTabKey === '2'"
      :columns="operationColumns"
      :dataSource="operation2"
      :pagination="false"
    >
      <template v-slot:status="{ text: status }">
        <a-badge
          :status="status === 'agree' ? 'success' : 'error'"
          :text="status === 'agree' ? '成功' : '驳回'"
        />
      </template>
    </a-table>
    <a-table
      v-if="operationActiveTabKey === '3'"
      :columns="operationColumns"
      :dataSource="operation3"
      :pagination="false"
    >
      <template v-slot:status="{ text: status }">
        <a-badge
          :status="status === 'agree' ? 'success' : 'error'"
          :text="status === 'agree' ? '成功' : '驳回'"
        />
      </template>
    </a-table>
  </a-card>
</template>

<script>
import {
  DingdingOutlined,
  FrownOutlined,
  EllipsisOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const tabList = ref([
      { key: 'detail', tab: '详情' },
      { key: 'rule', tab: '规则' }
    ])
    const tabActiveKey = ref('detail')
    const operationTabList = ref([
      {
        key: '1',
        tab: '操作日志一'
      },
      {
        key: '2',
        tab: '操作日志二'
      },
      {
        key: '3',
        tab: '操作日志三'
      }
    ])
    const operationActiveTabKey = ref('1')
    const operationColumns = ref([
      {
        title: '操作类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '操作人',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '执行结果',
        dataIndex: 'status',
        key: 'status',
        slots: { customRender: 'status' }
      },
      {
        title: '操作时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      }
    ])
    const operation1 = ref([
      {
        key: 'op1',
        type: '订购关系生效',
        name: '曲丽丽',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        remark: '-'
      },
      {
        key: 'op2',
        type: '财务复审',
        name: '付小小',
        status: 'reject',
        updatedAt: '2017-10-03  19:23:12',
        remark: '不通过原因'
      },
      {
        key: 'op3',
        type: '部门初审',
        name: '周毛毛',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        remark: '-'
      },
      {
        key: 'op4',
        type: '提交订单',
        name: '林东东',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        remark: '很棒'
      },
      {
        key: 'op5',
        type: '创建订单',
        name: '汗牙牙',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        remark: '-'
      }
    ])
    const operation2 = ref([
      {
        key: 'op2',
        type: '财务复审',
        name: '付小小',
        status: 'reject',
        updatedAt: '2017-10-03  19:23:12',
        remark: '不通过原因'
      },
      {
        key: 'op3',
        type: '部门初审',
        name: '周毛毛',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        remark: '-'
      },
      {
        key: 'op4',
        type: '提交订单',
        name: '林东东',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        remark: '很棒'
      }
    ])
    const operation3 = ref([
      {
        key: 'op2',
        type: '财务复审',
        name: '付小小',
        status: 'reject',
        updatedAt: '2017-10-03  19:23:12',
        remark: '不通过原因'
      },
      {
        key: 'op3',
        type: '部门初审',
        name: '周毛毛',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        remark: '-'
      }
    ])
    const handleTabChange = (key) => {
      tabActiveKey.value = key
    }
    return {
      tabList,
      tabActiveKey,
      operationTabList,
      operationActiveTabKey,
      operationColumns,
      operation1,
      operation2,
      operation3,
      handleTabChange
    }
  },
  components: { DingdingOutlined, FrownOutlined, EllipsisOutlined }
})
</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}
.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}
.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;
  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}
</style>
