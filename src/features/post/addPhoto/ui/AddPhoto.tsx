import * as React from 'react'
import { useState } from 'react'

import { CreatePost } from '@/src/features/post/createPost'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Button, ModalWindow } from '@bitovyevolki/ui-kit-int'

import s from './addPhoto.module.scss'

type Props = {}
export const AddPhoto = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const onCreatePost = () => {
    return <CreatePost />
  }

  return (
    <div>
      <ModalWindow
        onOpenChange={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={'Add photo'}
      >
        <div className={s.uploadContainer}>
          <div className={s.imageContainer}>
            <AvatarIcon />
          </div>
          <div className={s.buttonsContainer}>
            <Button fullwidth variant={'primary'}>
              Select from Computer
            </Button>
            <Button fullwidth onClick={onCreatePost} variant={'outlined'}>
              Create Post
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}
