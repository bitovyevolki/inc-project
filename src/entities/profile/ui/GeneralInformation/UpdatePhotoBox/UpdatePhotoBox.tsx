import { useState } from 'react'

import { Button, ModalWindow } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './UpdatePhotoBox.module.scss'

import { SelectPhotoModalContent } from './SelectPhotoModalContent/SelectPhotoModalContent'
import { UploadPhotoModalContent } from './UploadPhotoModalContent/UploadPhotoModalContent'

export const UpdatePhotoBox = () => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [photo, setPhoto] = useState<ArrayBuffer | string>('')
  const [newPhoto, setNewPhoto] = useState<ArrayBuffer | string>('')

  const setIsShowModalHandler = (value: boolean) => {
    setIsShowModal(value)
  }

  const showModalHandler = () => {
    setNewPhoto('')
    setIsShowModal(true)
  }

  const changePhotoHandler = (photo: ArrayBuffer | string) => {
    setNewPhoto(photo)
  }

  const uploadImage = () => {
    setIsShowModalHandler(false)
    setPhoto(newPhoto)
  }

  const removePhotoHandler = () => {
    setPhoto('')
  }

  return (
    <div className={s.photoBox}>
      <ModalWindow
        onOpenChange={setIsShowModalHandler}
        open={isShowModal}
        title={'Add a Profile Photo'}
      >
        {newPhoto ? (
          <UploadPhotoModalContent photo={newPhoto as string} upload={uploadImage} />
        ) : (
          <SelectPhotoModalContent onChangePhoto={changePhotoHandler} />
        )}
      </ModalWindow>

      {photo ? (
        <div className={s.photoWrapper}>
          <span className={s.removeIcon} onClick={removePhotoHandler}>
            <RemovePhotoSvg />
          </span>
          <div className={s.photo}>
            <Image alt={'photo'} fill src={photo as string} />
          </div>
        </div>
      ) : (
        <div className={s.avatarRound}>
          <svg
            fill={'none'}
            height={'48'}
            viewBox={'0 0 48 48'}
            width={'48'}
            xmlns={'http://www.w3.org/2000/svg'}
          >
            <g clipPath={'url(#clip0_306_5083)'}>
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
              <clipPath id={'clip0_306_5083'}>
                <rect fill={'white'} height={'48'} width={'48'} />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}

      <Button onClick={showModalHandler} variant={'outlined'}>
        Add a Profile Photo
      </Button>
    </div>
  )
}

const RemovePhotoSvg = () => {
  return (
    <svg
      fill={'none'}
      height={'24'}
      viewBox={'0 0 24 24'}
      width={'24'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <circle cx={'12'} cy={'12'} fill={'#CC1439'} r={'10'} stroke={'#0D0D0D'} strokeWidth={'4'} />
      <g clipPath={'url(#clip0_23092_10749)'}>
        <path
          d={
            'M12.94 11.9998L15.8066 9.1398C15.9322 9.01426 16.0027 8.844 16.0027 8.66646C16.0027 8.48893 15.9322 8.31867 15.8066 8.19313C15.6811 8.0676 15.5108 7.99707 15.3333 7.99707C15.1558 7.99707 14.9855 8.0676 14.86 8.19313L12 11.0598L9.13996 8.19313C9.01442 8.0676 8.84416 7.99707 8.66663 7.99707C8.48909 7.99707 8.31883 8.0676 8.19329 8.19313C8.06776 8.31867 7.99723 8.48893 7.99723 8.66646C7.99723 8.844 8.06776 9.01426 8.19329 9.1398L11.06 11.9998L8.19329 14.8598C8.13081 14.9218 8.08121 14.9955 8.04737 15.0767C8.01352 15.158 7.99609 15.2451 7.99609 15.3331C7.99609 15.4211 8.01352 15.5083 8.04737 15.5895C8.08121 15.6708 8.13081 15.7445 8.19329 15.8065C8.25527 15.8689 8.329 15.9185 8.41024 15.9524C8.49148 15.9862 8.57862 16.0037 8.66663 16.0037C8.75463 16.0037 8.84177 15.9862 8.92301 15.9524C9.00425 15.9185 9.07798 15.8689 9.13996 15.8065L12 12.9398L14.86 15.8065C14.9219 15.8689 14.9957 15.9185 15.0769 15.9524C15.1581 15.9862 15.2453 16.0037 15.3333 16.0037C15.4213 16.0037 15.5084 15.9862 15.5897 15.9524C15.6709 15.9185 15.7446 15.8689 15.8066 15.8065C15.8691 15.7445 15.9187 15.6708 15.9526 15.5895C15.9864 15.5083 16.0038 15.4211 16.0038 15.3331C16.0038 15.2451 15.9864 15.158 15.9526 15.0767C15.9187 14.9955 15.8691 14.9218 15.8066 14.8598L12.94 11.9998Z'
          }
          fill={'white'}
        />
      </g>
      <defs>
        <clipPath id={'clip0_23092_10749'}>
          <rect fill={'white'} height={'16'} transform={'translate(4 4)'} width={'16'} />
        </clipPath>
      </defs>
    </svg>
  )
}
