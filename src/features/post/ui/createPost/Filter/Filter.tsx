import React, { useEffect, useMemo, useRef, useState } from 'react'

import { LinearCopy } from 'gl-react'
import { Surface } from 'gl-react-dom'
import NextImage from 'next/image'
import { useTranslations } from 'next-intl'

import s from './Filter.module.scss'

import { FileWithIdAndUrl } from '../CreatePost'
import { SliderPostImages } from '../SliderPostImages/SliderPostImages'
import { FilterItem } from './FilterItem'
import colorScales from './colorScales'
export { colorScales }

type Props = {
  files: FileWithIdAndUrl[]
  filtredFiles: FileWithIdAndUrl[]
  setFiltredFiles: (files: FileWithIdAndUrl[]) => void
}

export const Filter = ({ files, filtredFiles, setFiltredFiles }: Props) => {
  const t = useTranslations('CreatePost.filters')
  const [slideIndex, setSlideIndex] = useState(0)
  const [filter, setFilter] = useState('')
  const [imageSizes, setImageSizes] = useState({ height: 0, width: 0 })

  const filterList = [
    { brightness: 1, contrast: 1, name: t('original'), saturation: 1 },
    { brightness: 1.3, contrast: 1, name: t('bright'), saturation: 1 },
    { brightness: 1.1, contrast: 1.3, name: t('contrast'), saturation: 1 },
    { brightness: 1, contrast: 1, name: t('saturation'), saturation: 1.5 },
    { brightness: 1, contrast: 1, name: t('subdued'), saturation: 0.7 },
    { brightness: 1.5, contrast: 1, name: t('light'), saturation: 0.9 },
    { brightness: 0.7, contrast: 1.2, name: t('dark'), saturation: 1 },
    { brightness: 1, contrast: 1.1, name: t('soft-contrast'), saturation: 1 },
    { brightness: 1, contrast: 1, name: t('black-and-white'), saturation: 0 },
  ]

  const surfaceRefs = useRef<Array<any>>(filterList.map(() => React.createRef()))

  useEffect(() => {
    if (filtredFiles[slideIndex].file) {
      const url = filtredFiles[slideIndex].url
      const img = new Image()

      img.src = url

      img.onload = () => {
        setImageSizes({
          height: img.height,
          width: img.width,
        })
      }
    }
  }, [slideIndex, filtredFiles])

  const changeBright = (newFilter: string, surfaceRef: any) => {
    if (filter !== newFilter) {
      setFilter(newFilter)
      saveImageAsFile(surfaceRef)
    }
  }

  const saveImageAsFile = (surfaceRef: any) => {
    if (surfaceRef.current) {
      const canvas = surfaceRef.current.glView.canvas

      canvas.width = imageSizes.width
      canvas.height = imageSizes.height
      requestAnimationFrame(() => {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const newFile = new File([blob], 'filtered-image.png', { type: 'image/png' })
            const newUrl = URL.createObjectURL(newFile)
            const changedFile = { file: newFile, id: filtredFiles[slideIndex].id, url: newUrl }
            const newArrFiles = filtredFiles.map(el =>
              el.id === changedFile.id ? changedFile : el
            )

            setFiltredFiles(newArrFiles)
            setFilter('')
          }
        }, 'image/png')
      })
    }
  }

  const filtersMemo = useMemo(() => {
    return (
      <div className={s.filters}>
        {filterList.map((item, index) => (
          <div
            className={s.filter}
            key={index}
            onClick={() => changeBright(item.name, surfaceRefs.current[index])}
          >
            <Surface height={108} ref={surfaceRefs.current[index]} width={108}>
              <LinearCopy>
                <FilterItem
                  option={{
                    brightness: item.brightness,
                    contrast: item.contrast,
                    saturation: item.saturation,
                  }}
                >
                  {files[slideIndex].url}
                </FilterItem>
              </LinearCopy>
            </Surface>
            {item.name}
          </div>
        ))}
      </div>
    )
  }, [filterList, files, slideIndex, changeBright])

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {filtredFiles.length === 1 ? (
          <NextImage
            alt={'Image'}
            className={s.currentImage}
            height={503}
            src={filtredFiles[0].url}
            width={490}
          />
        ) : (
          <SliderPostImages setSlideIndex={setSlideIndex} slideIndex={slideIndex}>
            {filtredFiles.map((el, i) => {
              return (
                <NextImage
                  alt={'Image'}
                  className={s.currentImage}
                  height={503}
                  key={i}
                  src={el.url}
                  width={490}
                />
              )
            })}
          </SliderPostImages>
        )}
      </div>
      {filtersMemo}
    </div>
  )
}
