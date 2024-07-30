import { ChangeEvent, useRef, useState } from 'react'

import { convertImage } from '@/src/entities/profile/model/utils/image'

interface IProps {
  onChangePhoto: (value: ArrayBuffer | string) => void
}

export const useSelectPhoto = ({ onChangePhoto }: IProps) => {
  const [alert, setAlert] = useState<{ show: boolean; text: string }>({ show: false, text: '' })

  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const showAlertHandler = (text: string) => {
    setAlert({ ...alert, show: true, text })
  }

  const onClickFileInputHandler = () => {
    inputFileRef?.current?.click()
  }

  const changePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    convertImage(event, onChangePhoto, showAlertHandler)
  }

  return { alert, changePhotoHandler, inputFileRef, onClickFileInputHandler }
}
