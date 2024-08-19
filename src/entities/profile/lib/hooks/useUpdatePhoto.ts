import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  useCreateProfileAvatarMutation,
  useDeleteProfileAvatarMutation,
} from '../../api/profile.service'

export const useUpdatePhoto = () => {
  const [createAvatar, { isLoading: isLoadingCreateAvatar }] = useCreateProfileAvatarMutation()
  const [deleteAvatar] = useDeleteProfileAvatarMutation()

  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowDeletePhotoModal, setIsShowDeletePhotoModal] = useState(false)
  const [file, setFile] = useState<FormData>()
  const [tempPhoto, setTempPhoto] = useState<string>('')

  const changeFileHandler = (file: FormData) => {
    setFile(file)
  }

  const setIsShowModalHandler = (value: boolean) => {
    setIsShowModal(value)
  }

  const setIsShowDeletePhotoModalHandler = (value: boolean) => {
    setIsShowDeletePhotoModal(value)
  }

  const changeTempPhotoHandler = (photo: string) => {
    setTempPhoto(photo)
  }

  const uploadImage = async () => {
    try {
      await createAvatar({ file } as { file: FormData }).unwrap()

      toast.success('Your avatar has been updated')
    } catch (error) {
      toast.error('Error! Server is not available!')
    } finally {
      setIsShowModalHandler(false)
      setTempPhoto('')
    }
  }

  const removePhotoHandler = async () => {
    try {
      setIsShowDeletePhotoModalHandler(false)

      await deleteAvatar().unwrap()
    } catch (error) {
      toast.error('Error! Server is not available!')
    }
  }

  return {
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
  }
}
