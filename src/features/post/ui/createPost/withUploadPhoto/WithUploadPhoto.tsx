/* eslint-disable max-lines */
/* eslint-disable prettier/prettier */
// import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'

// import { AddIcon } from '@/src/shared/assets/icons/addIcon'
// import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
// import { ChangeScaleIcon } from '@/src/shared/assets/icons/change-scale'
// import { DeleteImageIcon } from '@/src/shared/assets/icons/delete-image'
// import { MaximizeIcon } from '@/src/shared/assets/icons/maximize'
// import { Slider } from '@bitovyevolki/ui-kit-int'
// import {
//   createDefaultImageReader,
//   createDefaultImageWriter,
//   getEditorDefaults,
// } from '@pqina/pintura'
// import { PinturaEditor } from '@pqina/react-pintura'
// import clsx from 'clsx'
// import Image from 'next/image'

// import '@pqina/pintura/pintura.css'
// import 'cropperjs/dist/cropper.css'

// import s from './WithUploadPhoto.module.scss'

// import { FileWithId } from '../CreatePost'

// const editorDefaults = getEditorDefaults({
//   cropEnableButtonFlipHorizontal: false,
//   cropEnableButtonFlipVertical: false,
//   cropEnableButtonRotateLeft: false,
//   cropEnableRotationInput: false,
//   cropEnableZoomInput: true,
//   cropEnableZoomMatchImageAspectRatio: true,
//   cropEnableZoomTowardsWheelPosition: true,
//   enableButtonRevert: false,
//   enableNavigateHistory: false,
//   enableToolbar: true,
//   enableUtils: false,
//   enableZoom: true,
//   enableZoomControls: true,
//   // imageCropAspectRatio: 1,
//   imageReader: createDefaultImageReader(),
//   // imageWriter: createDefaultImageWriter(),

//   // stickerEnableSelectImage: false,
//   previewUpscale: true,
// })

// type FileWithUrl = {
//   id: string
//   url: string
// }

// type Props = {
//   files: FileWithId[]
//   inputUploadFile: RefObject<HTMLInputElement>
//   onAddFiles: (addedFiles: ChangeEvent<HTMLInputElement>) => void
//   onSelectFile: () => void
//   removeFile: (id: string) => void
// }

// export const WithUploadPhoto = ({
//   files,
//   inputUploadFile,
//   onAddFiles,
//   onSelectFile,
//   removeFile,
// }: Props) => {
//   const [openedOptions, setOpenedOptions] = useState<null | string>(null)
//   const [aspectRatioValue, setAspectRatioValue] = useState<number | undefined>()
//   const [zoomLevelSlider, setZoomLevelSlider] = useState<any | number>(20)
//   const [sliderValue, setSliderValue] = useState([0])
//   const [allFiles, setAllFiles] = useState<[] | FileWithUrl[]>([])
//   const [editorKey, setEditorKey] = useState(0)
//   const [currentFile, setCurrentFile] = useState<FileWithUrl>()
//   const editorRef = useRef<any>(null)
//   const [visible, setVisible] = useState(false)
//   const option = [
//     {
//       label: 'Original',
//       ratio: undefined,
//     },
//     { label: '1:1', ratio: 1 },
//     { label: '4:5', ratio: 4 / 5 },
//     { label: '16:9', ratio: 16 / 9 },
//   ]

//   useEffect(() => {
//     if (files) {
//       const arr = Array.from(files).map(item => ({
//         id: `${item.id}`,
//         url: URL.createObjectURL(item.file),
//       }))

//       setAllFiles(arr)
//       if (currentFile && arr.find(el => el.id === currentFile.id)) {
//         return
//       } else {
//         setCurrentFile(arr[0])
//       }
//     }
//   }, [files])

//   const onCloseSelect = () => {
//     setOpenedOptions(null)
//   }

//   const onOpenSelect = (value: string) => {
//     if (openedOptions === value) {
//       onCloseSelect()
//     } else {
//       setOpenedOptions(value)
//     }
//   }

//   const onChangeAspectRatio = (ratio: number | undefined) => {
//     if (ratio === undefined) {
//       editorRef.current.editor.history.revert()
//       setAspectRatioValue(undefined)
//     } else {
//       setAspectRatioValue(ratio)
//       editorRef.current.editor.history.write()
//       console.log(editorRef.current.editor.history.get())
//     }
//     onCloseSelect()
//   }

