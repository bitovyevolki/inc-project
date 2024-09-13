import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useUploadImagesMutation } from '@/src/features/post/model/posts.service'
import { AddPostDescription } from '@/src/features/post/ui/addPostDescription/AddPostDescription'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { ModalWindow } from '@bitovyevolki/ui-kit-int'
import { v4 as uuidv4 } from 'uuid'

import s from './createPost.module.scss'

import { WithUploadPhoto } from './withUploadPhoto/WithUploadPhoto'
import { WithoutUploadPhoto } from './withoutUploadPhoto/WithoutUploadPhoto'

export type FileWithId = {
  file: File
  id: string
}

type Props = {}
export const CreatePost = (props: Props) => {
  const [uploadImages, { data, isLoading }] = useUploadImagesMutation()

  const [showAddPhotos, setShowAddPhotos] = useState(true)
  const [isUploadPhoto, setIsUploadPhoto] = useState(false)
  const [showAddDescription, setShowAddDescription] = useState(false)
  const [files, setFiles] = useState<FileWithId[]>([])

  const image = data?.images[0].url

  useEffect(() => {
    if (files) {
      setIsUploadPhoto(true)
    }
  }, [files])

  const uploadId = data?.images[0].uploadId

  const inputUploadFile = useRef<HTMLInputElement>(null)

  const onSelectFile = () => {
    inputUploadFile.current?.click()
  }

  const onAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.currentTarget.files
      ? Array.from(e.currentTarget.files).map(file => ({ file, id: uuidv4() }))
      : []

    setFiles(prevFiles => [...prevFiles, ...newFiles])
  }

  const removeFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(item => item.id !== id))
  }

  const convertArrayToFileList = (fileArray: FileWithId[]): FileList => {
    const dataTransfer = new DataTransfer()

    fileArray.forEach(file => dataTransfer.items.add(file.file))

    return dataTransfer.files
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (files.length === 0) {
      return
    }

    const fileList = convertArrayToFileList(files)

    uploadImages({ files: fileList })
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
        title={!isUploadPhoto ? 'Add photo' : 'Crupped'}
      >
        {files.length === 0 ? (
          <WithoutUploadPhoto
            inputUploadFile={inputUploadFile}
            onAddFiles={onAddFiles}
            onSelectFile={onSelectFile}
          />
        ) : (
          <WithUploadPhoto
            files={files}
            inputUploadFile={inputUploadFile}
            onAddFiles={onAddFiles}
            onSelectFile={onSelectFile}
            removeFile={removeFile}
          />
        )}
      </ModalWindow>
      {showAddDescription && <AddPostDescription imageURL={image} uploadId={uploadId} />}
    </div>
  )
}
