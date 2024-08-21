import * as React from 'react'
import { useState } from 'react'

import { CreatePost } from '@/src/features/post/ui/createPost/CreatePost'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Button, ModalWindow } from '@bitovyevolki/ui-kit-int'

import s from './addPhoto.module.scss'

type Props = {}
export const AddPhoto = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)

  const onCreatePost = () => {
    setIsModalOpen(false)
    setShowCreatePost(true)
  }

  return (
    <div>
      <ModalWindow
        className={s.modalWindow}
        onOpenChange={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={'Add photo'}
      >
        <div className={s.uploadContainer}>
          <div className={s.imageContainer}>
            <AvatarIcon />
          </div>
          <div className={s.buttonsContainer}>
            <Button fullWidth variant={'primary'}>
              Select from Computer
            </Button>
            <Button fullWidth onClick={onCreatePost} variant={'outlined'}>
              Create Post
            </Button>
          </div>
        </div>
      </ModalWindow>
      {showCreatePost && <CreatePost />}
    </div>
  )
}
