import request from '@/utils/request'

export function getKeywordList() {
  return request({
    url: '/vue-antd-admin/home/keyword',
    method: 'get'
  })
}

export function getSexList() {
  return request({
    url: '/vue-antd-admin/home/sex',
    method: 'get'
  })
}
