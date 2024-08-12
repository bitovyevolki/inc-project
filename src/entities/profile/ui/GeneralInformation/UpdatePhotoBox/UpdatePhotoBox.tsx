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
  avatars?: IProfileAvatar[]
}

export const UpdatePhotoBox = ({ avatars }: IProps) => {
  const {
    changePhotoHandler,
    isShowModal,
    newPhoto,
    photo,
    removePhotoHandler,
    setIsShowModalHandler,
    showModalHandler,
    uploadImage,
  } = useUpdatePhoto()

  return (
    <div className={s.photoBox}>
      <ModalWindow
        onOpenChange={setIsShowModalHandler}
        open={isShowModal}
        title={'Add a Profile Photo'}
      >
        {newPhoto ? (
          <UploadPhotoModalContent photo={newPhoto as string} upload={uploadImage} />
        ) : (
          <SelectPhotoModalContent onChangePhoto={changePhotoHandler} />
        )}
      </ModalWindow>

      {photo ? (
        <div className={s.photoWrapper}>
          <span className={s.removeIcon} onClick={removePhotoHandler}>
            <RemovePhotoIcon />
          </span>
          <div className={s.photo}>
            <Image alt={'photo'} fill src={photo as string} />
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
