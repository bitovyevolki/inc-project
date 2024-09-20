import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { useCreatePostMutation } from '@/src/features/post/model/posts.service'
import { ProfileIntro } from '@/src/features/post/ui/profileIntro/ProfileIntro'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow, TextArea } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Router from 'next/router'

import s from './addPostDescription.module.scss'

import { FileWithIdAndUrl } from '../createPost'

type Props = {
  files: FileWithIdAndUrl[]
  uploadImagesId: any[]
}
export const AddPostDescription = ({ files, uploadImagesId }: Props) => {
  const { data: meData, isLoading: LoadingMe } = useMeQuery()
  const { data: profileData, isLoading: LoadingProfile } = useGetProfileByIdQuery({
    profileId: meData?.userId,
  })
  const [createPost, { isLoading: LoadingPost, isSuccess }] = useCreatePostMutation()

  const [isModalOpen, setIsModalOpen] = useState(true)

  const isLoading = LoadingMe || LoadingProfile || LoadingPost

  const profileIntroData = useMemo(
    () => ({
      avatarSize: 'small' as 'large' | 'small',
      avatars: profileData?.avatars,
      postOwner: meData?.userId === profileData?.id,
      userName: profileData?.userName,
      withMenu: false,
    }),
    [profileData, meData]
  )

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const description = formData.get('postDescription') as string

    if (!uploadImagesId) {
      return
    }

    try {
      await createPost({ childrenMetadata: uploadImagesId, description }).unwrap()
      toast.success('Successfully created post')
      Router.push(`${RouterPaths.MY_PROFILE}/${meData?.userId}`)
    } catch (error) {
      toast.error('Failed to create post')
    }
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    Router.back()
  }, [])

  const renderPhotos = () => {
    if (!files || files.length === 0) {
      return <div>NO Images</div>
    }

    return (
      <PhotoSlider>
        {files.map(item => (
          <div className={s.imageContainer} key={item.id}>
            <Image alt={'post image'} fill src={item.url} />
          </div>
        ))}
      </PhotoSlider>
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      {/* <ModalWindow
        className={s.modal}
        onOpenChange={closeModal}
        open={isModalOpen}
        title={'Publication'}
      > */}
      <div className={s.container}>
        <div className={s.sliderContainer}>{renderPhotos()}</div>
        <div className={s.publicationContainer}>
          <ProfileIntro
            avatarSize={profileIntroData.avatarSize}
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
      </div>
      {/* </ModalWindow> */}
    </div>
  )
}
