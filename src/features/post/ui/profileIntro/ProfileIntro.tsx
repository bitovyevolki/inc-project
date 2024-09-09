import * as React from 'react'
import { useState } from 'react'

import { IProfile } from '@/src/entities/profile/model/types/profile'
import { DeleteIcon } from '@/src/shared/assets/icons/delete'
import { EditIcon } from '@/src/shared/assets/icons/edit'
import { EllipsisIcon } from '@/src/shared/assets/icons/ellipsis'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import Image from 'next/image'

import s from './profileIntro.module.scss'

import baseUserPhoto from './../../../../../public/image/default-post.png'

type Props = {
  avatarSize?: 'large' | 'small'
  avatars?: IProfile['avatars']
  cb?: () => void
  userName?: string
}

export const ProfileIntro = ({ avatarSize = 'small', avatars, cb, userName }: Props) => {
  const [isShowDeletePostModal, setIsShowDeletePostModal] = useState(false)
  const [avatarLarge, avatarSmall] = avatars ?? []

  const avatarSelected = avatarSize === 'small' ? avatarSmall : avatarLarge

  const setIsShowDeletePostModalHandler = (value: boolean) => {
    setIsShowDeletePostModal(value)
  }

  return (
    <div className={s.container}>
      <div className={clsx(s.userAvatar, avatarSize === 'small' ? s.sizeS : s.sizeL)}>
        <Image alt={'profile avatar'} fill src={avatarSelected?.url || baseUserPhoto} />
      </div>
      <div className={s.userName}>
        <Typography as={'h6'} variant={'body1'}>
          {userName}
        </Typography>
      </div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <EllipsisIcon className={s.ellipsisIcon} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align={'end'} className={s.PopoverContent} side={'bottom'}>
            <div className={s.popoverItem}>
              <EditIcon />
              <span>Edit Post</span>
            </div>
            <div className={s.popoverItem} onClick={() => setIsShowDeletePostModalHandler(true)}>
              <DeleteIcon />
              <span>Delete Post</span>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <ModalWindow
        className={s.deletePostModal}
        onOpenChange={setIsShowDeletePostModalHandler}
        open={isShowDeletePostModal}
        title={'Delete Post'}
      >
        <div className={s.card}>
          <Typography as={'p'} variant={'body1'}>
            Are you sure you want to delete this post
          </Typography>
          <div className={s.buttonsContainer}>
            <Button onClick={cb}>Yes</Button>
            <Button onClick={() => setIsShowDeletePostModalHandler(false)}>No</Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}
