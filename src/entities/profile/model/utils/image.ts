import { ChangeEvent } from 'react'

export const convertImage = (
  event: ChangeEvent<HTMLInputElement>,
  setState: (value: ArrayBuffer | string) => void,
  showAlert?: (text: string) => void
) => {
  if (event.target.files) {
    const file = event?.target?.files[0]

    if (checkFileSize(file.size)) {
      showAlert && showAlert('Photo size must be less 10 MB!')

      return
    }

    if (!checkFileFormat(file.type)) {
      showAlert && showAlert('The format of the uploaded photo must be PNG and JPEG')

      return
    }

    setState(URL.createObjectURL(file))
  }
}

const checkFileSize = (fileSize: number): boolean => {
  return fileSize > 10000000
}

const checkFileFormat = (format: string) => {
  const allowedFormats = ['jpeg', 'jpg', 'png']

  const type = format.split('/')[1]

  return allowedFormats.includes(type)
}