//   const onZoomChange = (value: number[]) => {
//     setZoomLevelSlider(value[0])
//   }

//   const onChangeCurrentFile = (file: FileWithUrl) => {
//     currentFile?.id !== file.id && setCurrentFile(file)
//   }

//   const updateFileUrl = (id: string, newUrl: string) => {
//     console.log(allFiles[0].url)
//     console.log(newUrl)
//     setAllFiles(prevFiles =>
//       prevFiles.map(file => (file.id === id ? { ...file, url: newUrl } : file))
//     )
//     setCurrentFile({ id, url: newUrl })
//     setVisible(false)
//   }

//   const getFillColorIcon = (value: 'images' | 'maximize' | 'scale') =>
//     openedOptions === value ? '#397DF6' : 'white'

//   if (!allFiles.length || !currentFile) {
//     return
//   }

//   return (
//     <div className={s.content}>
//       {!visible && (
//         <Image
//           alt={''}
//           height={'256'}
//           onClick={onCloseSelect}
//           src={currentFile.url}
//           width={'490'}
//         />
//       )}
//       {visible && (
//         <div onClick={() => onCloseSelect()} style={{ height: '70vh' }}>
//           <PinturaEditor
//             {...editorDefaults}
//             imageCropAspectRatio={aspectRatioValue}
//             key={editorKey}
//             onProcess={({ dest }) => {
//               console.log(dest)
//               const newUrl = URL.createObjectURL(dest)

//               updateFileUrl(currentFile.id, newUrl)
//             }}
//             ref={editorRef}
//             src={currentFile.url}
//             zoomLevel={zoomLevelSlider}
//           />
//         </div>
//       )}

//       <div className={s.controls}>
//         <div className={s.leftControls}>
//           <div className={s.trigger}>
//             <div
//               className={s.block}
//               onClick={() => {
//                 onOpenSelect('scale')
//                 setVisible(true)
//               }}
//             >
//               <ChangeScaleIcon fill={getFillColorIcon('scale')} />
//             </div>
//             {openedOptions === 'scale' && (
//               <div className={clsx(s.options, s.scale)}>
//                 {option.map((el, index) => (
//                   <div
//                     className={s.scaleItem}
//                     key={index}
//                     onClick={() => onChangeAspectRatio(el.ratio)}
//                   >
//                     <p>{el.label}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className={s.trigger}>
//             <div className={s.block} onClick={() => onOpenSelect('maximize')}>
//               <MaximizeIcon fill={getFillColorIcon('maximize')} />
//             </div>
//             {openedOptions === 'maximize' && (
//               <div className={clsx(s.options, s.slider)}>
//                 <Slider max={10} min={0} onValueChange={onZoomChange} value={sliderValue} />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className={s.trigger}>
//           <div className={s.block} onClick={() => onOpenSelect('images')}>
//             <AvatarIcon fill={getFillColorIcon('images')} height={'24'} width={'24'} />
//           </div>
//           {openedOptions === 'images' && (
//             <div className={clsx(s.options, s.images)}>
//               {allFiles.map((item, i) => (
//                 <div className={s.imageItem} key={item.id}>
//                   <Image
//                     alt={'Preview'}
//                     fill
//                     onClick={() => onChangeCurrentFile(item)}
//                     src={item.url}
//                     style={{ objectFit: 'cover' }}
//                   />

//                   <input
//                     accept={'image/png, image/jpeg'}
//                     // className={s.fileInp}
//                     hidden
//                     multiple
//                     name={'file'}
//                     onChange={e => onAddFiles(e)}
//                     ref={inputUploadFile}
//                     type={'file'}
//                   />
//                   <div className={clsx(s.block, s.removeImage)}>
//                     <DeleteImageIcon onClick={() => removeFile(item.id)} />
//                   </div>
//                 </div>
//               ))}
//               <AddIcon className={s.addFiles} onClick={onSelectFile} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }




//////////////////////////////////////////////////////////////////////////////////////





import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'

