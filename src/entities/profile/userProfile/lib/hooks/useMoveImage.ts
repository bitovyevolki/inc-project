import { PointerEvent, useRef, useState } from 'react'

import { useDragControls } from 'framer-motion'

import { getCroppedImg } from '../utils/createImage'
import { ITempProfilePhoto } from '../../model/types/profile'

export const useMoveImage = (photo: ITempProfilePhoto) => {
  const dragControls = useDragControls()

  const [file, setFile] = useState<FormData>()

  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const photoRef = useRef<HTMLDivElement | null>(null)

  const changeFileHandler = (file: FormData) => {
    setFile(file)
  }

  const startDragHandler = (event: PointerEvent<HTMLDivElement>) => {
    dragControls.start(event)
  }

  const endDragHandler = async () => {
    if (photoRef?.current) {
      const coords = photoRef.current.style.transform
        .split(' ')
        .map(str => parseInt(str.slice(11, str.length - 3), 10))

      await getCroppedImg({
        photo,
        pixelCrop: { height: 332, width: 332, x: coords[0], y: coords[1] },
        setFile: changeFileHandler,
      })
    }
  }

  return {
    constraintsRef,
    dragControls,
    endDragHandler,
    file,
    photoRef,
    startDragHandler,
  }
}
