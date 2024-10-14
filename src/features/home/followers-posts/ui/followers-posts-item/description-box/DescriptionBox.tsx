import { useState } from 'react'
import ReactShowMoreText from 'react-show-more-text'

import baseAvatar from '@/public/image/default-avatar.webp'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Link from 'next/link'

import s from './DescriptionBox.module.scss'

interface IProps {
  avatarOwner: string
  description: string
  ownerId: number
  userName: string
}

export const DescriptionBox = ({ avatarOwner, description, ownerId, userName }: IProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleOnCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={s.descriptionBox}>
      <Image alt={'avatarOwner'} height={36} src={avatarOwner || baseAvatar} width={36} />
      <Typography variant={'body1'}>
        <Link className={s.link} href={`${RouterPaths.MY_PROFILE}/${ownerId}`}>
          {userName}
        </Link>
      </Typography>

      {description.length > 300 ? (
        <ReactShowMoreText
          anchorClass={s.showMore}
          expanded={isCollapsed}
          less={'Hide'}
          lines={3}
          more={'Show more'}
          onClick={handleOnCollapse}
          width={400}
        >
          {description}
        </ReactShowMoreText>
      ) : (
        <>{description}</>
      )}
    </div>
  )
}
