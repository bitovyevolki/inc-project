import { GetServerSidePropsContext } from 'next'

export const getI18nConfig = async (context: GetServerSidePropsContext) => {
  const localeFromCookie = context.req.cookies['next-language']
  const localeFromBrowser = context.req.headers['accept-language']?.split(',')[0] || 'en'

  const locale = localeFromCookie || localeFromBrowser

  try {
    const messages = (await import(`../locales/${locale}.json`)).default

    return {
      locale,
      messages,
    }
  } catch (error) {
    console.error('Error loading locale messages:', error)

    return {
      locale,
      messages: {},
    }
  }
}
