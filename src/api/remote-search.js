import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-antd-admin/search/user',
    method: 'get',
    params: { name }
  })
}
