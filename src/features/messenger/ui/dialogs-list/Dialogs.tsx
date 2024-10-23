import s from './dialogs.module.scss'

import { DialogItem } from '../dialog-chat/DialogItem'

type DialogProps = {
  activeChat: boolean
}

export const Dialogs = ({ activeChat }: DialogProps) => {
  return (
    <div className={s.wrapper}>
      <DialogItem activeChat={activeChat} />
      <DialogItem activeChat={activeChat} />
      <DialogItem activeChat={activeChat} />
    </div>
  )
}
