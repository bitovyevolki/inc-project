import { useState } from 'react'

import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { SearchIcon } from '@/src/shared/ui/Sidebar/Icons'
import { Input, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './Messenger.module.scss'

import { Dialogs } from './dialogs-list/Dialogs'
import { Messages } from './messages/Messages'

export const Messenger = () => {
  const t = useTranslations('Messenger')

  const [activeChat, setActiveChat] = useState(true)

  return (
    <div className={s.wrapper}>
      <Typography variant={'h2'}>{'Messenger'}</Typography>
      <div className={s.container}>
        <div className={s.dialogs}>
          <form className={s.form}>
            <div className={s.searchIcon}>
              <SearchIcon />
            </div>
            <Input className={s.input} placeholder={'Input Search'} />
          </form>
          <div className={s.dialogList}>
            <Dialogs activeChat={activeChat} />
          </div>
        </div>
        <div className={s.messages}>
          <div>
            {activeChat ? (
              <div className={s.title}>
                <div className={s.titleIcon}>
                  <AvatarIcon />
                </div>
                <div className={s.titleName}>Jekaterina Ivanova</div>
              </div>
            ) : (
              <div className={s.title}></div>
            )}
          </div>
          <Messages activeChat={activeChat} />
        </div>
      </div>
    </div>
  )
}
