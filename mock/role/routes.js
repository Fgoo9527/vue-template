// Just a mock data

const constantRoutes = [
  {
    path: '/',
    component: 'layout/Layout',
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: 'home', icon: 'HomeOutlined' }
      }
    ]
  },
  {
    path: '/lock-page',
    component: () => import('@/views/lock-page/index'),
    hidden: true
  },
  {
    path: '/redirect/:pathMatch(.*)',
    component: () => import('@/views/redirect/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500'),
    hidden: true
  },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/error-page/404'), hidden: true }
]

const asyncRoutes = [
  {
    path: '/permission',
    name: 'Permission',
    component: 'layout/Layout',
    redirect: 'noRedirect',
    meta: {
      title: 'permission',
      icon: 'iconcontrol'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'Page',
        meta: { title: 'page', icon: 'iconfileprotect' }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'Role',
        meta: { title: 'role', icon: 'iconteam' }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'Directive',
        meta: { title: 'directive', icon: 'iconsafetycertificate', tag: { value: 'New', color: '#87d068' }}
      }
    ]
  },
  {
    path: '/error',
    name: 'Error',
    component: 'layout/Layout',
    redirect: 'noRedirect',
    meta: {
      title: 'error',
      icon: 'icondisconnect',
      roles: ['admin']
    },
    children: [
      {
        path: '403',
        component: () => import('@/views/error-page/403'),
        name: 'Page403',
        meta: { title: '403', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      },
      {
        path: '500',
        component: () => import('@/views/error-page/500'),
        name: 'Page500',
        meta: { title: '500', noCache: true }
      }
    ]
  },
  {
    path: '/result',
    name: 'Result',
    component: 'layout/Layout',
    redirect: '/Result/success',
    meta: { title: 'result', icon: 'iconbulb' },
    children: [
      {
        path: 'success',
        name: 'Success',
        component: () => import('@/views/result/Success.vue'),
        meta: { title: 'success', icon: 'iconcheck', tag: { value: 'New', color: '#87d068' }}
      },
      {
        path: 'fail',
        name: 'Fail',
        component: () => import('@/views/result/Fail.vue'),
        meta: { title: 'fail', icon: 'iconclose', tag: { value: 'New', color: '#87d068' }}
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: 'layout/Layout',
    redirect: '/profile/basic',
    meta: { title: 'profile', icon: 'iconproject' },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/profile/basic.vue'),
        meta: { title: 'basic', tag: { value: 'New', color: '#87d068' }}
      },
      {
        path: 'advanced',
        name: 'Advanced',
        component: () => import('@/views/profile/advanced.vue'),
        meta: { title: 'advanced', tag: { value: 'New', color: '#87d068' }}
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: 'layout/Layout',
    redirect: '/setting/user',
    meta: { title: 'setting', icon: 'iconwrench' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/setting/User.vue'),
        meta: { title: 'user' }
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/setting/Account.vue'),
        meta: { title: 'account' }
      }
    ]
  },
  {
    path: '/menu',
    name: 'Menu',
    component: 'layout/Layout',
    redirect: '/Menu/Menu1',
    meta: { title: 'menu', icon: 'iconalert' },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import('@/views/menu/menu.vue'),
        meta: { title: 'menu1', icon: 'iconalert' },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            component: () => import('@/views/menu/menu.vue'),
            meta: { title: 'menu1-1', icon: 'iconalert' },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu1-1-1',
                component: () => import('@/views/menu/menu.vue'),
                meta: { title: 'menu1-1-1', icon: 'iconalert' }
              },
              {
                path: 'menu1-1-2',
                name: 'Menu1-1-2',
                component: () => import('@/views/menu/menu.vue'),
                meta: { title: 'menu1-1-2', icon: 'iconalert' }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu1-2',
            component: () => import('@/views/menu/menu.vue'),
            meta: { title: 'menu1-2', icon: 'iconalert' }
          }
        ]
      },
      {
        path: 'Menu2',
        name: 'Menu2',
        component: () => import('@/views/menu/menu.vue'),
        meta: { title: 'menu2', icon: 'iconalert' }
      }
    ]
  },
  {
    path: '/plugin',
    name: 'Plugin',
    component: 'layout/Layout',
    meta: { title: 'plugin', icon: 'iconappstore' },
    children: [
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/plugin/map/index.vue'),
        meta: { title: 'map', icon: 'iconblock', tag: { value: '99', color: '#108ee9' }}
      },
      {
        path: 'markdown',
        name: 'Markdown',
        component: () => import('@/views/plugin/markdown/index.vue'),
        meta: { title: 'markdown', icon: 'iconedit' }
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/plugin/wangeditor/index.vue'),
        meta: { title: 'edit', icon: 'iconfile-text', tag: { value: 'Hot', color: '#f56c6c' }}
      }
    ]
  },
  {
    path: '/table',
    name: 'Table',
    component: 'layout/Layout',
    redirect: '/table/complex-table',
    meta: { title: 'Table', icon: 'icontable' },
    children: [
      {
        path: 'complex-table',
        name: 'Complex-table',
        component: () => import('@/views/table/complex-table.vue'),
        meta: { title: 'complex-table' }
      },
      {
        path: 'inline-edit-table',
        name: 'Inline-edit-table',
        component: () => import('@/views/table/inline-edit-table.vue'),
        meta: { title: 'inline-edit-table' }
      }
    ]
  },
  {
    path: '/form',
    name: 'Form',
    component: 'layout/Layout',
    redirect: '/form/base-form',
    meta: { title: 'form', icon: 'iconreconciliation' },
    children: [
      {
        path: 'base-form',
        name: 'Base-form',
        component: () => import('@/views/form/baseForm/index.vue'),
        meta: { title: 'base-form', tag: { value: 'New', color: '#87d068' }}
      },
      {
        path: 'step-form',
        name: 'Step-form',
        component: () => import('@/views/form/stepForm/index.vue'),
        meta: { title: 'step-form', tag: { value: 'New', color: '#87d068' }}
      },
      {
        path: 'dynamic-form',
        name: 'Dynamic-form',
        component: () => import('@/views/form/dynamicForm/index.vue'),
        meta: { title: 'dynamic-form', tag: { value: 'New', color: '#87d068' }}
      }
    ]
  },
  {
    path: '/error-log',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: () => import('@/views/error-log/index.vue'),
        name: 'error-log',
        meta: { title: 'error-log', icon: 'iconfile-exception' }
      }
    ]
  }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
