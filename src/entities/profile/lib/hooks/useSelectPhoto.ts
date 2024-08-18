import { ChangeEvent, useRef } from 'react'

import { formatImage } from '@/src/entities/profile/lib/utils/image'

interface IProps {
  onChangeFile: (file: FormData) => void
  onChangeTempPhoto: (value: string) => void
}

export const useSelectPhoto = ({ onChangeFile, onChangeTempPhoto }: IProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const onClickFileInputHandler = () => {
    inputFileRef?.current?.click()
  }

  const changePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    formatImage({ event, onChangeFile, onChangeTempPhoto })
  }

  return { changePhotoHandler, inputFileRef, onClickFileInputHandler }
}
