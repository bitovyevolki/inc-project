import { useEffect, useState } from 'react'

import useSocket from '@/src/shared/hooks/useWebSocket'
import { useLocale } from 'next-intl'

export const Messenger = () => {
  const locale = useLocale()
  const { error, isConnected, messages, notifications } = useSocket()

  useEffect(() => {
    console.log('notifications: ', notifications)
    console.log('isConnected: ', isConnected)
    console.log('messages: ', messages)
    console.log('error: ', error)
  }, [error, isConnected, messages, notifications])

  return <div>Messenger</div>
}
