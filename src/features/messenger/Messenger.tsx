import { Suspense, lazy, useEffect, useState } from 'react'

import { Loader } from '@/src/shared/ui/loader/Loader'

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

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient ? (
        <Suspense fallback={<Loader />}>
          <RemoteMessenger />
        </Suspense>
      ) : (
        <Loader />
      )}
    </>
  )
}
