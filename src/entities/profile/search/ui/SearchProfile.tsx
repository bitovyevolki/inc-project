import { useEffect, useState } from 'react'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { Sidebar } from '@/src/shared/ui/Sidebar/Sidebar'
import { Input, Typography } from '@bitovyevolki/ui-kit-int'
import s from './search.module.scss'
import { useGetUserByUserNameQuery } from '../api/search.services'
import { IUser } from '../model/user-model'
import { SearchItem } from './search-list/SearchItem'

export const SearchProfile = () => {
  const { changeQueryHandler, searchParams } = useParamsHook()
  const searchValue = searchParams.get('searchTerm')
  const [inputValue, setInputValue] = useState(searchValue || '') // Убедитесь, что есть начальное значение
  const [searchUsers, setSearchUsers] = useState<IUser[]>([])
  const [endCursorUserId, setEndCursorUserId] = useState(0)
  const { data, isError, isLoading } = useGetUserByUserNameQuery({
    cursor: endCursorUserId,
    userName: searchValue || '',
  })

  // Обновляем список пользователей, когда приходят новые данные
  useEffect(() => {
    if (data?.items) {
      setSearchUsers(data.items) // Обновляем список пользователей
    }
  }, [data])

  // Убираем предыдущие результаты, когда inputValue меняется
  useEffect(() => {
    if (inputValue) {
      setSearchUsers([]) // Очищаем предыдущие результаты при новом запросе
      setEndCursorUserId(0) // Сброс курсора
      changeQueryHandler({ searchTerm: inputValue }) // Обновляем URL с новым поисковым запросом
    }
  }, [inputValue])

  // Обновляем inputValue на основе параметров
  useEffect(() => {
    setInputValue(searchValue || '') // Обновляем inputValue при изменении searchValue
  }, [searchValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // Обновляем состояние inputValue
  }

  const handleOnSearchClear = () => {
    setInputValue('')
    setSearchUsers([]) // Очищаем пользователей при очистке поля поиска
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
          <div className={s.parag}>
            <Typography variant={'body1'}>Повторить запросы</Typography>
          </div>
          <div>
            {isLoading && <Typography variant={'body2'}>Загрузка...</Typography>}
            {searchUsers.map(user => (
              <SearchItem key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
