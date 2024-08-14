// i18n.ts
import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from '../public/locales/en/common.json'
import ruTranslations from '../public/locales/ru/common.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS: 'common',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    ns: ['common'],
    resources: {
      en: { common: enTranslations },
      ru: { common: ruTranslations },
    },
  })

export default i18n
