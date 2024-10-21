import { Suspense, lazy, useEffect, useState } from 'react'

import { Loader } from '@/src/shared/ui/loader/Loader'
import { useLocale } from 'next-intl'

const RemoteMessenger = lazy(async () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    return await import('Messenger/RemoteMessenger')
  } catch (error) {
    return { default: () => <div>Ошибка загрузки Messenger</div> }
  }
})

export const Messenger = () => {
  const [isClient, setIsClient] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient ? (
        <Suspense fallback={<Loader />}>
          <RemoteMessenger locale={locale} />
        </Suspense>
      ) : (
        <Loader />
      )}
    </>
  )
}
