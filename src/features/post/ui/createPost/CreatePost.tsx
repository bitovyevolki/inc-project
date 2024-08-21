import * as React from 'react'
import { useState } from 'react'

import { Card, ModalWindow, TextArea } from '@bitovyevolki/ui-kit-int'

import s from './createPost.module.scss'

type Props = {}
export const CreatePost = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <div>
      <ModalWindow
        onOpenChange={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={'Publication'}
      >
        <div className={s.imageContainer}></div>
        <div className={s.publicationContainer}>
          <UserCredentials />
          <div className={s.postContainer}>
            <TextArea label={'Add publication descriptions'} placeholder={'Text-area'} />
          </div>
          <div className={s.locationContainer}></div>
        </div>
      </ModalWindow>
    </div>
  )
}

const UserCredentials = () => {
  return (
    <div>
      <div className={s.userAvatar}></div>
      <div>User name</div>
    </div>
  )
}
