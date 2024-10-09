import { ITempProfilePhoto } from '../../model/types/profile'
import { getFormData } from './image'

const PHOTO_BOX_SIZE = 332

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

interface IArea {
  height: number
  width: number
  x: number
  y: number
}

interface IGetCroppedImage {
  photo: ITempProfilePhoto
  pixelCrop: IArea
  setFile: (file: FormData) => void
}

export async function getCroppedImg({ photo, pixelCrop, setFile }: IGetCroppedImage) {
  const image: HTMLImageElement = await createImage(photo.src)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  canvas.width = image.width
  canvas.height = image.height

  ctx.translate(image.width / 2, image.height / 2)

  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(
    -pixelCrop.x + (photo.width - PHOTO_BOX_SIZE) / 2,
    -pixelCrop.y + (photo.height - PHOTO_BOX_SIZE) / 2,
    pixelCrop.width,
    pixelCrop.height
  )

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(data, 0, 0)

  canvas.toBlob(function (blob) {
    setFile(getFormData(blob as Blob))
  })
}
