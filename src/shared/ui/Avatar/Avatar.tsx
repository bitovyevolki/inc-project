import Image from 'next/image'

import s from './Avatar.module.scss'

type Props = {
  height: number
  url: string | undefined
  userName: string
  width: number
}

export const Avatar = ({ height, url, userName, width }: Props) => {
  return (
    <>
      {url ? (
        <Image alt={'avatar'} className={s.avatar} height={height} src={url} width={width} />
      ) : (
        <div className={s.avatar} style={{ height: `${height}px`, width: `${width}px` }}>
          {userName.slice(0, 2).toUpperCase()}
        </div>
      )}
    </>
  )
}
