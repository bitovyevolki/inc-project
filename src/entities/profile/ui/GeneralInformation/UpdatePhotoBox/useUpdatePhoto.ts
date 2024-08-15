import { useState } from 'react'
import { toast } from 'react-toastify'

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
      const confirmed = confirm('Do you really want to delete your profile photo?')

      confirmed && (await deleteAvatar().unwrap())
    } catch (error) {
      toast.error('Error! Server is not available!')
    }
  }

  return {
    changeFileHandler,
    changeTempPhotoHandler,
    isLoadingCreateAvatar,
    isShowModal,
    removePhotoHandler,
    setIsShowModalHandler,
    tempPhoto,
    uploadImage,
  }
}
