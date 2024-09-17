import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import Image from 'next/image'

import s from './Filter.module.scss'

type Props = {
  files: any
}

export const Filter = ({ files }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <PhotoSlider>
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
      </div>
      <div>filters</div>
    </div>
  )
}