import { AddIcon } from '@/src/shared/assets/icons/addIcon'
import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { ChangeScaleIcon } from '@/src/shared/assets/icons/change-scale'
import { DeleteImageIcon } from '@/src/shared/assets/icons/delete-image'
import { MaximizeIcon } from '@/src/shared/assets/icons/maximize'
import { Slider } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import Cropper from 'cropperjs'
import Image from 'next/image'

import 'cropperjs/dist/cropper.css'

import s from './WithUploadPhoto.module.scss'

import { FileWithId } from '../CreatePost'

type FileWithUrl = {
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
  const [aspectRatioValue, setAspectRatioValue] = useState('1')
  const [sliderValue, setSliderValue] = useState([0])
  const [allFilesUrl, setAllFilesUrl] = useState<[] | FileWithUrl[]>([])
  const [currentFile, setCurrentFile] = useState<FileWithUrl>()
  const [cropper, setCropper] = useState<Cropper | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
	const [isCropperActive, setIsCropperActive] = useState(false)
	const [croppedImage, setCroppedImage] = useState<null | string>(null)

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
      const arr = Array.from(files).map(item => ({
        id: item.id,
        url: URL.createObjectURL(item.file),
      }))

      setAllFilesUrl(arr)
      if (currentFile && arr.find(el => el.id === currentFile.id)) {
        return
      } else {
        setCurrentFile(arr[0])
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
    console.log(sliderValue)
    onSliderChange(sliderValue)
  }, [sliderValue])


const onCropConfirm = () => {
  if (cropper) {
    const canvas = cropper.getCroppedCanvas()

    canvas.toBlob((blob) => {
      if (blob) {
        const newUrl = URL.createObjectURL(blob)

        const updatedFiles = allFilesUrl.map((file) => 
          file.id === currentFile?.id ? { ...file, url: newUrl } : file
        )

        setAllFilesUrl(updatedFiles)
        setIsCropperActive(false)
        cropper.destroy()
        setCropper(null)
        setCurrentFile((prev) => ({
          id: prev?.id ?? '', 
          url: newUrl
        }))
				onCloseSelect()
      }
    }, 'image/jpeg')
  }
}


  // useEffect(() => {
  //   if (cropper?.zoom) {
  //     console.log(cropper?.zoom)
  //   }
  // }, [cropper?.zoom])

  // const cropImage = () => {
  //   console.log('crop')
  //   const canvas = cropper?.getCroppedCanvas()

  //   canvas?.toBlob(blob => {
  //     if (blob) {
  //       const croppedImageUrl = URL.createObjectURL(blob)

  //       setCroppedImage(croppedImageUrl)
  //     }
  //   }, 'image/jpeg')
  // }

  const onCloseSelect = () => {
    setOpenedOptions(null)
  }

const onOpenSelect = (value: string) => {
  if (value === 'maximize' || value === 'scale') {
    setIsCropperActive(true) // Активируем cropper только при нажатии кнопки
  }
  if (openedOptions === value) {
    onCloseSelect()
  } else {
    setOpenedOptions(value)
  }
}

  const handleAspectRatioChange = (ratio: number) => {
    if (cropper) {
      cropper.setAspectRatio(ratio)
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

	const onChangeCurrentFile = (file: FileWithUrl) => {
		// console.log(file)
    // currentFile?.id !== file.id && setCurrentFile(file)
		setCurrentFile(file)
  }

  if (!allFilesUrl || allFilesUrl.length === 0 || !currentFile) {
    return
  }

  return (
    <div className={s.content}>
			{isCropperActive && (
      // eslint-disable-next-line react/button-has-type
      <button className={clsx(s.block, s.cropConfirm)} onClick={onCropConfirm}></button>
    )}
      {currentFile && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={'Preview'}
          onClick={()=>console.log('hgf')}
          ref={imageRef}
					src={currentFile.url}
          style={{ display: 'block', height: '100%', maxHeight: '60vh', objectFit: 'contain', width: '100%' }}
        />
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
            <div className={clsx(s.options, s.images)}>
              {allFilesUrl.map((item, i) => (
                <div className={s.imageItem} key={item.id}>
                  <Image alt={'Preview'} fill onClick={()=> onChangeCurrentFile(item)} src={item.url} style={{ objectFit: 'cover' }} />

                  <input
                    accept={'image/png, image/jpeg'}
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
