import { ChangeEvent, useRef } from 'react'

import { Button } from '@bitovyevolki/ui-kit-int'

import s from './SelectPhotoModalContent.module.scss'

interface IProps {
  onChangePhoto: (value: ArrayBuffer | string) => void
}

export const SelectPhotoModalContent = ({ onChangePhoto }: IProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const onClickFileInputHandler = () => {
    inputFileRef?.current?.click()
  }

  const changePhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event?.target?.files[0]

      const fileReader = new FileReader()

      fileReader.onload = function (event) {
        if (event?.target?.result) {
          onChangePhoto(event?.target?.result)
        }
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <div className={s.modalContent}>
      <div className={s.square}>
        <svg
          fill={'none'}
          height={'48'}
          viewBox={'0 0 48 48'}
          width={'48'}
          xmlns={'http://www.w3.org/2000/svg'}
        >
          <g clipPath={'url(#clip0_348_9087)'}>
            <path
              d={
                'M36 6H12C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12V36C6 37.5913 6.63214 39.1174 7.75736 40.2426C8.88258 41.3679 10.4087 42 12 42H36C37.5913 42 39.1174 41.3679 40.2426 40.2426C41.3679 39.1174 42 37.5913 42 36V12C42 10.4087 41.3679 8.88258 40.2426 7.75736C39.1174 6.63214 37.5913 6 36 6ZM12 10H36C36.5304 10 37.0391 10.2107 37.4142 10.5858C37.7893 10.9609 38 11.4696 38 12V28.72L31.6 23.26C30.6084 22.4441 29.3641 21.998 28.08 21.998C26.7959 21.998 25.5516 22.4441 24.56 23.26L10 35.4V12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10ZM36 38H13.12L27.12 26.32C27.3889 26.1203 27.715 26.0125 28.05 26.0125C28.385 26.0125 28.7111 26.1203 28.98 26.32L38 34V36C38 36.5304 37.7893 37.0391 37.4142 37.4142C37.0391 37.7893 36.5304 38 36 38Z'
              }
              fill={'white'}
            />
            <path
              d={
                'M16 20C17.6569 20 19 18.6569 19 17C19 15.3431 17.6569 14 16 14C14.3431 14 13 15.3431 13 17C13 18.6569 14.3431 20 16 20Z'
              }
              fill={'white'}
            />
          </g>
          <defs>
            <clipPath id={'clip0_348_9087'}>
              <rect fill={'white'} height={'48'} width={'48'} />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Button fullWidth={false} onClick={onClickFileInputHandler}>
        Select from Computer
      </Button>
      <input
        accept={'.jpg, .jpeg, .png'}
        className={s.fileInp}
        onChange={changePhotoHandler}
        ref={inputFileRef}
        type={'file'}
      />
    </div>
  )
}
