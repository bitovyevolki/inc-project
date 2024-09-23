/* eslint-disable no-nested-ternary */
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useUploadImagesMutation } from '@/src/features/post/model/posts.service'
import { AddPostDescription } from '@/src/features/post/ui/addPostDescription/AddPostDescription'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { v4 as uuidv4 } from 'uuid'

import { Crop } from './Crop/Crop'
import { Filter } from './Filter/Filter'
import { CreatePostModal } from './createPostModal/CreatePostModal'
import { WithoutUploadPhoto } from './withoutUploadPhoto/WithoutUploadPhoto'

export type FileWithIdAndUrl = {
  file: File
  id: string
  url: string
}

export type StepOption = 'crop' | 'filter' | 'publish'

export const CreatePost = () => {
  const [uploadImages, { data, isLoading }] = useUploadImagesMutation()
  const [step, setStep] = useState<StepOption>('crop')
  const [files, setFiles] = useState<FileWithIdAndUrl[]>([])
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [hasFile, setHasFile] = useState(false)
  const [uploadImagesId, setUploadImagesId] = useState<any[]>([])
  const [filtredFiles, setFiltredFiles] = useState<FileWithIdAndUrl[]>([])

  useEffect(() => {
    if (files) {
      setFiltredFiles(files)
    }
  }, [files])
  // const image = data?.images[0].useSelector

  useEffect(() => {
    if (files.length > 0) {
      setHasFile(true)
    } else {
      setHasFile(false)
    }
  }, [files])

  useEffect(() => {
    if (data) {
      setUploadImagesId(
        data?.images.map(image => {
          return { uploadId: image.uploadId }
        })
      )
    }
  }, [data])

  // const uploadId = data?.images[0].uploadId

  const inputUploadFile = useRef<HTMLInputElement>(null)

  const onSelectFile = () => {
    inputUploadFile.current?.click()
  }

  const onAddFiles = (files: FileList | null) => {
    if (!files) {
      return
    }
    const newFiles = files
      ? Array.from(files).map(file => ({ file, id: uuidv4(), url: URL.createObjectURL(file) }))
      : []

    setFiles(prevFiles => [...prevFiles, ...newFiles])
  }

  const onChangeFiles = (updatedFile: FileWithIdAndUrl[]) => {
    setFiles(updatedFile)
  }

  const removeFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(item => item.id !== id))
  }

  const returnAllChangesFile = () => {
    setFiles([])
    setStep('crop')
  }

  const convertArrayToFileList = (fileArray: FileWithIdAndUrl[]): FileList => {
    const dataTransfer = new DataTransfer()

    fileArray.forEach(file => dataTransfer.items.add(file.file))

    return dataTransfer.files
  }

  const handleUpload = () => {
    if (files.length === 0) {
      return
    }

    const fileList = convertArrayToFileList(filtredFiles)

    uploadImages({ files: fileList })
  }

  const setIsModalOpenHandler = (value: boolean) => {
    setIsModalOpen(value)
  }

  const viewedComponent = (step: StepOption) => {
    switch (step) {
      case 'crop':
        return (
          <Crop
            files={files}
            inputUploadFile={inputUploadFile}
            onAddFiles={onAddFiles}
            onChangeFiles={onChangeFiles}
            onSelectFile={onSelectFile}
            removeFile={removeFile}
          />
        )
      case 'filter':
        return (
          <Filter files={files} filtredFiles={filtredFiles} setFiltredFiles={setFiltredFiles} />
        )

      case 'publish':
        return <AddPostDescription files={filtredFiles} uploadImagesId={uploadImagesId} />
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <CreatePostModal
        handleUpload={handleUpload}
        hasFile={hasFile}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpenHandler}
        returnAllChangesFile={returnAllChangesFile}
        setStep={setStep}
        step={step}
      >
        {files.length === 0 ? (
          <WithoutUploadPhoto
            inputUploadFile={inputUploadFile}
            onAddFiles={onAddFiles}
            onSelectFile={onSelectFile}
          />
        ) : (
          viewedComponent(step)
        )}
      </CreatePostModal>
    </div>
  )
}
