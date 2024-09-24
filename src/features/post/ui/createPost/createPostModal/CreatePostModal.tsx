import type { FC, ReactNode } from 'react'
import { toast } from 'react-toastify'

import { useMeQuery } from '@/src/features/auth/service/auth.service'
import { ArrowBackIcon } from '@/src/shared/assets/icons/arrowBack'
import { CloseOutlineIcon } from '@/src/shared/assets/icons/close-outline'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import { Close, Content, Portal, Root } from '@radix-ui/react-dialog'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import s from './CreatePostModal.module.scss'

import { useCreatePostMutation } from '../../../model/posts.service'
import { StepOption } from '../CreatePost'

export type ViewPostModalProps = {
  children: ReactNode
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
  const [createPost, { isLoading: LoadingPost, isSuccess }] = useCreatePostMutation()
  const { data: meData, isLoading: LoadingMe } = useMeQuery()
  const router = useRouter()
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
      handleSubmit()
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

  const handleSubmit = async () => {
    if (!uploadImagesId) {
      return
    }

    try {
      await createPost({ childrenMetadata: uploadImagesId, description: postDescription }).unwrap()
      toast.success(t('toast-message.success'))
      router.push(`${RouterPaths.MY_PROFILE}/${meData?.userId}`)
    } catch (error) {
      toast.error(t('toast-message.error'))
    }
  }

  const title = hasFile ? addTitle(step) : t('add-photo.title')

  if (isLoading) {
    return <Loader />
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
