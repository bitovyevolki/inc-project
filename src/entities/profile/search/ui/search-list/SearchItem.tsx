import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Link from 'next/link'
import { IUser } from '../../model/user-model'
import s from './searchItem.module.scss'

interface SearchItemProps {
  user: IUser
}

export const SearchItem = ({ user }: SearchItemProps) => {
  const avatarUrl = user.avatars && user.avatars.length > 0 ? user.avatars[0].url : ''

  return (
    <div className={s.wrap}>
      <div>
        {avatarUrl ? (
          <Image alt={'avatar'} className={s.avatar} height={30} src={avatarUrl} width={30} />
        ) : (
          <div className={s.withoutAvatar}>{user.userName.slice(0, 2)}</div>
        )}
      </div>
      <div>
        <div className={s.nameField}>
          <Link href={`/profile/${user.id}`}>
            <Typography variant={'link1'}>
              {user.userName.slice(0, 18)}
              {user.userName.length > 18 ? '...' : ''}
            </Typography>
          </Link>
        </div>
        <div>
          <Typography variant={'subTitle2'}>{`${user.firstName} ${user.lastName}`}</Typography>
        </div>
      </div>
    </div>
  )
}
