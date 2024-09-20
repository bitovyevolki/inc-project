import { useEffect, useRef, useState } from 'react'

import { LinearCopy } from 'gl-react'
import { Surface } from 'gl-react-dom'
import Image from 'next/image'

import s from './Filter.module.scss'

import { FileWithIdAndUrl } from '../CreatePost'
import { SliderPostImages } from '../SliderPostImages/SliderPostImages'
import { FilterItem } from './FilterItem'
import colorScales from './colorScales'
export { colorScales }

type Props = {
  files: FileWithIdAndUrl[]
}

export const Filter = ({ files }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [filter, setFilter] = useState('')
  const [filtredFiles, setFiltredFiles] = useState<FileWithIdAndUrl[]>(files)
  const [file, setFile] = useState<File | null>(null)

  const surfaceRef1 = useRef<any>(null)
  const surfaceRef2 = useRef<any>(null)

  const onChangeCurrentFile = (index: number) => {
    console.log('new current')
    console.log(files[index].url)
  }

  const changeColor = (index: number, surfaceRef: any) => {
    setFilter(Object.keys(colorScales)[index])
    saveImageAsFile(surfaceRef)
  }

  const saveImageAsFile = (surfaceRef: any) => {
    if (surfaceRef.current) {
      const canvas = surfaceRef.current.glView.canvas

      // Используем requestAnimationFrame, чтобы убедиться, что рендеринг завершён
      requestAnimationFrame(() => {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            console.log(blob)
            const newFile = new File([blob], 'filtered-image.png', { type: 'image/png' })
            const newUrl = URL.createObjectURL(newFile)
            const changedFile = { file: newFile, id: files[slideIndex].id, url: newUrl }
            const newArrFiles = filtredFiles.map(el =>
              el.id === changedFile.id ? changedFile : el
            )

            console.log(changedFile)
            console.log(filtredFiles)
            setFiltredFiles(newArrFiles)
          }
        }, 'image/png')
      })
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <SliderPostImages
          onChangeCurrentFile={onChangeCurrentFile}
          setSlideIndex={setSlideIndex}
          slideIndex={slideIndex}
        >
          {filtredFiles.map((el, i) => {
            return (
              <Image
                alt={'Image'}
                className={s.currentImage}
                height={490}
                key={i}
                src={el.url}
                width={503}
              />
            )
          })}
        </SliderPostImages>
      </div>
      <div className={s.filters}>
        <div onClick={() => changeColor(0, surfaceRef1)} style={{ border: '1px solid red' }}>
          <Surface height={50} ref={surfaceRef1} width={70}>
            {/* LinearCopy ensures the filter is applied before rendering to the screen */}
            <LinearCopy>
              <FilterItem colorScale={colorScales['Accent']} interpolation={'linear'}>
                {files[slideIndex].url}
              </FilterItem>
            </LinearCopy>
          </Surface>
        </div>
        <div onClick={() => changeColor(2, surfaceRef2)} style={{ border: '1px solid red' }}>
          <Surface height={50} ref={surfaceRef2} width={70}>
            {/* LinearCopy ensures the filter is applied before rendering to the screen */}
            <LinearCopy>
              <FilterItem colorScale={colorScales['monochrome']} interpolation={'linear'}>
                {files[slideIndex].url}
              </FilterItem>
            </LinearCopy>
          </Surface>
        </div>
      </div>
    </div>
  )
}
