import { ChangeEvent } from 'react'

import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Button } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './WithoutUploadPhoto.module.scss'

type Props = {
  inputUploadFile: any
  onAddFiles: (addedFiles: ChangeEvent<HTMLInputElement>) => void
  onSelectFile: () => void
}

export const WithoutUploadPhoto = ({ inputUploadFile, onAddFiles, onSelectFile }: Props) => {
  return (
    <div className={s.uploadContainer}>
      {/* <form onSubmit={handleSubmit}> */}
      <div className={s.imageContainer}>
        {/* {previewUrl ? (
          <Image alt={'Preview'} height={300} src={previewUrl} width={300} />
        ) : ( */}
        <AvatarIcon />
        {/* )} */}
      </div>
      <input
        accept={'image/png, image/jpeg'}
        className={s.fileInp}
        hidden
        multiple
        name={'file'}
        onChange={e => onAddFiles(e)}
        ref={inputUploadFile}
        type={'file'}
      />
      <div className={s.buttonsContainer}>
        <Button fullWidth onClick={onSelectFile} variant={'primary'}>
          Select from Computer
        </Button>
        {/* <Button fullWidth type={'submit'} variant={'outlined'}>
            Create Post
          </Button> */}
      </div>
      {/* </form> */}
    </div>
  )
}
