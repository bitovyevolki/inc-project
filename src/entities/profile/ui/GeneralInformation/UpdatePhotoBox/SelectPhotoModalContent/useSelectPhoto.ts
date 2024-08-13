import { ChangeEvent, useRef, useState } from 'react'

import { formatImage } from '@/src/entities/profile/model/utils/image'

import { IAlert } from '../../../Alert/Alert'

interface IProps {
  onChangeFile: (file: FormData) => void
  onChangeTempPhoto: (value: string) => void
}

export const useSelectPhoto = ({ onChangeFile, onChangeTempPhoto }: IProps) => {
  const [alert, setAlert] = useState<IAlert>({ isShow: false, text: '', variant: 'error' })

  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const showAlertHandler = (text: string) => {
    setAlert({ ...alert, isShow: true, text })
  }

  const onClickFileInputHandler = () => {
    inputFileRef?.current?.click()
  }

  const changePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    formatImage({ event, onChangeFile, onChangeTempPhoto, showAlert: showAlertHandler })
  }

  return { alert, changePhotoHandler, inputFileRef, onClickFileInputHandler }
}
