import { useEffect, useRef, useState } from 'react'

import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { useUploadImagesMutation } from '@/src/features/post/model/posts.service'
import { AddPostDescription } from '@/src/features/post/ui/addPostDescription/AddPostDescription'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { setIndexedDBItem } from '@/src/shared/utils/indexedDB'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'
import { v4 as uuidv4 } from 'uuid'

import s from './createPost.module.scss'

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
  const t = useTranslations('CreatePost.confirn-close-modal')
  const [uploadImages, { data, isLoading }] = useUploadImagesMutation()
  const [step, setStep] = useState<StepOption>('crop')
  const [files, setFiles] = useState<FileWithIdAndUrl[]>([])
  const [hasFile, setHasFile] = useState(false)
  const [uploadImagesId, setUploadImagesId] = useState<any[]>([])
  const [filtredFiles, setFiltredFiles] = useState<FileWithIdAndUrl[]>([])

  const [postDescription, setPostDescription] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(true)
  const [isOpenConfitmCloseModal, setIsOpenConfitmCloseModal] = useState(false)

  const onCloseAddPost = () => {
    if (files.length) {
      setIsOpenConfitmCloseModal(true)
    } else {
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    if (files) {
      setFiltredFiles(files)
    }
  }, [files])

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

  const saveDraft = () => {
    const draftFileList = files.map(item => {
      return item.file
    })

    setIndexedDBItem('files', draftFileList)
    closeAllModals()
  }

  const closeAllModals = () => {
    setIsOpenConfitmCloseModal(false)
    setIsModalOpen(false)
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
        return (
          <AddPostDescription
            files={filtredFiles}
            postDescription={postDescription}
            setPostDescription={setPostDescription}
          />
        )
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
        onOpenChange={onCloseAddPost}
        postDescription={postDescription}
        returnAllChangesFile={returnAllChangesFile}
        setStep={setStep}
        step={step}
        uploadImagesId={uploadImagesId}
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
      {files.length === 0 && (
        <ModalWindow
          className={s.lastModal}
          onOpenChange={setIsOpenConfitmCloseModal}
          open={isOpenConfitmCloseModal}
          title={t('title')}
        >
          <div className={s.modalContent}>
            <Typography variant={'body1'}>{t('description')}</Typography>
            <div className={s.buttonGroup}>
              <Button onClick={closeAllModals} variant={'outlined'}>
                {t('button-discard')}
              </Button>
              <Button onClick={saveDraft}>{t('button-draft')}</Button>
            </div>
          </div>
        </ModalWindow>
      )}
    </div>
  )
}
