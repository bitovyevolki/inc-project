import { Button } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import s from './UploadPhotoModalContent.module.scss'

import { Loader } from '../../../Loader/Loader'

interface IProps {
  isLoading: boolean
  photo: string
  upload: () => void
}

export const UploadPhotoModalContent = ({ isLoading, photo, upload }: IProps) => {
  const t = useTranslations('GeneralProfile')

  return (
    <div className={s.modalContent}>
      <div className={s.photoBox}>
        <Image alt={'photo'} className={s.mainPhoto} fill src={photo as string} />
        <Image alt={'photo'} className={s.background} height={200} src={photo} width={200} />
        <div className={s.background}></div>
      </div>
      <div className={s.btnBox}>
        <Button disabled={isLoading} onClick={upload}>
          {isLoading ? (
            <div className={s.loader}>
              <Loader variant={'small'} />
            </div>
          ) : (
            t('save')
          )}
        </Button>
      </div>
    </div>
  )
}
