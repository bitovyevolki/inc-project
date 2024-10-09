import { ToastContainer } from 'react-toastify'

import { ITempProfilePhoto } from '@/src/entities/profile/userProfile/model/types/profile'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Button } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './SelectPhotoModalContent.module.scss'

import { useSelectPhoto } from '../../../../lib/hooks/useSelectPhoto'

interface IProps {
  onChangeTempPhoto: (value: ITempProfilePhoto) => void
}

export const SelectPhotoModalContent = ({ onChangeTempPhoto }: IProps) => {
  const { changePhotoHandler, inputFileRef, onClickFileInputHandler } = useSelectPhoto({
    onChangeTempPhoto,
  })

  const t = useTranslations('GeneralProfile')

  return (
    <div className={s.modalContent}>
      <ToastContainer
        autoClose={3000}
        containerId={'select-avatar'}
        hideProgressBar
        position={'top-center'}
        theme={'colored'}
      />
      <div className={s.square}>
        <AvatarIcon />
      </div>
      <Button fullWidth={false} onClick={onClickFileInputHandler}>
        {t('select-photo')}
      </Button>
      <input
        // accept={'.jpg, .jpeg, .png'}
        className={s.fileInp}
        onChange={changePhotoHandler}
        ref={inputFileRef}
        type={'file'}
      />
    </div>
  )
}
