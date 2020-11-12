const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    occupation: '前端工程师',
    team: ['中台', '数据平台团队', '前端创新团', '前端架构和平台工具团队'],
    address: '深圳市',
    tags: ['大神', '很有想法', '懂点设计', '菜烧的不错']
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    occupation: '运营',
    team: ['运营团队'],
    address: '深圳市',
    tags: ['哈哈']
  }
}

const message = [
  {
    time: '2019-05-08 14:33:18',
    content: '蒂姆·库克回复了你的邮件'
  },
  {
    time: '2019-05-08 14:33:18',
    content: '乔纳森·伊夫邀请你参加会议 '
  },
  {
    time: '2019-05-08 14:33:18',
    content: '蒂姆·库克回复了你的邮件'
  },
  {
    time: '2019-05-08 14:33:18',
    content: '斯蒂夫·沃兹尼亚克已批准了你的休假申请 '
  },
  {
    time: '2019-05-08 14:33:18',
    content: '史蒂夫·乔布斯收藏了你的文章 '
  },
  {
    time: '2019-05-08 14:33:18',
    content: '比尔·费尔南德斯通过了你的好友申请 '
  }
]

module.exports = [
  // user login
  {
    url: '/vue-antd-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-antd-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-antd-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // get message
  {
    url: '/vue-antd-admin/user/message',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: message
      }
    }
  }
]
