const list = {
  2020: {
    9: {
      1: [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' }
      ],
      2: [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' }
      ]
    },
    10: {
      10: [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' }
      ],
      15: [
        { type: 'warning', content: 'This is warning event' },
        {
          type: 'success',
          content: 'This is very long usual event....'
        },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' }
      ]
    }
  }
}

module.exports = [
  {
    url: '/vue-antd-admin/calendar/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: list
      }
    }
  }
]
