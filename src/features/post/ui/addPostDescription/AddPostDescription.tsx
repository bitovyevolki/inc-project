import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { useCreatePostMutation } from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui/profileIntro/ProfileIntro'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow, TextArea } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Router from 'next/router'

import s from './addPostDescription.module.scss'

type Props = {
  imageURL: string | undefined
  uploadId: string | undefined
}
export const AddPostDescription = ({ imageURL, uploadId }: Props) => {
  const { data: meData, isLoading: LoadingMe } = useMeQuery()
  const { data: profileData, isLoading: LoadingProfile } = useGetProfileByIdQuery({
    profileId: meData?.userId,
  })
  const [createPost, { isLoading: LoadingPost, isSuccess }] = useCreatePostMutation()

  const [isModalOpen, setIsModalOpen] = useState(true)

  const isLoading = LoadingMe || LoadingProfile || LoadingPost

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const description = formData.get('postDescription') as string

    if (!uploadId) {
      return
    }
    createPost({ childrenMetadata: [{ uploadId }], description })
      .unwrap()
      .then(() => {
        Router.push(`${RouterPaths.MY_PROFILE}/${meData?.userId}`)
      })
  }

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess) {
    toast.success('Successfully created post')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    void Router.back()
  }

  return (
    <div>
      <ModalWindow
        className={s.modal}
        onOpenChange={closeModal}
        open={isModalOpen}
        title={'Publication'}
      >
        <div className={s.container}>
          <div className={s.imageContainer}>
            <Image alt={'post image'} fill src={imageURL as string} />
          </div>
          <div className={s.publicationContainer}>
            <ProfileIntro
              avatarSize={'small'}
              avatars={profileData?.avatars}
              postOwner={meData?.userId === profileData?.id}
              userName={profileData?.userName}
              withMenu={false}
            />
            <div className={s.postContainer}>
              <form onSubmit={handleSubmit}>
                <TextArea
                  className={s.textArea}
                  label={'Add publication descriptions'}
                  name={'postDescription'}
                  placeholder={'Text-area'}
                />
                <Button className={s.button} type={'submit'}>
                  Publish post
                </Button>
              </form>
            </div>
          </div>
          <div className={s.locationContainer}></div>
        </div>
      </ModalWindow>
    </div>
  )
}
