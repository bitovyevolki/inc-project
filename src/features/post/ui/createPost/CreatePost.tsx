import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useCreatePostMutation } from '@/src/features/post/model/posts.service'
import { UserCredentials } from '@/src/features/post/ui/userCredentials/UserCredentials'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, ModalWindow, TextArea } from '@bitovyevolki/ui-kit-int'

import s from './createPost.module.scss'

type Props = {
  imageURL: string | undefined
  uploadId: string | undefined
}
export const CreatePost = ({ imageURL, uploadId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation()

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const description = formData.get('postDescription') as string

    if (!uploadId) {
      return
    }
    createPost({ childrenMetadata: [{ uploadId }], description })
  }

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess) {
    toast.success('Successfully created post')
  }

  return (
    <div>
      <ModalWindow
        className={s.modalWindow}
        onOpenChange={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={'Publication'}
      >
        <div className={s.container}>
          <div className={s.imageContainer}>
            <img alt={'post image'} height={300} src={imageURL} width={300} />
          </div>
          <div className={s.publicationContainer}>
            <UserCredentials />
            <div className={s.postContainer}>
              <form onSubmit={handleSubmit}>
                <TextArea
                  className={s.textArea}
                  label={'Add publication descriptions'}
                  name={'postDescription'}
                  placeholder={'Text-area'}
                />
                <Button type={'submit'}>Publish post</Button>
              </form>
            </div>
          </div>
          <div className={s.locationContainer}></div>
        </div>
      </ModalWindow>
    </div>
  )
}
