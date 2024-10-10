import baseAvatar from '@/public/image/default-avatar.webp'
import { DotIcon, EllipsisIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Typography } from '@bitovyevolki/ui-kit-int'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

import s from './PostHeader.module.scss'

interface IProps {
  avatar: string
  name: string
  ownerId: number
  updatedAt: Date
}

export const PostHeader = ({ avatar, name, ownerId, updatedAt }: IProps) => {
  return (
    <div className={s.postHeader}>
      <Image
        alt={'avatarOwner'}
        className={s.ownerAvatar}
        height={36}
        src={avatar || baseAvatar}
        width={36}
      />
      <Typography variant={'body1'}>
        <Link className={s.nameLink} href={`${RouterPaths.MY_PROFILE}/${ownerId}`}>
          {name}
        </Link>
      </Typography>
      <DotIcon />
      <Typography className={s.time} variant={'caption'}>
        {moment(updatedAt).fromNow()}
      </Typography>
      <EllipsisIcon className={s.ellipsisIcon} />
    </div>
  )
}
