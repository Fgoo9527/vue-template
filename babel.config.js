module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // 按需加载
    [
      'import',
      // style 为 true 加载 less文件
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }
    ]
  ]
}
