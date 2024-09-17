/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
import { RefObject, useEffect, useRef, useState } from 'react'

import { AddIcon } from '@/src/shared/assets/icons/addIcon'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { ChangeScaleIcon } from '@/src/shared/assets/icons/change-scale'
import { DeleteImageIcon } from '@/src/shared/assets/icons/delete-image'
import { MaximizeIcon } from '@/src/shared/assets/icons/maximize'
import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import { Slider } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import Cropper from 'cropperjs'
import Image from 'next/image'

import 'cropperjs/dist/cropper.css'

import s from './Crop.module.scss'

import { FileWithIdAndUrl } from '../CreatePost'

type Props = {
  files: FileWithIdAndUrl[]
  handleSubmit: (files: any) => void
  inputUploadFile: RefObject<HTMLInputElement>
  onAddFiles: (addedFiles: FileList | null) => void
  onChangeFiles: (files: any) => void
  onSelectFile: () => void
  removeFile: (id: string) => void
}

export const Crop = ({
  files,
  handleSubmit,
  inputUploadFile,
  onAddFiles,
  onChangeFiles,
  onSelectFile,
  removeFile,
}: Props) => {
  const [openedOptions, setOpenedOptions] = useState<null | string>(null)
  const [aspectRatioValue, setAspectRatioValue] = useState('1')
  const [sliderValue, setSliderValue] = useState([0])
  const [currentFile, setCurrentFile] = useState<FileWithIdAndUrl>()
  const [cropper, setCropper] = useState<Cropper | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [isCropperActive, setIsCropperActive] = useState(false)

  const option = [
    {
      icon: <AvatarIcon height={'24px'} style={{ marginRight: '-4px' }} width={'24px'} />,
      label: 'Original',
    },
    { icon: '', label: '1:1' },
    { icon: '', label: '4:5' },
    { icon: '', label: '16:9' },
  ]

  useEffect(() => {
    if (files) {
      if (currentFile && files.find(el => el.id === currentFile.id)) {
        const indexCurrentFile = files.findIndex(el => el.id === currentFile.id)

        setCurrentFile(files[indexCurrentFile])
      } else {
        setCurrentFile(files[0])
      }
    }
  }, [files])

  useEffect(() => {
    if (imageRef.current && !cropper && isCropperActive) {
      const newCropper = new Cropper(imageRef.current, {
        aspectRatio: 1,
        center: true,
        viewMode: 3,
      })

      setCropper(newCropper)
    }
    if (cropper && currentFile) {
      cropper.replace(currentFile.url)
    }
  }, [imageRef, cropper, aspectRatioValue, currentFile, isCropperActive])

  useEffect(() => {
    onSliderChange(sliderValue)
  }, [sliderValue])

  const onCropConfirm = () => {
    if (cropper) {
      const canvas = cropper.getCroppedCanvas()

      canvas.toBlob(blob => {
        if (blob) {
          const newUrl = URL.createObjectURL(blob)

          const updatedFiles = files.map(file =>
            file.id === currentFile?.id ? { ...file, url: newUrl } : file
          )

          onChangeFiles(updatedFiles)
          setIsCropperActive(false)
          cropper.destroy()
          setCropper(null)
          onCloseSelect()
        }
      }, 'image/jpeg')
    }
  }

  const onCloseSelect = () => {
    setOpenedOptions(null)
  }

  const onOpenSelect = (value: string) => {
    if (value === 'maximize') {
      setIsCropperActive(true)
    }
    if (openedOptions === value) {
      onCloseSelect()
    } else {
      setOpenedOptions(value)
    }
  }

  const handleAspectRatioChange = (ratio: number) => {
    if (Number.isNaN(ratio)) {
      cropper?.setAspectRatio(ratio)
      setIsCropperActive(false)
      cropper?.destroy()
      setCropper(null)
    } else {
      setIsCropperActive(true)
      cropper?.setAspectRatio(ratio)
    }
  }

  const onChangeAspectRatio = (label: string) => {
    setAspectRatioValue(label)
    switch (label) {
      case 'Original':
        handleAspectRatioChange(NaN)

        break
      case '1:1':
        handleAspectRatioChange(1)
        break
      case '4:5':
        handleAspectRatioChange(4 / 5)
        break
      case '16:9':
        handleAspectRatioChange(16 / 9)
        break
      default:
        handleAspectRatioChange(1)
        break
    }
    onCloseSelect()
  }

  const onSliderChange = (value: number[]) => {
    if (cropper) {
      cropper.zoomTo(value[0] / 10)
    }
  }

  const onChangeCurrentFile = (file: FileWithIdAndUrl) => {
    setCurrentFile(file)
  }

  if (!files || files.length === 0 || !currentFile) {
    return
  }

  const NextArrow = (props: any) => {
    const { className, onClick } = props

    return <div className={`${className} ${s.nextArrow}`} onClick={onClick} />
  }

  const PrevArrow = (props: any) => {
    const { className, onClick } = props

    return <div className={`${className} ${s.nextArrow}`} onClick={onClick} />
  }

  const settings = {
    dots: true,
    dotsClass: `slick-dots ${s.dots}`,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div className={s.content}>
      {isCropperActive && (
        // eslint-disable-next-line react/button-has-type
        <button className={clsx(s.block, s.cropConfirm)} onClick={onCropConfirm}></button>
      )}
      {currentFile && (
        <PhotoSlider settings={settings}>
          {files.map((el, i) => {
            return (
              <Image
                alt={'Image'}
                className={s.image}
                height={240}
                key={i}
                src={el.url}
                width={234}
              />
            )
          })}
        </PhotoSlider>
        // <img
        //   alt={'Preview'}
        //   onClick={() => onCloseSelect()}
        //   ref={imageRef}
        //   src={currentFile.url}
        //   style={{
        //     display: 'block',
        //     height: '100%',
        //     maxHeight: '60vh',
        //     objectFit: 'contain',
        //     width: '100%',
        //   }}
        // />
      )}

      <div className={s.controls}>
        <div className={s.leftControls}>
          <div className={s.trigger}>
            <div className={s.block} onClick={() => onOpenSelect('scale')}>
              <ChangeScaleIcon />
            </div>
            {openedOptions === 'scale' && (
              <div className={clsx(s.options, s.scale)}>
                {option.map((el, index) => (
                  <div
                    className={s.scaleItem}
                    key={index}
                    onClick={() => onChangeAspectRatio(el.label)}
                  >
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
                <Slider max={40} onValueChange={setSliderValue} value={sliderValue} />
              </div>
            )}
          </div>
        </div>
        <div className={s.trigger}>
          <div className={s.block} onClick={() => onOpenSelect('images')}>
            <AvatarIcon height={'24'} width={'24'} />
          </div>
          {openedOptions === 'images' && (
            <div className={clsx(s.options, s.imagesWrapper)}>
              <div className={s.images}>
                {files.map((item, i) => (
                  <div className={s.imageItem} key={item.id}>
                    <Image
                      alt={'Preview'}
                      height={80}
                      onClick={() => onChangeCurrentFile(item)}
                      src={item.url}
                      style={{ objectFit: 'cover' }}
                      width={82}
                    />

                    <input
                      accept={'image/png, image/jpeg'}
                      hidden
                      multiple
                      name={'file'}
                      onChange={e => onAddFiles(e.currentTarget.files)}
                      ref={inputUploadFile}
                      type={'file'}
                    />
                    <div className={clsx(s.block, s.removeImage)}>
                      <DeleteImageIcon
                        onClick={() => {
                          removeFile(item.id)
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className={s.addFiles} onClick={onSelectFile}>
                  <AddIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
