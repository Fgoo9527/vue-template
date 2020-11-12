import { message } from 'ant-design-vue'

function clipboardSuccess(text) {
  message.success(`复制${text}成功`)
}

function clipboardError(text) {
  message.error(`复制${text}失败`)
}

/**
 * @description 复制数据
 * @param value
 */
export default function handleClipboard(value) {
  const input = document.createElement('input')
  input.style.position = 'fixed'
  input.style.bottom = '-1000px'
  input.setAttribute('value', value)
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy') ? clipboardSuccess(value) : clipboardError(value)
}
