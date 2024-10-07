import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import { IUser } from '../../model/user-model'
import s from './searchItem.module.scss'

interface SearchItemProps {
  user: IUser
}

export const SearchItem = ({ user }: SearchItemProps) => {
  return (
    <div className={s.wrap}>
      <div>
        <Image alt={''} className={s.avatar} height={30} src={user.avatars?.[0]?.url} width={30} />
      </div>
      <div>
        <div className={s.nameField}>
          <Typography variant={'link1'}>{user.userName}</Typography>
        </div>
        <div>
          <Typography variant={'subTitle2'}>{`${user.firstName} ${user.lastName}`}</Typography>
        </div>
      </div>
    </div>
  )
}
