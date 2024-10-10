import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Input, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './SearchUsers.module.scss'

import { useGetUserByUserNameQuery } from '../api/search.services'
import { IUser } from '../model/user-model'
import { User } from './user/User'

export const SearchUsers = () => {
  const t = useTranslations('Search-page')
  const { changeQueryHandler, searchParams } = useParamsHook()
  const searchValue = searchParams.get('searchTerm')
  const [inputValue, setInputValue] = useState(searchValue || '')

  const [users, setUsers] = useState<IUser[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [usersPage, setUsersPage] = useState(1)

  const loadMoreRef = useRef<HTMLParagraphElement>(null)

  const { data, isError, isFetching, isLoading } = useGetUserByUserNameQuery({
    pageNumber: usersPage,
    search: searchValue || '',
  })

  useEffect(() => {
    if (data) {
      setTotalCount(data.totalCount)
      setUsers(prev => [...prev, ...data.items])
    }
  }, [data])

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers([])
      changeQueryHandler({ searchTerm: inputValue })
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries

      if (entry.isIntersecting && users.length > 0 && users.length < totalCount && !isLoading) {
        setUsersPage(prevPage => prevPage + 1)
      }
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [users.length, totalCount, isLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setUsersPage(1)
  }

  const handleOnSearchClear = () => {
    setInputValue('')
    setUsers([])
  }

  if (isError) {
    toast.error('Error while retrieving user data')
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <Typography variant={'h2'}>{t('Search')}</Typography>
      </div>
      <Input
        autoComplete={'off'}
        clear={handleOnSearchClear}
        onChange={handleChange}
        placeholder={t('Search')}
        type={'search'}
        value={inputValue}
      />
      <div className={s.usersList}>
        {users.map(user => (
          <User key={user.id} user={user} />
        ))}

        {isFetching && (
          <p className={s.loadMore} ref={loadMoreRef}>
            <RoundLoader variant={'small'} />
          </p>
        )}
      </div>
      {data && data.items.length === 0 && !isFetching && (
        <div className={s.notFoundUsers}>
          <Typography variant={'subTitle1'}>{t('Oops-1')}</Typography>
          <Typography variant={'subTitle2'}>{t('Oops-2')}</Typography>
        </div>
      )}
    </div>
  )
}
