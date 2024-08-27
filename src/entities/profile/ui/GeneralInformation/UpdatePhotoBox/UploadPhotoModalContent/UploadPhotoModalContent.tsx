import { useMoveImage } from '@/src/entities/profile/lib/hooks/useMoveImage'
import { ITempProfilePhoto } from '@/src/entities/profile/model/types/profile'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import s from './UploadPhotoModalContent.module.scss'

interface IProps {
  isLoading: boolean
  photo: ITempProfilePhoto
  upload: () => void
}

export const UploadPhotoModalContent = ({ isLoading, photo, upload }: IProps) => {
  const {
    mouseDownHandler,
    mouseLeaveHandler,
    mouseMoveHandler,
    mouseUpHandler,
    parentRef,
    position,
  } = useMoveImage({
    ...photo,
    height: photo.height,
    width: photo.width,
  })

  const t = useTranslations('GeneralProfile')

  const btnChildren = isLoading ? (
    <div className={s.loader}>
      <RoundLoader variant={'small'} />
    </div>
  ) : (
    t('save')
  )

  return (
    <div className={s.modalContent}>
      <div className={s.photoBox} ref={parentRef}>
        <Image
          alt={'photo'}
          className={s.mainPhoto}
          height={Math.floor(photo.height)}
          onMouseDown={mouseDownHandler}
          onMouseLeave={mouseLeaveHandler}
          onMouseMove={mouseMoveHandler}
          onMouseUp={mouseUpHandler}
          src={photo.src}
          style={{ left: position.left, top: position.top }}
          width={Math.floor(photo.width)}
        />
        <div className={s.background}></div>
      </div>
      <div className={s.btnBox}>
        <Button disabled={isLoading} onClick={upload}>
          {btnChildren}
        </Button>
      </div>
    </div>
  )
}
