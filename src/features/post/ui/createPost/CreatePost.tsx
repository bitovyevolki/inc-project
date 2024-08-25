import * as React from 'react'
import { ChangeEvent, useRef, useState } from 'react'

import { useUploadImagesMutation } from '@/src/features/post/model/posts.service'
import { AddPostDescription } from '@/src/features/post/ui/addPostDescription/AddPostDescription'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow } from '@bitovyevolki/ui-kit-int'

import s from './createPost.module.scss'

type Props = {}
export const CreatePost = (props: Props) => {
  const [uploadImages, { data, isLoading }] = useUploadImagesMutation()

  const [showAddPhotos, setShowAddPhotos] = useState(true)
  const [showAddDescription, setShowAddDescription] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)

  const image = data?.images[0].url
  let previewUrl

  if (files) {
    const fileUrl = URL.createObjectURL(files[0])

    previewUrl = fileUrl
  }

  const uploadId = data?.images[0].uploadId

  const inputUploadFile = useRef<HTMLInputElement>(null)

  const onClickButtonSelectFile = () => {
    inputUploadFile.current?.click()
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!files || !files.length) {
      return
    }
    uploadImages({ files })
      .unwrap()
      .then(() => {
        setShowAddPhotos(false)
        setShowAddDescription(true)
      })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <ModalWindow
        className={s.modalWindow}
        onOpenChange={() => setShowAddPhotos(false)}
        open={showAddPhotos}
        title={'Add photo'}
      >
        {showAddPhotos && (
          <div className={s.uploadContainer}>
            <form onSubmit={handleSubmit}>
              <div className={s.imageContainer}>
                {previewUrl ? <img alt={'Preview'} src={previewUrl} width={300} /> : <AvatarIcon />}
              </div>
              <input
                accept={'image/png, image/jpeg'}
                className={s.fileInp}
                hidden
                multiple
                name={'file'}
                onChange={e => setFiles(e.currentTarget.files)}
                ref={inputUploadFile}
                type={'file'}
              />
              <div className={s.buttonsContainer}>
                <Button fullWidth onClick={onClickButtonSelectFile} variant={'primary'}>
                  Select from Computer
                </Button>
                <Button fullWidth type={'submit'} variant={'outlined'}>
                  Create Post
                </Button>
              </div>
            </form>
          </div>
        )}
      </ModalWindow>
      {showAddDescription && <AddPostDescription imageURL={image} uploadId={uploadId} />}
    </div>
  )
}
