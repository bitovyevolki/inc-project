import { ReactNode, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'

import clsx from 'clsx'
import Image from 'next/image'

import s from './SliderPostImages.module.scss'

type Props = {
  onChangeCurrentFile: (index: number) => void
  setSlideIndex: (i: number) => void
  slideIndex: number
	children: ReactNode
}

const NextArrow = (props: any) => {
  const { className, onClick, style } = props

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ ...style, position: 'absolute', right: '10px', top: '50%' }}
    />
  )
}

const PrevArrow = (props: any) => {
  const { className, onClick, style } = props

  return (
    <div
      className={className}
      onClick={onClick}
      style={{ ...style, left: '10px', position: 'absolute', top: '50%', zIndex: '1' }}
    />
  )
}

export const SliderPostImages = ({
  onChangeCurrentFile,
  setSlideIndex,
  slideIndex,
	children
}: Props) => {
  const [updateCount, setUpdateCount] = useState(0)
  let sliderRef = useRef(null)

  useEffect(() => {
    sliderRef.slickGoTo(slideIndex)
  }, [slideIndex])

  const onClick = (i: number) => {
    onChangeCurrentFile(i)
    setSlideIndex(i)
  }

  const settings = {
    afterChange: () => setUpdateCount(updateCount + 1),
    appendDots: dots => (
      <div
        style={{
          borderRadius: '10px',
          bottom: '25px',
          height: '8px',
          padding: '0',
          position: 'absolute',
          zIndex: '1',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    beforeChange: (current, next) => setSlideIndex(next),
    customPaging: (index: number) => {
      return <div className={clsx(s.dot, index === slideIndex && s.dotActive)}></div>
    },
    dots: true,
    infinite: false,
    nextArrow: <NextArrow onClick={onClick} />,
    prevArrow: <PrevArrow onClick={onClick} />,
    slidesToScroll: 1,
    slidesToShow: 1,
  }

  return (
		<div className={s.slideContainer}>
    	<Slider
      	{...settings}
      	ref={slider => {
        sliderRef = slider
      	}}
    	>
				{children}
    	</Slider>

		</div>
  )
}