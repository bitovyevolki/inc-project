import React, { ReactNode } from 'react'
import Slider, { CustomArrowProps, Settings } from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './PhotoSlider.module.scss'
const NextArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props

  return <div className={`${className} ${s.customArrow} ${s.nextArrow}`} onClick={onClick} />
}

const PrevArrow = (props: CustomArrowProps) => {
  const { className, onClick } = props

  return <div className={`${className} ${s.customArrow} ${s.prevArrow}`} onClick={onClick} />
}

const defaultSliderSettings: Settings = {
  dots: true,
  dotsClass: `slick-dots ${s.dots}`,
  infinite: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: false,
}

type PhotoSliderProps = {
  children: ReactNode
  settings?: Settings
}

export const PhotoSlider = ({ children, settings = defaultSliderSettings }: PhotoSliderProps) => {
  return (
    <Slider {...settings} className={s.slider}>
      {children}
    </Slider>
  )
}
