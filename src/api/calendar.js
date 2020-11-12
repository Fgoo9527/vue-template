import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/vue-antd-admin/calendar/list',
    method: 'get'
  })
}
