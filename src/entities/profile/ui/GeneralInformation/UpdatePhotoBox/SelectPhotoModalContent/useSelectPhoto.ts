import { ChangeEvent, useRef, useState } from 'react'

import { convertImage } from '@/src/entities/profile/model/utils/image'

import { IAlert } from '../../../Alert/Alert'

interface IProps {
  onChangePhoto: (value: ArrayBuffer | string) => void
}

export const useSelectPhoto = ({ onChangePhoto }: IProps) => {
  const [alert, setAlert] = useState<IAlert>({ isShow: false, text: '', variant: 'error' })

  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const showAlertHandler = (text: string) => {
    setAlert({ ...alert, isShow: true, text })
  }

  const onClickFileInputHandler = () => {
    inputFileRef?.current?.click()
  }

  const changePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    convertImage(event, onChangePhoto, showAlertHandler)
  }

  return { alert, changePhotoHandler, inputFileRef, onClickFileInputHandler }
}
