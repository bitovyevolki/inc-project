import { ChangeEvent, useEffect, useRef, useState } from 'react'
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
  const isFirstRender = useRef(true)

  const [users, setUsers] = useState<IUser[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [usersPage, setUsersPage] = useState(1)

  const loadMoreRef = useRef<HTMLParagraphElement>(null)

  const { data, isError, isFetching, isLoading } = useGetUserByUserNameQuery({
    pageNumber: usersPage,
    search: searchValue || '',
  })

  useEffect(() => {
    setUsers([])
  }, [searchValue])

  useEffect(() => {
    if (data) {
      setTotalCount(data.totalCount)
      setUsers(prev => [...prev, ...data.items])
    }
  }, [data])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false

      return
    }

    const timer = setTimeout(() => {
      changeQueryHandler({ searchTerm: inputValue })
      setUsersPage(1)
      setUsers([])
    }, 500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  useEffect(() => {
    const targetElement = loadMoreRef.current

    const observer = new IntersectionObserver(entries => {
      const [entry] = entries

      if (entry.isIntersecting && users.length > 0 && users.length < totalCount && !isLoading) {
        setUsersPage(prevPage => prevPage + 1)
      }
    })

    if (targetElement) {
      observer.observe(targetElement)
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
    }
  }, [users.length, isLoading, totalCount])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
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
          <User key={`${user.id}${user.createdAt}`} user={user} />
        ))}

        <span ref={loadMoreRef}></span>
        {isFetching && (
          <p className={s.loadMore}>
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
