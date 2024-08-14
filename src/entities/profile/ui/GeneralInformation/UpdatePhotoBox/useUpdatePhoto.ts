import { useState } from 'react'

import {
  useCreateProfileAvatarMutation,
  useDeleteProfileAvatarMutation,
} from '../../../api/profile.service'

export const useUpdatePhoto = () => {
  const [createAvatar, { isLoading: isLoadingCreateAvatar }] = useCreateProfileAvatarMutation()
  const [deleteAvatar] = useDeleteProfileAvatarMutation()

  const [isShowModal, setIsShowModal] = useState(false)
  const [file, setFile] = useState<FormData>()
  const [tempPhoto, setTempPhoto] = useState<string>('')

  const changeFileHandler = (file: FormData) => {
    setFile(file)
  }

  const setIsShowModalHandler = (value: boolean) => {
    setIsShowModal(value)
  }

  const showModalHandler = () => {
    setTempPhoto('')
    setIsShowModal(true)
  }

  const changeTempPhotoHandler = (photo: string) => {
    setTempPhoto(photo)
  }

  const uploadImage = async () => {
    try {
      await createAvatar({ file } as { file: FormData })

      setIsShowModalHandler(false)
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  const removePhotoHandler = async () => {
    try {
      const confirmed = confirm('Do you really want to delete your profile photo?')

      confirmed && (await deleteAvatar())
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  return {
    changeFileHandler,
    changeTempPhotoHandler,
    isLoadingCreateAvatar,
    isShowModal,
    removePhotoHandler,
    setIsShowModalHandler,
    showModalHandler,
    tempPhoto,
    uploadImage,
  }
}
