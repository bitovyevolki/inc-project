const path = require('path')

module.exports = {
  defaultNS: 'common',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },
  localePath: path.resolve('./public/locales'),
  // react: { useSuspense: false },
}
