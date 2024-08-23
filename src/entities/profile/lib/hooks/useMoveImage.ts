import { MouseEvent, useEffect, useRef, useState } from 'react'

import { ITempProfilePhoto } from '../../model/types/profile'

export const useMoveImage = (photo: ITempProfilePhoto) => {
  const parentRef = useRef<HTMLDivElement | null>(null)

  const [position, setPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 })

  const [clicked, setClicked] = useState(false)

  const rect = parentRef.current?.getBoundingClientRect()

  useEffect(() => {
    if (parentRef.current) {
      setPosition({
        left: (0 - photo.width) / 2 + parentRef.current?.getBoundingClientRect().width / 2,
        top: (0 - photo.height) / 2 + parentRef.current?.getBoundingClientRect().height / 2,
      })
    }
  }, [])

  const mouseDownHandler = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault()

    setClicked(true)
  }

  const mouseUpHandler = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault()

    setClicked(false)
  }

  const mouseLeaveHandler = () => {
    setClicked(false)
  }

  const mouseMoveHandler = (event: MouseEvent<HTMLImageElement>) => {
    event.preventDefault()
    //  if (clicked && parentRef.current) {
    //    setPosition({
    //      left: position.left - parentRef.current?.getBoundingClientRect().width,
    //      top: event.pageY / 2,
    //    })
    //  }
  }

  return {
    mouseDownHandler,
    mouseLeaveHandler,
    mouseMoveHandler,
    mouseUpHandler,
    parentRef,
    position,
  }
}
