import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { RemovePhotoIcon } from '@/src/shared/assets/icons/remove-photo'
import { Button, ModalWindow } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './UpdatePhotoBox.module.scss'

import { IProfileAvatar } from '../../../model/types/profile'
import { SelectPhotoModalContent } from './SelectPhotoModalContent/SelectPhotoModalContent'
import { UploadPhotoModalContent } from './UploadPhotoModalContent/UploadPhotoModalContent'
import { useUpdatePhoto } from './useUpdatePhoto'

interface IProps {
  avatars: IProfileAvatar[]
}

export const UpdatePhotoBox = ({ avatars }: IProps) => {
  const {
    changeFileHandler,
    changeTempPhotoHandler,
    isLoadingCreateAvatar,
    isShowModal,
    removePhotoHandler,
    setIsShowModalHandler,
    showModalHandler,
    tempPhoto,
    uploadImage,
  } = useUpdatePhoto()

  return (
    <div className={s.photoBox}>
      <ModalWindow
        onOpenChange={setIsShowModalHandler}
        open={isShowModal}
        title={'Add a Profile Photo'}
      >
        {tempPhoto ? (
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
        )}
      </ModalWindow>
      {avatars?.length > 0 ? (
        <div className={s.photoWrapper}>
          <span className={s.removeIcon} onClick={removePhotoHandler}>
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
      )}
      <Button onClick={showModalHandler} variant={'outlined'}>
        Add a Profile Photo
      </Button>
    </div>
  )
}
