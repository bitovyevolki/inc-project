import { useEffect, useState } from 'react'

import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { getIndexedDBItem } from '@/src/shared/utils/indexedDB'
import { Button } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './WithoutUploadPhoto.module.scss'

type Props = {
  inputUploadFile: any
  onAddFiles: (addedFiles: FileList | null) => void
  onSelectFile: () => void
}

export const WithoutUploadPhoto = ({ inputUploadFile, onAddFiles, onSelectFile }: Props) => {
  const t = useTranslations('CreatePost')
  const [draftFiles, setDraftFiles] = useState<FileList | null>(null)

  const getDraft = async () => {
    const res = await getIndexedDBItem('files')

    if (res) {
      const dataTransfer = new DataTransfer()

      res.forEach((file: File) => {
        dataTransfer.items.add(file)
      })

      const fileList = dataTransfer.files

      if (fileList.length === 0) {
        setDraftFiles(null)
      } else {
        setDraftFiles(fileList)
      }
    }
  }

  useEffect(() => {
    getDraft()
  }, [])

  const onAddDraftFiles = async () => {
    onAddFiles(draftFiles)
  }

  return (
    <div className={s.uploadContainer}>
      <div className={s.imageContainer}>
        <AvatarIcon />
      </div>
      <input
        accept={'image/png, image/jpeg'}
        className={s.fileInp}
        hidden
        multiple
        name={'file'}
        onChange={e => onAddFiles(e.currentTarget.files)}
        ref={inputUploadFile}
        type={'file'}
      />
      <div className={s.buttonsContainer}>
        <Button fullWidth onClick={onSelectFile} variant={'primary'}>
          {t('without-photo.button-select-files')}
        </Button>
        {draftFiles && (
          <Button fullWidth onClick={onAddDraftFiles} variant={'outlined'}>
            {t('without-photo.button-draft')}
          </Button>
        )}
      </div>
    </div>
  )
}
