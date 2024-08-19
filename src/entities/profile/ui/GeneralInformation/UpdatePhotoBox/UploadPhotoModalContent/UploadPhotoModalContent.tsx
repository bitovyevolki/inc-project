import { RoundLoader } from '@/src/shared/ui/RoundLoader/RoundLoader'
import { Button } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import s from './UploadPhotoModalContent.module.scss'

interface IProps {
  isLoading: boolean
  photo: string
  upload: () => void
}

export const UploadPhotoModalContent = ({ isLoading, photo, upload }: IProps) => {
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
      <div className={s.photoBox}>
        <Image alt={'photo'} className={s.mainPhoto} fill src={photo as string} />
        <Image alt={'photo'} className={s.background} height={200} src={photo} width={200} />
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
