import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { Sidebar } from '@/src/shared/ui/Sidebar/Sidebar'
import { Input, Typography } from '@bitovyevolki/ui-kit-int'
import { useEffect } from 'react'
import { useState } from 'react'
import { useGetUserByUserNameQuery } from '../api/search.services'
import { IUser, IUsersResponse } from '../model/user-model'
import { SearchItem } from './search-list/SearchItem'
import s from './search.module.scss'

export const SearchProfile = () => {
  const { changeQueryHandler, searchParams } = useParamsHook()
  const searchValue = searchParams.get('searchTerm')
  const [inputValue, setInputValue] = useState(searchValue)
  const [searchUsers, setSearchUsers] = useState<IUser[]>([])
  const [endCursorUsertId, setEndCursorUserId] = useState(0)
  const { data, isLoading, isError } = useGetUserByUserNameQuery({
    userName: searchValue || '',
    cursor: endCursorUsertId,
  })

  useEffect(() => {
    if (searchValue && data) {
      setSearchUsers(data.items)
    }
  }, [searchValue])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (inputValue !== null) {
        changeQueryHandler({ searchTerm: inputValue })
      }
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [inputValue])

  useEffect(() => {
    if (data && data.items) {
      setSearchUsers(prev => [...data.items, ...prev])
    }
  }, [data])

  useEffect(() => {
    if (searchUsers) {
      // setSearchUsers([])
      setEndCursorUserId(0)
    }
  }, [searchUsers])

  useEffect(() => {
    if (isLoading) {
      return
    }
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 70 && !isLoading) {
        const lastUsertId = searchUsers[searchUsers.length - 1].id

        setEndCursorUserId(lastUsertId)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading, searchUsers])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleOnSearchClear = () => {
    setInputValue('')
  }

  if (isError) {
    return <Typography variant="body2">Ошибка при получении данных пользователя</Typography>
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
            value={inputValue || ''}
          />
          <div className={s.parag}>
            <Typography variant={'body1'}>Повторить запросы</Typography>
          </div>
          <div>
            {isLoading && <Typography variant="body2">Загрузка...</Typography>}
            {searchUsers.map(user => (
              <SearchItem key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
