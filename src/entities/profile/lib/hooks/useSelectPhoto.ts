import { ChangeEvent, useRef } from 'react'

import { formatImage } from '@/src/entities/profile/lib/utils/image'

import { ITempProfilePhoto } from '../../model/types/profile'

interface IProps {
  onChangeTempPhoto: (value: ITempProfilePhoto) => void
}

export const useSelectPhoto = ({ onChangeTempPhoto }: IProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const onClickFileInputHandler = () => {
    inputFileRef?.current?.click()
  }

  const changePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    formatImage({ event, onChangeTempPhoto })
  }

  return { changePhotoHandler, inputFileRef, onClickFileInputHandler }
}
