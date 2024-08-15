import { ToastContainer } from 'react-toastify'

import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Button } from '@bitovyevolki/ui-kit-int'

import s from './SelectPhotoModalContent.module.scss'

import { useSelectPhoto } from './useSelectPhoto'

interface IProps {
  onChangeFile: (file: FormData) => void
  onChangeTempPhoto: (value: string) => void
}

export const SelectPhotoModalContent = ({ onChangeFile, onChangeTempPhoto }: IProps) => {
  const { changePhotoHandler, inputFileRef, onClickFileInputHandler } = useSelectPhoto({
    onChangeFile,
    onChangeTempPhoto,
  })

  return (
    <div className={s.modalContent}>
      <ToastContainer
        autoClose={3000}
        containerId={'select-avatar'}
        hideProgressBar
        position={'top-center'}
        theme={'colored'}
      />
      <div className={s.square}>
        <AvatarIcon />
      </div>
      <Button fullWidth={false} onClick={onClickFileInputHandler}>
        Select from Computer
      </Button>
      <input
        // accept={'.jpg, .jpeg, .png'}
        className={s.fileInp}
        onChange={changePhotoHandler}
        ref={inputFileRef}
        type={'file'}
      />
    </div>
  )
}
