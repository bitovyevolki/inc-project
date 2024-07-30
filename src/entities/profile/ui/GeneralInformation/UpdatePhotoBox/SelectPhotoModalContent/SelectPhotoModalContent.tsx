import { Button } from '@bitovyevolki/ui-kit-int'

import s from './SelectPhotoModalContent.module.scss'

import { Alert } from '../../../Alert/Alert'
import { SquareSvg } from '../../../icons/Icons'
import { useSelectPhoto } from './useSelectPhoto'

interface IProps {
  onChangePhoto: (value: ArrayBuffer | string) => void
}

export const SelectPhotoModalContent = ({ onChangePhoto }: IProps) => {
  const { alert, changePhotoHandler, inputFileRef, onClickFileInputHandler } = useSelectPhoto({
    onChangePhoto,
  })

  return (
    <div className={s.modalContent}>
      <div className={s.alertBox}>
        {alert.show && <Alert text={alert.text} variant={'error'} />}
      </div>
      <div className={s.square}>
        <SquareSvg />
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
