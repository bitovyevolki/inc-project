import { useState } from 'react'
import { toast } from 'react-toastify'

import { useLazyLogOutQuery } from '@/src/features/auth/service/auth.service'
import { ErrorResponse } from '@/src/features/auth/service/auth.types'
import { SignInForm } from '@/src/features/auth/signIn'
import { LogoutIcon } from '@/src/shared/ui/Sidebar/Icons'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './Sidebar.module.scss'

import { sidebarLinks } from './links'

export const Sidebar = () => {
  //
  const [logOutQuery, { error, isError, isLoading, isSuccess }] = useLazyLogOutQuery()
  const serverError = (error as ErrorResponse)?.data.messages[0]?.message
  const [isModalOpen, setIsModalOpen] = useState(false)

  const logout = () => {
    logOutQuery()
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    toast.error(serverError)
  }

  if (isSuccess) {
    return <SignInForm />
  }

  return (
    <>
      {isModalOpen && (
        <ModalWindow
          onOpenChange={() => setIsModalOpen(false)}
          open={isModalOpen}
          title={'Confirm log out'}
        >
          <div className={s.card}>
            <Typography as={'p'} variant={'body1'}>
              Do you really want to log out of your account?
            </Typography>
            <div className={s.buttonsContainer}>
              <Button onClick={logout}>Yes</Button>
              <Button onClick={() => setIsModalOpen(false)}>No</Button>
            </div>
          </div>
        </ModalWindow>
      )}
      <nav className={s.sidebar}>
        {sidebarLinks.map(l => (
          <Link className={s.link} href={l.path} key={l.path}>
            <l.svg />
            <Typography variant={'h4'}>{l.title}</Typography>
          </Link>
        ))}
        <Button className={s.buttonLogout} onClick={() => setIsModalOpen(true)} variant={'ghost'}>
          <LogoutIcon />
          <Typography as={'p'} variant={'h4'}>
            Log Out
          </Typography>
        </Button>
      </nav>
    </>
  )
}
