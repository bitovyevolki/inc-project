import { useEffect, useState } from 'react'

import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { Sidebar } from '@/src/shared/ui/Sidebar/Sidebar'
import { Input, Typography } from '@bitovyevolki/ui-kit-int'

import s from './SearchUsers.module.scss'

import { useGetUserByUserNameQuery } from '../api/search.services'
import { IUser } from '../model/user-model'
import { User } from './user/User'

export const SearchUsers = () => {
  const { changeQueryHandler, searchParams } = useParamsHook()
  const searchValue = searchParams.get('searchTerm')
  const [inputValue, setInputValue] = useState(searchValue || '')
  const [searchUsers, setSearchUsers] = useState<IUser[]>([])
  const [endCursorUserId, setEndCursorUserId] = useState(0)
  const { data, isError, isLoading } = useGetUserByUserNameQuery({
    cursor: endCursorUserId,
    userName: searchValue || '',
  })

  useEffect(() => {
    if (data?.items) {
      setSearchUsers(data.items)
    }
  }, [data])

  useEffect(() => {
    if (inputValue) {
      setSearchUsers([])
      setEndCursorUserId(0)
      changeQueryHandler({ searchTerm: inputValue })
    }
  }, [inputValue])

  useEffect(() => {
    setInputValue(searchValue || '')
  }, [searchValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleOnSearchClear = () => {
    setInputValue('')
    setSearchUsers([])
  }

  if (isError) {
    return <Typography variant={'body2'}>Ошибка при получении данных пользователя</Typography>
  }

  return (
    <div className={s.wrap}>
      <Sidebar />
      <div className={s.searchList}>
        <div className={s.searchWrapper}>
          <div className={s.title}>
            <Typography variant={'h2'}>{'Поиск'}</Typography>
          </div>
          <Input
            clear={handleOnSearchClear}
            onChange={handleChange}
            placeholder={'Поиск'}
            type={'search'}
            value={inputValue}
          />
          <div>
            {isLoading && <Typography variant={'body2'}>Загрузка...</Typography>}
            {searchUsers.map(user => (
              <User key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
