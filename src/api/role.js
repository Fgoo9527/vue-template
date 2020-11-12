import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-antd-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-antd-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-antd-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-antd-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-antd-admin/role/${id}`,
    method: 'delete'
  })
}
