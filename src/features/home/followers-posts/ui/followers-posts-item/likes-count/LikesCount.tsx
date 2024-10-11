import avatar1 from '@/public/image/avatar1.png'
import avatar2 from '@/public/image/avatar2.png'
import avatar3 from '@/public/image/avatar3.png'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './LikesCount.module.scss'

interface IProps {
  likesCount: number
}

export const LikesCount = ({ likesCount }: IProps) => {
  return (
    <div className={s.likesBox}>
      <div className={s.images}>
        <Image alt={'likeOwner'} height={36} src={avatar1} width={36} />
        <Image alt={'likeOwner'} height={36} src={avatar2} width={36} />
        <Image alt={'likeOwner'} height={36} src={avatar3} width={36} />
      </div>
      <Typography className={s.count} variant={'body2'}>
        {likesCount}
      </Typography>
      <Typography variant={'subTitle2'}>{`"Like"`}</Typography>
    </div>
  )
}
