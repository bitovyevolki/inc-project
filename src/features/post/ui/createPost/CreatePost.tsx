import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useUploadImagesMutation } from '@/src/features/post/model/posts.service'
import { AddPostDescription } from '@/src/features/post/ui/addPostDescription/AddPostDescription'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { setIndexedDBItem } from '@/src/shared/utils/indexedDB'
import { Button, ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'
import { v4 as uuidv4 } from 'uuid'

import s from './createPost.module.scss'

import { Post } from '../../model/posts.service.types'
import { Crop } from './Crop'
import { Filter } from './Filter'
import { CreatePostModal } from './createPostModal'
import { WithoutUploadPhoto } from './withoutUploadPhoto'

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

export type FileWithIdAndUrl = {
  file: File
  id: string
  url: string
}

export type StepOption = 'crop' | 'filter' | 'publish'

interface IProps {
  addPost: (post: Post) => void
  closeModal: () => void
  isOpenModal: boolean
}

export const CreatePost = ({ addPost, closeModal, isOpenModal }: IProps) => {
  const t = useTranslations('CreatePost.confirn-close-modal')
  const [uploadImages, { data, isLoading }] = useUploadImagesMutation()
  const [step, setStep] = useState<StepOption>('crop')
  const [files, setFiles] = useState<FileWithIdAndUrl[]>([])
  const [hasFile, setHasFile] = useState(false)
  const [uploadImagesId, setUploadImagesId] = useState<any[]>([])
  const [filtredFiles, setFiltredFiles] = useState<FileWithIdAndUrl[]>([])

  const [postDescription, setPostDescription] = useState('')
  const [isOpenConfitmCloseModal, setIsOpenConfitmCloseModal] = useState(false)

  const onCloseAddPost = () => {
    if (files.length !== 0) {
      setIsOpenConfitmCloseModal(true)
    } else {
      closeAllModals()
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

    const newFiles = Array.from(files)
      .filter(file => {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          toast.warning(`${file.name} exceeds the 20MB limit and will not be added.`)

          return false
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toast.warning(`${file.name} is not a valid format. Only JPG and PNG files are allowed.`)

          return false
        }

        return true
      })
      .map(file => ({ file, id: uuidv4(), url: URL.createObjectURL(file) }))

    setFiles(prevFiles => [...prevFiles, ...newFiles])
  }

  const onUpdateFiles = (updatedFile: FileWithIdAndUrl[]) => {
    setFiles(updatedFile)
  }

  const onRemoveFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(item => item.id !== id))
  }

  const returnAllChangesFile = () => {
    setFiles([])
    setStep('crop')
    setPostDescription('')
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

  const closeAllModals = () => {
    setIsOpenConfitmCloseModal(false)
    closeModal()
    returnAllChangesFile()
  }

  const onSaveDraft = () => {
    const draftFileList = files.map(item => {
      return item.file
    })

    setIndexedDBItem('files', draftFileList)
    closeAllModals()
  }

  const viewedComponent = (step: StepOption) => {
    switch (step) {
      case 'crop':
        return (
          <Crop
            files={files}
            inputUploadFile={inputUploadFile}
            onAddFiles={onAddFiles}
            onRemoveFile={onRemoveFile}
            onSelectFile={onSelectFile}
            onUpdateFiles={onUpdateFiles}
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

  return (
    <>
      <CreatePostModal
        closeAllModals={closeAllModals}
        handleUpload={handleUpload}
        hasFile={files.length > 0}
        isOpen={isOpenModal}
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
      {files.length !== 0 && (
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
              <Button onClick={onSaveDraft}>{t('button-draft')}</Button>
            </div>
          </div>
        </ModalWindow>
      )}
      {isLoading && (
        <div className={s.overlay}>
          <Loader />
        </div>
      )}
    </>
  )
}
