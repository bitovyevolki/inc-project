import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { MicrophoneIcon } from '@/src/shared/assets/icons/microphone'
import { Button, Input } from '@bitovyevolki/ui-kit-int'

import s from './SendMessageForm.module.scss'

import { useSocket } from '../../lib/useSocket'
import { MessageSendRequest, WBEventPath } from '../../model/messenger'

interface IProps {
  receiverId: number
}

export const SendMessageForm = ({ receiverId }: IProps) => {
  const socket = useSocket()

  const inputElement = useRef<HTMLInputElement | null>(null)

  const [message, setMessage] = useState<string>('')
  const isHasMessage = message.trim().length > 0

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [receiverId])

  const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    setMessage(value)
  }

  const sendMessageHandler = () => {
    const data: MessageSendRequest = { message: message.trim(), receiverId }

    socket?.emit(WBEventPath.RECEIVE_MESSAGE, data)

    setMessage('')
  }

  function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && isHasMessage) {
      sendMessageHandler()
    }
  }

  return (
    <div className={s.form}>
      <div className={s.inputWrapper}>
        <Input
          autoFocus
          className={s.input}
          onChange={changeTextHandler}
          onKeyDown={onKeyPressHandler}
          placeholder={'Type Message'}
          ref={inputElement}
          value={message}
        />
      </div>
      {!isHasMessage && (
        <>
          <MicrophoneIcon />
          <AvatarIcon height={24} width={24} />
        </>
      )}
      {isHasMessage && (
        <Button className={s.button} onClick={sendMessageHandler} variant={'ghost'}>
          Send Message
        </Button>
      )}
    </div>
  )
}
