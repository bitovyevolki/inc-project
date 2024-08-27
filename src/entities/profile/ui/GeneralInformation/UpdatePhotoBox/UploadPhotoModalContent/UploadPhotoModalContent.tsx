import { useMoveImage } from '@/src/entities/profile/lib/hooks/useMoveImage'
import { ITempProfilePhoto } from '@/src/entities/profile/model/types/profile'
import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button } from '@bitovyevolki/ui-kit-int'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import s from './UploadPhotoModalContent.module.scss'

interface IProps {
  isLoading: boolean
  photo: ITempProfilePhoto
  upload: (file: FormData) => void
}

export const UploadPhotoModalContent = ({ isLoading, photo, upload }: IProps) => {
  const { constraintsRef, dragControls, endDragHandler, file, photoRef, startDragHandler } =
    useMoveImage(photo)

  const t = useTranslations('GeneralProfile')

  const uploadImageHandler = () => {
    file && upload(file)
  }

  const btnChildren = isLoading ? (
    <div className={s.loader}>
      <RoundLoader variant={'small'} />
    </div>
  ) : (
    t('save')
  )

  return (
    <div className={s.modalContent}>
      <motion.div className={s.photoBox} onPointerDown={startDragHandler} ref={constraintsRef}>
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragControls={dragControls}
          dragElastic={0}
          onDragEnd={endDragHandler}
          ref={photoRef}
          style={{ height: photo.height, width: photo.width }}
        >
          <Image
            alt={'photo'}
            className={s.mainPhoto}
            height={photo.height}
            onMouseDown={e => e.preventDefault()}
            src={photo.src}
            width={photo.width}
          />
        </motion.div>
      </motion.div>
      <div className={s.btnBox}>
        <Button disabled={isLoading} onClick={uploadImageHandler}>
          {btnChildren}
        </Button>
      </div>
    </div>
  )
}
