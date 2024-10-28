import { ChangeEvent, useEffect, useState } from 'react'

import { useDebounce } from '@/src/shared/hooks/use-debounce'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Input } from '@bitovyevolki/ui-kit-int'

import s from './dialogs.module.scss'

import { DialogItemType } from '../../model/messenger'
import { useGetDialogsQuery } from '../../model/messenger.service'
import { DialogItem } from '../dialog-item/DialogItem'

type DialogProps = {
  myId: number
}

export const Dialogs = ({ myId }: DialogProps) => {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchValue = useDebounce(searchInput, 500)
  const { data, isFetching, isLoading } = useGetDialogsQuery({ searchName: debouncedSearchValue })

  const { changeQueryHandler } = useParamsHook()

  const [activeChatId, setActiveChatId] = useState<number>(0)

  const [users, setUsers] = useState<DialogItemType[]>([])

  useEffect(() => {
    setUsers([])
  }, [debouncedSearchValue])

  useEffect(() => {
    if (data) {
      setUsers(prev => [...prev, ...data.items])
    }
  }, [data])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  const handleOnSearchClear = () => {
    setSearchInput('')
    setUsers([])
  }

  const handleChangeActiveChat = (ownerId: number, receiverId: number, chatId: number) => {
    const newPartnerId = myId === ownerId ? receiverId : ownerId

    setActiveChatId(chatId)
    changeQueryHandler({ partnerId: newPartnerId })
  }

  const dialogsList = () => {
    if (isLoading || isFetching) {
      return <RoundLoader variant={'small'} />
    }

    if (data && data.items.length === 0) {
      return <div>Нет диалогов</div>
    }

    return (
      <div className={s.dialogsList}>
        {users.map(d => {
          const isActiveChat = d.id === activeChatId

          return (
            <div
              className={`${s.dialogItem} ${isActiveChat ? s.active : ''}`}
              key={d.id}
              onClick={() => handleChangeActiveChat(d.ownerId, d.receiverId, d.id)}
            >
              <DialogItem dialog={d} isActiveChat={isActiveChat} />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.search}>
        <Input
          autoComplete={'off'}
          clear={handleOnSearchClear}
          onChange={handleChange}
          placeholder={'Search'}
          type={'search'}
          value={searchInput}
        />
      </div>
      {dialogsList()}
    </div>
  )
}
