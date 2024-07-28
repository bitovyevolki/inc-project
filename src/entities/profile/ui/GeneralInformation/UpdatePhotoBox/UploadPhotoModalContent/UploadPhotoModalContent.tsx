import { Button } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './UploadPhotoModalContent.module.scss'

interface IProps {
  photo: ArrayBuffer | string
  upload: () => void
}

export const UploadPhotoModalContent = ({ photo, upload }: IProps) => {
  return (
    <div className={s.modalContent}>
      <div className={s.photoBox}>
        <Image alt={'photo'} className={s.mainPhoto} fill src={photo as string} />
        <Image
          alt={'photo'}
          className={s.background}
          height={200}
          src={photo as string}
          width={200}
        />
        <div className={s.background}></div>
      </div>
      <div className={s.btnBox}>
        <Button onClick={upload}>Save</Button>
      </div>
    </div>
  )
}
