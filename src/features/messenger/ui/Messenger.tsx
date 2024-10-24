import { useEffect } from 'react'

import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './Messenger.module.scss'

import { useMeQuery } from '../../auth/service/auth.service'
import { Dialogs } from './dialogs/Dialogs'
import { Messages } from './messages/Messages'

export const Messenger = () => {
  const t = useTranslations('Messenger')
  const { changeQueryHandler, searchParams } = useParamsHook()
  const partnerId = searchParams.get('partnerId')
  const { data } = useMeQuery()

  useEffect(() => {
    changeQueryHandler({ partnerId: `${partnerId}` })
  }, [])

  if (!data) {
    return
  }

  return (
    <div className={s.wrapper}>
      <Typography variant={'h2'}>{'Messenger'}</Typography>
      <div className={s.container}>
        <Dialogs myId={data.userId} />

        <Messages partnerId={Number(partnerId)} />
      </div>
    </div>
  )
}
