import { ChangeEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useDebounce } from '@/src/shared/hooks/use-debounce'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Input } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'

import s from './dialogs.module.scss'

import { DialogItemType, MessageItemType } from '../../model/messenger'
import { useGetDialogsQuery } from '../../model/messenger.service'
import { DialogItem } from '../dialog-item/DialogItem'

type DialogProps = {
  messagesSocket: MessageItemType[]
  myId: number
  partnerId: number
  setNewMessagesSocket: (arr: []) => void
}

export const Dialogs = ({ messagesSocket, myId, partnerId, setNewMessagesSocket }: DialogProps) => {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchValue = useDebounce(searchInput, 500)
  const [cursor, setCursor] = useState<number | undefined>()
  const { data, isFetching, isLoading, refetch } = useGetDialogsQuery({
    cursor,
    searchName: debouncedSearchValue,
  })

  const { changeQueryHandler } = useParamsHook()
  const { inView, ref } = useInView()

  const [users, setUsers] = useState<DialogItemType[]>([])
  const [isUpdateUsers, setIsUpdateUsers] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    refetch()
    setIsUpdateUsers(true)
  }, [messagesSocket, refetch])

  useEffect(() => {
    setUsers([])
  }, [debouncedSearchValue])

  useEffect(() => {
    if (data) {
      if (isUpdateUsers) {
        setUsers(data.items)
        setTotalCount(data.totalCount)
        setIsUpdateUsers(false)
      } else {
        setUsers(prev => [...prev, ...data.items])
        setTotalCount(data.totalCount)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (inView) {
      setCursor(users[users.length - 1]?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  const handleOnSearchClear = () => {
    setSearchInput('')
    setUsers([])
  }

  const handleChangeActiveChat = (ownerId: number, receiverId: number, chatId: number) => {
    const newPartnerId = myId === ownerId ? receiverId : ownerId

    setNewMessagesSocket([])
    changeQueryHandler({ partnerId: newPartnerId })
  }

  const dialogsList = () => {
    if (data && data.items.length === 0) {
      return <div>Нет диалогов</div>
    }

    return (
      <div className={s.dialogsList}>
        {users.map(d => {
          const isActiveChat = partnerId === d.ownerId || partnerId === d.receiverId

          return (
            <div
              className={clsx(s.dialogItem, {
                [s.active]: isActiveChat,
              })}
              key={d.id}
              onClick={() => handleChangeActiveChat(d.ownerId, d.receiverId, d.id)}
            >
              <DialogItem dialog={d} isActiveChat={isActiveChat} myId={myId} />
            </div>
          )
        })}
        {totalCount > users.length && <div ref={ref}></div>}
        {isFetching && (
          <div className={s.loader}>
            <RoundLoader variant={'small'} />
          </div>
        )}
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
