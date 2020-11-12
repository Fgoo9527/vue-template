import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import antdEnLocale from 'ant-design-vue/es/locale/en_US'
import antdZhLocale from 'ant-design-vue/es/locale/zh_CN'
import antdEsLocale from 'ant-design-vue/es/locale/es_ES'
import antdJaLocale from 'ant-design-vue/es/locale/ja_JP'
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'

const messages = {
  en: {
    ...antdEnLocale,
    ...enLocale
  },
  zh: {
    ...antdZhLocale,
    ...zhLocale
  },
  es: {
    ...antdEsLocale,
    ...esLocale
  },
  ja: {
    ...antdJaLocale,
    ...jaLocale
  }
}

export const i18n = createI18n({
  locale: getUAgentLang(),
  messages
})

export const setLang = (lang) => {
  i18n.global.locale.value = lang
}

export function getUAgentLang() {
  const chooseLanguage = Cookies.get('locale')
  if (chooseLanguage) return chooseLanguage
  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

export default i18n
