import { useState } from 'react'

import { IProfile } from '@/src/entities/profile/userProfile/model/types/profile'
import { DeleteIcon } from '@/src/shared/assets/icons/delete'
import { EditIcon } from '@/src/shared/assets/icons/edit'
import { EllipsisIcon } from '@/src/shared/assets/icons/ellipsis'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import * as Popover from '@radix-ui/react-popover'
import Image from 'next/image'

import s from './profileIntro.module.scss'

import baseUserPhoto from './../../../../../public/image/default-post.png'

type Props = {
  avatarSize?: 'large' | 'small'
  avatars?: IProfile['avatars'] | string
  deletePost?: () => void
  postOwner: boolean
  updatePostHandler?: () => void
  userName?: string
  withMenu?: boolean
}

export const ProfileIntro = ({
  avatarSize = 'small',
  avatars,
  deletePost,
  postOwner,
  updatePostHandler,
  userName,
  withMenu,
}: Props) => {
  const [isShowDeletePostModal, setIsShowDeletePostModal] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  let avatarUrl: string | undefined

  if (typeof avatars === 'string') {
    avatarUrl = avatars
  } else if (avatarSize === 'small') {
    avatarUrl = avatars?.[1]?.url
  } else {
    avatarUrl = avatars?.[0]?.url
  }

  const setIsShowDeletePostModalHandler = (value: boolean) => {
    setIsShowDeletePostModal(value)
  }
  const handleEditClick = () => {
    setIsPopoverOpen(false)
    if (updatePostHandler) {
      updatePostHandler()
    }
  }

  return (
    <div className={s.container}>
      <Image
        alt={'profile avatar'}
        className={s.userAvatar}
        height={36}
        src={avatarUrl || baseUserPhoto}
        width={36}
      />
      <div className={s.userName}>
        <Typography variant={'h4'}>{userName}</Typography>
      </div>
      {postOwner && withMenu && (
        <Popover.Root onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
          <Popover.Trigger asChild>
            <EllipsisIcon className={s.ellipsisIcon} fill={'#397DF6'} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content align={'end'} className={s.PopoverContent} side={'bottom'}>
              <div className={s.popoverItem} onClick={handleEditClick}>
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
      )}

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
            <Button onClick={deletePost}>Yes</Button>
            <Button onClick={() => setIsShowDeletePostModalHandler(false)}>No</Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}
