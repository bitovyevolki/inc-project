import * as React from 'react'
import { ChangeEvent, useRef, useState } from 'react'

import { useUploadImageMutation } from '@/src/features/post/model/posts.service'
import { CreatePost } from '@/src/features/post/ui/createPost/CreatePost'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow } from '@bitovyevolki/ui-kit-int'

import s from './addPhoto.module.scss'

type Props = {}
export const AddPhoto = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)

  const [uploadImage, { data, isLoading }] = useUploadImageMutation()

  const image = data?.images[0].url

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
    uploadImage({ files })
      .unwrap()
      .then(() => {
        setIsModalOpen(false)
        setShowCreatePost(true)
      })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <ModalWindow
        className={s.modalWindow}
        onOpenChange={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={'Add photo'}
      >
        <div className={s.uploadContainer}>
          <form onSubmit={handleSubmit}>
            <div className={s.imageContainer}>
              <AvatarIcon />
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
      </ModalWindow>
      {showCreatePost && <CreatePost imageURL={image} uploadId={uploadId} />}
    </div>
  )
}
