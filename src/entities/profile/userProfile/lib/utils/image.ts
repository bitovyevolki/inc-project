import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { ITempProfilePhoto } from '../../model/types/profile'

interface FormatImageProps {
  event: ChangeEvent<HTMLInputElement>
  onChangeTempPhoto: (value: ITempProfilePhoto) => void
}

export const formatImage = ({ event, onChangeTempPhoto }: FormatImageProps) => {
  if (event.target.files) {
    const file = event?.target?.files[0]

    if (checkFileSize(file.size)) {
      toast.error('Photo size must be less 10 MB!', {
        containerId: 'select-avatar',
      })

      return
    }

    if (!checkFileFormat(file.type)) {
      toast.error('The format of the uploaded photo must be PNG and JPEG', {
        containerId: 'select-avatar',
      })

      return
    }

    setImageParams(file, onChangeTempPhoto)
  }
}

const setImageParams = (file: Blob, onChangeTempPhoto: (photo: ITempProfilePhoto) => void) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onload = function (e: ProgressEvent<FileReader>) {
    const image = new Image()

    image.src = e.target?.result as string

    image.onload = function () {
      // @ts-ignore
      const height = this.height
      // @ts-ignore
      const width = this.width

      onChangeTempPhoto({ height, src: image.src, width })
    }
  }
}

export const getFormData = (file: Blob) => {
  const formData = new FormData()

  formData.append('file', file)

  return formData
}

const checkFileSize = (fileSize: number): boolean => {
  return fileSize > 10000000
}

const checkFileFormat = (format: string) => {
  const allowedFormats = ['jpeg', 'jpg', 'png']

  const type = format.split('/')[1]

  return allowedFormats.includes(type)
}
