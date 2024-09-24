import { useMemo } from 'react'

import { useGetProfileByIdQuery } from '@/src/entities/profile/api/profile.service'
import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { ProfileIntro } from '@/src/features/post/ui/profileIntro/ProfileIntro'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { TextArea } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import s from './addPostDescription.module.scss'

import { FileWithIdAndUrl } from '../createPost'

type Props = {
  files: FileWithIdAndUrl[]
  postDescription: string
  setPostDescription: (value: string) => void
}
export const AddPostDescription = ({ files, postDescription, setPostDescription }: Props) => {
  const t = useTranslations('CreatePost.add-description')
  const { data: meData, isLoading: LoadingMe } = useMeQuery()
  const { data: profileData, isLoading: LoadingProfile } = useGetProfileByIdQuery({
    profileId: meData?.userId,
  })

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

  if (LoadingProfile) {
    return <Loader />
  }

  return (
    <div>
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
            <TextArea
              className={s.textArea}
              label={t('text-area-label')}
              name={'postDescription'}
              onChange={e => setPostDescription(e.currentTarget.value)}
              placeholder={''}
              value={postDescription}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
