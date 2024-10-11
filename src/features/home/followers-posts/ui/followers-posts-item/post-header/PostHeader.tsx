import { toast } from 'react-toastify'

import baseAvatar from '@/public/image/default-avatar.webp'
import {
  useFollowUserMutation,
  useUnFollowMutation,
} from '@/src/features/post/model/follow.service'
import {
  CopyIcon,
  DotIcon,
  EllipsisIcon,
  FollowIcon,
  UnfollowIcon,
} from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Typography } from '@bitovyevolki/ui-kit-int'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

import s from './PostHeader.module.scss'

interface IProps {
  avatar: string
  copyUrl: () => void
  isFollowing?: boolean
  name: string
  ownerId: number
  updatedAt: Date
}

export const PostHeader = ({ avatar, copyUrl, isFollowing, name, ownerId, updatedAt }: IProps) => {
  const [followUser, { isLoading: isFollowLoading }] = useFollowUserMutation()
  const [unfollowUser, { isLoading: isUnFollowLoading }] = useUnFollowMutation()

  const followHandler = async () => {
    try {
      await followUser({ selectedUserId: ownerId }).unwrap()
    } catch (error) {
      console.error('Ошибка подписки:', error)
    }
  }

  const unfollowHandler = async () => {
    try {
      await unfollowUser({ userId: ownerId }).unwrap()
    } catch (error) {
      toast.error('Ошибка отписки')
    }
  }

  const followPopoverItem = isFollowing ? (
    <div
      className={clsx(s.popoverItem, isUnFollowLoading && s.disabledPopoverItem)}
      onClick={unfollowHandler}
    >
      {isUnFollowLoading ? <RoundLoader variant={'small'} /> : <UnfollowIcon />}
      <span>Unfollow</span>
    </div>
  ) : (
    <div
      className={clsx(s.popoverItem, isFollowLoading && s.disabledPopoverItem)}
      onClick={followHandler}
    >
      {isFollowLoading ? <RoundLoader variant={'small'} /> : <FollowIcon />}
      <span>Follow</span>
    </div>
  )

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
      <Popover.Root>
        <Popover.Trigger asChild>
          <EllipsisIcon className={s.ellipsisIcon} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align={'end'} className={s.PopoverContent} side={'bottom'}>
            {followPopoverItem}
            <div className={s.popoverItem} onClick={copyUrl}>
              <CopyIcon />
              <span>Copy Link</span>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
