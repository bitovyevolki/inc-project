import { ChangeEvent } from 'react'

interface FormatImageProps {
  event: ChangeEvent<HTMLInputElement>
  onChangeFile: (file: FormData) => void
  onChangeTempPhoto: (value: string) => void
  showAlert?: (text: string) => void
}

export const formatImage = ({
  event,
  onChangeFile,
  onChangeTempPhoto,
  showAlert,
}: FormatImageProps) => {
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

    onChangeTempPhoto(URL.createObjectURL(file))

    onChangeFile(getFormData(file))
  }
}

const getFormData = (file: Blob) => {
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
