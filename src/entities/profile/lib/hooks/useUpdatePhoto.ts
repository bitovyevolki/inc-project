import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  useCreateProfileAvatarMutation,
  useDeleteProfileAvatarMutation,
} from '../../api/profile.service'
import { ITempProfilePhoto } from '../../model/types/profile'

export const useUpdatePhoto = () => {
  const [createAvatar, { isLoading: isLoadingCreateAvatar }] = useCreateProfileAvatarMutation()
  const [deleteAvatar] = useDeleteProfileAvatarMutation()

  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowDeletePhotoModal, setIsShowDeletePhotoModal] = useState(false)
  const [file, setFile] = useState<FormData>()
  const [tempPhoto, setTempPhoto] = useState<ITempProfilePhoto>({ height: 0, src: '', width: 0 })

  const changeFileHandler = (file: FormData) => {
    setFile(file)
  }

  const setIsShowModalHandler = (value: boolean) => {
    setTempPhoto({ ...tempPhoto, src: '' })
    setIsShowModal(value)
  }

  const setIsShowDeletePhotoModalHandler = (value: boolean) => {
    setIsShowDeletePhotoModal(value)
  }

  const changeTempPhotoHandler = (photo: ITempProfilePhoto) => {
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
      setTempPhoto({ ...tempPhoto, src: '' })
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
