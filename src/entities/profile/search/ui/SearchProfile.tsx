import { Sidebar } from '@/src/shared/ui/Sidebar/Sidebar'
import { Input, Typography } from '@bitovyevolki/ui-kit-int'
import { useState } from 'react'
import { useGetUserByUserNameQuery } from '../api/search.services'
import { IUser } from '../model/user-model'
import { SearchItem } from './search-list/SearchItem'
import s from './search.module.scss'

export const SearchProfile = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data, isLoading, isError } = useGetUserByUserNameQuery({ userName: searchValue })

  console.log(data?.items)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleOnSearchClear = () => {
    setSearchValue('')
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
            value={searchValue}
          />
          <div className={s.parag}>
            <Typography variant={'body1'}>Повторить запросы</Typography>
          </div>
          <div>
            {isLoading && <Typography variant="body2">Загрузка...</Typography>}
            {data?.items.map(items => <SearchItem key={items.id} user={items.userName} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
