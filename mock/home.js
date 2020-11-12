const sexList = []
for (let i = 0; i < 96; i++) {
  if (i < 60) {
    sexList.push('rgb(51, 153, 255)')
  } else if (i >= 60 && i < 80) {
    sexList.push('rgb(190, 107, 224)')
  } else {
    sexList.push('rgb(186, 189, 195)')
  }
}

const keyword = [
  {
    key: '1',
    top: '1',
    keyWord: '搜索关键词-0',
    userCount: '25',
    weekIncrease: '57%'
  },
  {
    key: '2',
    top: '2',
    keyWord: '搜索关键词-1',
    userCount: '67',
    weekIncrease: '32%'
  },
  {
    key: '3',
    top: '3',
    keyWord: '搜索关键词-2',
    userCount: '257',
    weekIncrease: '19%'
  },
  {
    key: '4',
    top: '4',
    keyWord: '搜索关键词-3',
    userCount: '36',
    weekIncrease: '22%'
  },
  {
    key: '5',
    top: '5',
    keyWord: '搜索关键词-4',
    userCount: '36',
    weekIncrease: '22%'
  },
  {
    key: '6',
    top: '6',
    keyWord: '搜索关键词-5',
    userCount: '36',
    weekIncrease: '22%'
  },
  {
    key: '7',
    top: '7',
    keyWord: '搜索关键词-6',
    userCount: '36',
    weekIncrease: '22%'
  },
  {
    key: '8',
    top: '8',
    keyWord: '搜索关键词-7',
    userCount: '36',
    weekIncrease: '22%'
  },
  {
    key: '9',
    top: '9',
    keyWord: '搜索关键词-8',
    userCount: '36',
    weekIncrease: '22%'
  },
  {
    key: '10',
    top: '10',
    keyWord: '搜索关键词-9',
    userCount: '36',
    weekIncrease: '22%'
  }
]

module.exports = [
  // get keywordList
  {
    url: '/vue-antd-admin/home/keyword',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: keyword
      }
    }
  },

  // get sexList
  {
    url: '/vue-antd-admin/home/sex',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: sexList
      }
    }
  }
]
