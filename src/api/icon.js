import request from '@/utils/request'

export function getIconList(params) {
  return request({
    url: '/vue-antd-admin/icon/getList',
    method: 'get',
    params
  })
}
