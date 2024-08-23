import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { RemovePhotoIcon } from '@/src/shared/assets/icons/remove-photo'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import s from './UpdatePhotoBox.module.scss'

import { useUpdatePhoto } from '../../../lib/hooks/useUpdatePhoto'
import { IProfileAvatar } from '../../../model/types/profile'
import { SelectPhotoModalContent } from './SelectPhotoModalContent/SelectPhotoModalContent'
import { UploadPhotoModalContent } from './UploadPhotoModalContent/UploadPhotoModalContent'

interface IProps {
  avatars: IProfileAvatar[]
}

export const UpdatePhotoBox = ({ avatars }: IProps) => {
  const {
    changeFileHandler,
    changeTempPhotoHandler,
    isLoadingCreateAvatar,
    isShowDeletePhotoModal,
    isShowModal,
    removePhotoHandler,
    setIsShowDeletePhotoModalHandler,
    setIsShowModalHandler,
    tempPhoto,
    uploadImage,
  } = useUpdatePhoto()

  const t = useTranslations('GeneralProfile')

  const modalContent = tempPhoto.src ? (
    <UploadPhotoModalContent
      isLoading={isLoadingCreateAvatar}
      photo={tempPhoto}
      upload={uploadImage}
    />
  ) : (
    <SelectPhotoModalContent
      onChangeFile={changeFileHandler}
      onChangeTempPhoto={changeTempPhotoHandler}
    />
  )

  const avatarContent =
    avatars?.length > 0 ? (
      <div className={s.photoWrapper}>
        <span className={s.removeIcon} onClick={() => setIsShowDeletePhotoModalHandler(true)}>
          <RemovePhotoIcon />
        </span>
        <div className={s.photo}>
          <Image
            alt={'avatar'}
            fill
            loading={'eager'}
            priority
            quality={100}
            src={avatars[0].url}
          />
        </div>
      </div>
    ) : (
      <div className={s.avatarRound}>
        <AvatarIcon />
      </div>
    )

  return (
    <div className={s.photoBox}>
      <ModalWindow
        onOpenChange={setIsShowDeletePhotoModalHandler}
        open={isShowDeletePhotoModal}
        title={t('delete-photo')}
      >
        <div className={s.card}>
          <Typography as={'p'} variant={'body1'}>
            {t('delete-photo-confirm')}
          </Typography>
          <div className={s.buttonsContainer}>
            <Button onClick={removePhotoHandler}>Yes</Button>
            <Button onClick={() => setIsShowDeletePhotoModalHandler(false)}>No</Button>
          </div>
        </div>
      </ModalWindow>
      <ModalWindow onOpenChange={setIsShowModalHandler} open={isShowModal} title={t('add-photo')}>
        {modalContent}
      </ModalWindow>
      {avatarContent}
      <Button
        onClick={() => setIsShowModalHandler(true)}
        style={{ textAlign: 'center' }}
        variant={'outlined'}
      >
        {avatars.length > 0 ? t('update-photo') : t('add-photo')}
      </Button>
    </div>
  )
}
