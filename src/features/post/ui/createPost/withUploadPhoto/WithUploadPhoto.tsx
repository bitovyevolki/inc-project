import { ChangeEvent, RefObject, useEffect, useState } from 'react'

import { AddIcon } from '@/src/shared/assets/icons/addIcon'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { ChangeScaleIcon } from '@/src/shared/assets/icons/change-scale'
import { DeleteImageIcon } from '@/src/shared/assets/icons/delete-image'
import { MaximizeIcon } from '@/src/shared/assets/icons/maximize'
import { Slider } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import Image from 'next/image'

import s from './WithUploadPhoto.module.scss'

import { FileWithId } from '../CreatePost'

type AllFilesUrl = {
  id: string
  url: string
}

type Props = {
  files: FileWithId[]
  inputUploadFile: RefObject<HTMLInputElement>
  onAddFiles: (addedFiles: ChangeEvent<HTMLInputElement>) => void
  onSelectFile: () => void
  removeFile: (id: string) => void
}

export const WithUploadPhoto = ({
  files,
  inputUploadFile,
  onAddFiles,
  onSelectFile,
  removeFile,
}: Props) => {
  const [openedOptions, setOpenedOptions] = useState<null | string>(null)
  const [value, setValue] = useState('1')
  const [sliderValue, setSliderValue] = useState([100])
  const [allFilesUrl, setAllFilesUrl] = useState<[] | AllFilesUrl[]>([])
  const [currentPreviewuImage, setCurrentPreviewImage] = useState()
  const option = [
    {
      icon: <AvatarIcon height={'24px'} style={{ marginRight: '-4px' }} width={'24px'} />,
      label: 'Original',
      value: '1',
    },
    { icon: '', label: '1:1', value: '2' },
    { icon: '', label: '4:5', value: '3' },
    { icon: '', label: '16:9', value: '4' },
  ]

  useEffect(() => {
    if (files) {
      const arr = Array.from(files).map(item => ({
        id: `${item.id}`,
        url: URL.createObjectURL(item.file),
      }))

      setAllFilesUrl(arr)
    }
  }, [files])

  const onCloseSelect = () => {
    setOpenedOptions(null)
  }

  const onOpenSelect = (value: string) => {
    if (openedOptions === value) {
      onCloseSelect()
    } else {
      setOpenedOptions(value)
    }
  }

  if (!allFilesUrl || allFilesUrl.length === 0) {
    return
  }

  return (
    <div className={s.content}>
      <Image
        alt={'Preview'}
        fill
        onClick={onCloseSelect}
        src={allFilesUrl[0].url}
        style={{ objectFit: 'cover' }}
      />
      <div className={s.controls}>
        <div className={s.leftControls}>
          <div className={s.trigger}>
            <div className={s.block} onClick={() => onOpenSelect('scale')}>
              <ChangeScaleIcon />
            </div>
            {openedOptions === 'scale' && (
              <div className={clsx(s.options, s.scale)}>
                {option.map((el, index) => (
                  <div className={s.scaleItem} key={index}>
                    <p>{el.label}</p>
                    {el.icon}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={s.trigger}>
            <div className={s.block} onClick={() => onOpenSelect('maximize')}>
              <MaximizeIcon />
            </div>
            {openedOptions === 'maximize' && (
              <div className={clsx(s.options, s.slider)}>
                <Slider onValueChange={setSliderValue} value={sliderValue} />
              </div>
            )}
          </div>
        </div>
        <div className={s.trigger}>
          <div className={s.block} onClick={() => onOpenSelect('images')}>
            <AvatarIcon height={'24'} width={'24'} />
          </div>
          {openedOptions === 'images' && (
            <div className={clsx(s.options, s.images)}>
              {allFilesUrl.map((item, i) => (
                <div className={s.imageItem} key={item.id}>
                  <Image alt={'Preview'} fill src={item.url} style={{ objectFit: 'cover' }} />

                  <input
                    accept={'image/png, image/jpeg'}
                    // className={s.fileInp}
                    hidden
                    multiple
                    name={'file'}
                    onChange={e => onAddFiles(e)}
                    ref={inputUploadFile}
                    type={'file'}
                  />
                  <div className={clsx(s.block, s.removeImage)}>
                    <DeleteImageIcon onClick={() => removeFile(item.id)} />
                  </div>
                </div>
              ))}
              <AddIcon className={s.addFiles} onClick={onSelectFile} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
