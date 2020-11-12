import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-antd-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-antd-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-antd-admin/user/logout',
    method: 'post'
  })
}

export function getMessage() {
  return request({
    url: '/vue-antd-admin/user/message',
    method: 'post'
  })
}
