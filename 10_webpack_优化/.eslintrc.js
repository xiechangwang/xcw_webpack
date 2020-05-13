module.exports = {
  root: true, // 表示根目录
  extends: 'standard', // 继承标准规则
  plugins: [
      'html' // 使用eslint-plugin-html
  ],
  env: {
      browser: true, // 浏览器环境
      node: true // node环境
  },
  globals: { // 允许全局变量,将$设置为true，表示允许使用全局变量$
      $: true
  },
  rules: {  // 重新覆盖 extends: 'standard'的规则
      indent: ['error', 4], // error类型，缩进4个空格
      'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
      'eol-last': 0, // 不检测新文件末尾是否有空行
      'semi': ['error', 'always'] // 必须在语句后面加分号
  }
}