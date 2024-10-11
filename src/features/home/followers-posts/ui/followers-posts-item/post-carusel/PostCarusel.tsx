import { PhotoSlider } from '@/src/shared/ui/PhotoSlider/PhotoSlider'
import Image from 'next/image'

import { IImage } from '../../../model/types'

interface IProps {
  images: IImage[]
}

export const PostCarusel = ({ images }: IProps) => {
  return (
    <>
      {images.length > 1 && (
        <PhotoSlider>
          {images.map((image, index) => (
            <Image
              alt={`post.image ${index}`}
              height={500}
              key={image.uploadId}
              src={image.url}
              width={500}
            />
          ))}
        </PhotoSlider>
      )}
      {images.length === 1 && (
        <Image alt={'post image'} height={500} src={images[0].url} width={500} />
      )}
    </>
  )
}
