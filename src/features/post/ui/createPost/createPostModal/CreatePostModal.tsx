import type { FC, ReactNode } from 'react'
import { toast } from 'react-toastify'

import { ArrowBackIcon } from '@/src/shared/assets/icons/arrowBack'
import { CloseOutlineIcon } from '@/src/shared/assets/icons/close-outline'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { removeIndexedDBItem } from '@/src/shared/utils/indexedDB'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import { Close, Content, Portal, Root } from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'

import s from './CreatePostModal.module.scss'

import { useCreatePostMutation } from '../../../model/posts.service'
import { StepOption } from '../CreatePost'

export type ViewPostModalProps = {
  children: ReactNode
  closeAllModals: () => void
  handleUpload: () => void
  hasFile: boolean
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  postDescription: string
  returnAllChangesFile: () => void
  setStep: (value: StepOption) => void
  step: StepOption
  uploadImagesId: any[]
}

export const CreatePostModal: FC<ViewPostModalProps> = ({
  children,
  closeAllModals,
  handleUpload,
  hasFile,
  isOpen,
  onOpenChange,
  postDescription,
  returnAllChangesFile,
  setStep,
  step,
  uploadImagesId,
}) => {
  const t = useTranslations('CreatePost')
  const [createPost, { isLoading: LoadingPost }] = useCreatePostMutation()
  const isLoading = LoadingPost
  const addTitle = (step: StepOption) => {
    switch (step) {
      case 'crop':
        return t('cropping.title')
      case 'filter':
        return t('filters.title')
      case 'publish':
        return t('filters.title')
    }
  }

  const onClickNext = () => {
    if (step === 'crop') {
      setStep('filter')
    }
    if (step === 'filter') {
      setStep('publish')
      handleUpload()
    }
    if (step === 'publish') {
      handleCreatePost()
    }
  }

  const onClickBack = () => {
    if (step === 'crop') {
      returnAllChangesFile()
    }
    if (step === 'filter') {
      setStep('crop')
    }
    if (step === 'publish') {
      setStep('filter')
    }
  }

  const handleCreatePost = async () => {
    if (!uploadImagesId) {
      return
    }

    try {
      await createPost({ childrenMetadata: uploadImagesId, description: postDescription }).unwrap()
      toast.success(t('toast-message.success'))
      closeAllModals()
      removeIndexedDBItem('files')
    } catch (error) {
      toast.error(t('toast-message.error'))
    }
  }

  const title = hasFile ? addTitle(step) : t('add-photo.title')

  if (isLoading) {
    return (
      <div className={s.overlayLoader}>
        <Loader />
      </div>
    )
  }

  return (
    <Root onOpenChange={onOpenChange} open={isOpen}>
      <Portal>
        <div className={s.overlay}>
          <Content className={s.contentWrapper}>
            <div className={s.header}>
              {hasFile && (
                <ArrowBackIcon
                  className={s.returnButton}
                  height={28}
                  onClick={onClickBack}
                  width={28}
                />
              )}
              <Typography className={`${s.title} ${hasFile ? s.isCropping : ''}`} variant={'h2'}>
                {title}
              </Typography>
              {hasFile ? (
                <Typography className={s.rightButton} onClick={onClickNext} variant={'h4'}>
                  {step !== 'publish' ? t('button-next.next') : t('button-next.publish')}
                </Typography>
              ) : (
                <Close asChild>
                  <Button
                    className={s.rightButton}
                    onClick={() => onOpenChange(false)}
                    variant={'ghost'}
                  >
                    <CloseOutlineIcon height={28} width={28} />
                  </Button>
                </Close>
              )}
            </div>
            {children}
          </Content>
        </div>
      </Portal>
    </Root>
  )
}
