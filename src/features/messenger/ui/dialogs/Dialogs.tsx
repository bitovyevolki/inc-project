import { ChangeEvent, useEffect, useState } from 'react'

import { useDebounce } from '@/src/shared/hooks/use-debounce'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Input } from '@bitovyevolki/ui-kit-int'

import s from './dialogs.module.scss'

import { DialogItemType } from '../../model/messenger'
import { useGetDialogsQuery } from '../../model/messenger.service'
import { DialogItem } from '../dialog-item/DialogItem'
import { useInView } from 'react-intersection-observer'

type DialogProps = {
  myId: number
}

export const Dialogs = ({ myId }: DialogProps) => {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchValue = useDebounce(searchInput, 500)
  const [cursor, setCursor] = useState<number | undefined>()
  const { data, isFetching, isLoading } = useGetDialogsQuery({ searchName: debouncedSearchValue, cursor })

  const { changeQueryHandler } = useParamsHook()
  const { ref, inView } = useInView()

  const [activeChatId, setActiveChatId] = useState<number>(0)
	
  const [users, setUsers] = useState<DialogItemType[]>([])
	const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    setUsers([])
  }, [debouncedSearchValue])

  useEffect(() => {
    if (data) {
      setUsers(prev => [...prev, ...data.items])
			setTotalCount(data?.totalCount)
    }
  }, [data])

		  useEffect(() => {
    if (inView) {
      setCursor(users[users.length - 1]?.id)
    }
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

    setActiveChatId(chatId)
    changeQueryHandler({ partnerId: newPartnerId })
  }

  const dialogsList = () => {

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
				{totalCount > users.length && <div ref={ref}></div>}
				{isFetching && <div className={s.loader}><RoundLoader variant={'small'} /></div>}
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
