import baseUserPhoto from '@/public/image/default-post.png'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Link from 'next/link'

import s from './User.module.scss'

import { IUser } from '../../model/user-model'

interface SearchItemProps {
  user: IUser
}

export const User = ({ user }: SearchItemProps) => {
  const avatarUrl = user.avatars && user.avatars.length > 0 ? user.avatars[0].url : ''

  return (
    <div className={s.wrap}>
      <Image
        alt={'avatar'}
        className={s.avatar}
        height={48}
        src={avatarUrl || baseUserPhoto}
        width={48}
      />
      <div>
        <Link href={`/profile/${user.id}`}>
          <Typography className={s.nameField} variant={'link1'}>
            {user.userName.slice(0, 18)}
            {user.userName.length > 18 ? '...' : ''}
          </Typography>
        </Link>
        <div className={s.firstAndLastName}>
          <Typography variant={'subTitle2'}>
            {user.firstName || user.lastName ? (
              <>
                {user.firstName && `${user.firstName} `}
                {user.lastName && user.lastName}
              </>
            ) : (
              'User have not first or last name'
            )}
          </Typography>
        </div>
      </div>
    </div>
  )
}
