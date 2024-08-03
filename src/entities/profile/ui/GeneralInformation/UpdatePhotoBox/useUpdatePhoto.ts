import { useState } from 'react'

export const useUpdatePhoto = () => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [photo, setPhoto] = useState<ArrayBuffer | string>('')
  const [newPhoto, setNewPhoto] = useState<ArrayBuffer | string>('')

  const setIsShowModalHandler = (value: boolean) => {
    setIsShowModal(value)
  }

  const showModalHandler = () => {
    setNewPhoto('')
    setIsShowModal(true)
  }

  const changePhotoHandler = (photo: ArrayBuffer | string) => {
    setNewPhoto(photo)
  }

  const uploadImage = () => {
    setIsShowModalHandler(false)
    setPhoto(newPhoto)
  }

  const removePhotoHandler = () => {
    const confirmed = confirm('Do you really want to delete your profile photo?')

    confirmed && setPhoto('')
  }

  return {
    changePhotoHandler,
    isShowModal,
    newPhoto,
    photo,
    removePhotoHandler,
    setIsShowModalHandler,
    showModalHandler,
    uploadImage,
  }
}
