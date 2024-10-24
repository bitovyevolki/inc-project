import { ChangeEvent, useState } from 'react'

import { AvatarIcon } from '@/src/shared/assets/icons/avatar'
import { MicrophoneIcon } from '@/src/shared/assets/icons/microphone'
import { Button, Input } from '@bitovyevolki/ui-kit-int'

import s from './SendMessageForm.module.scss'

import { useSocket } from '../../lib/useSocket'
import { IMessageData, MessageSendRequest, MessageType, WBEventPath } from '../../model/messenger'

interface IProps {
  receiverId: number
}

export const SendMessageForm = ({ receiverId }: IProps) => {
  const socket = useSocket()

  const [messageData, setMessageData] = useState<IMessageData>({
    audio: null,
    image: null,
    text: '',
  })

  const [variantMessage, setVariantMessage] = useState<MessageType>('TEXT')

  const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget

    setMessageData(prev => ({ ...prev, text: value }))
  }

  const sendMessageHandler = () => {
    const data: MessageSendRequest = { message: messageData.text, receiverId }

    socket?.emit(WBEventPath.RECEIVE_MESSAGE, data)

    setMessageData({ audio: null, image: null, text: '' })
  }

  const isHasMessageInfo = messageData.audio || messageData.image || messageData.text

  return (
    <div className={s.form}>
      <div className={s.inputWrapper}>
        <Input
          className={s.input}
          onChange={changeTextHandler}
          placeholder={'Type Message'}
          value={messageData.text}
        />
      </div>
      {!isHasMessageInfo && (
        <>
          <MicrophoneIcon />
          <AvatarIcon height={24} width={24} />
        </>
      )}
      {messageData.text.length > 0 && (variantMessage === 'TEXT' || variantMessage === 'IMAGE') && (
        <Button className={s.button} onClick={sendMessageHandler} variant={'ghost'}>
          Send Message
        </Button>
      )}
    </div>
  )
}
