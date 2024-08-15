import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './Sidebar.module.scss'

import { sidebarLinks } from './links'

export const Sidebar = () => {
  //
  const [logOutQuery, { isError, isLoading, isSuccess }] = useLazyLogOutQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const logout = () => {
    logOutQuery()
      .unwrap()
      .then(result => {})
      .catch(result => {
        console.log(result)
      })
  }

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess) {
    closeModal()

    return <SignInForm />
  }

  return (
    <>
      {isModalOpen && (
        <ModalWindow onOpenChange={closeModal} open={isModalOpen} title={'Confirm log out'}>
          <div className={s.card}>
            <Typography as={'p'} variant={'body1'}>
              Do you really want to log out of your account?
            </Typography>
            <div className={s.buttonsContainer}>
              <Button onClick={logout}>Yes</Button>
              <Button onClick={closeModal}>No</Button>
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
        <Button className={s.buttonLogout} onClick={openModal} variant={'ghost'}>
          <LogoutIcon />
          <Typography as={'p'} variant={'h4'}>
            Log Out
          </Typography>
        </Button>
      </nav>
    </>
  )
}
