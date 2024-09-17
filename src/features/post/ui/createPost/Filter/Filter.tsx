import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import Image from 'next/image'

import s from './Filter.module.scss'
import { SliderPostImages } from '../SliderPostImages/SliderPostImages'
import { useState } from 'react'

type Props = {
  files: any
}

export const Filter = ({ files }: Props) => {

	const [slideIndex, setSlideIndex] = useState(0)
	const onChangeCurrentFile = () => {
		console.log('new current')
	}
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
				   <SliderPostImages
          onChangeCurrentFile={onChangeCurrentFile}
          setSlideIndex={setSlideIndex}
          slideIndex={slideIndex}
        >
					{files.map((el, i) => {
        		return <Image alt={'Image'} key={i} src={el.url} className={s.currentImage} height={490} width={503} />
      		})}

				</SliderPostImages>
      </div>
      <div className={s.filters}>
				<p>1</p>
				<p>2</p>
				<p>3</p>
				<p>4</p>
				<p>5</p>
				<p>5</p>
				<p>5</p>
				<p>5</p>
				<p>5</p>
			</div>
    </div>
  )
}
