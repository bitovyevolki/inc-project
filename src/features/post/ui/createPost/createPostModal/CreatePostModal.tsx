import type { FC, ReactNode } from 'react'

import { ArrowBackIcon } from '@/src/shared/assets/icons/arrowBack'
import { CloseOutlineIcon } from '@/src/shared/assets/icons/close-outline'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import { Close, Content, Portal, Root } from '@radix-ui/react-dialog'

import s from './CreatePostModal.module.scss'

import { StepOption } from '../CreatePost'

export type ViewPostModalProps = {
  children: ReactNode
  handleUpload: () => void
  hasFile: boolean
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  returnAllChangesFile: () => void
  setStep: (value: StepOption) => void
  step: StepOption
}

export const CreatePostModal: FC<ViewPostModalProps> = ({
  children,
  handleUpload,
  hasFile,
  isOpen,
  onOpenChange,
  returnAllChangesFile,
  setStep,
  step,
}) => {
  const addTitle = (step: StepOption) => {
    switch (step) {
      case 'crop':
        return 'Cropping'
      case 'filter':
        return 'Filters'
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

  const title = hasFile ? addTitle(step) : 'Add Photo'

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
                  Next
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
