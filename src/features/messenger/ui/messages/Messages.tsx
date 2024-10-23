import { Button } from '@bitovyevolki/ui-kit-int'

import s from './Messages.module.scss'

import { SendMessageForm } from '../send-message-form/SendMessageForm'

type MessagesProps = {
  activeChat: boolean
}

export const Messages = ({ activeChat }: MessagesProps) => {
  return (
    <>
      {activeChat ? (
        <div className={s.wrapper}>active chat with messages</div>
      ) : (
        <div className={s.wrapper}>
          <Button variant={'secondary'}>Choose who you would like to talk to</Button>
        </div>
      )}
      <SendMessageForm />
    </>
  )
}
