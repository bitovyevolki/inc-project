export interface IMessageData {
  audio: null | string
  image: null | string
  text: string
}

export type MessageType = 'IMAGE' | 'TEXT' | 'VOICE'
export type MessageStatus = 'READ' | 'RECEIVED' | 'SENT'

export enum WBEventPath {
  ERROR = 'error',
  MESSAGE_DELETED = 'message-deleted',
  MESSAGE_SENT = 'message-sent',
  NOTIFICATIONS = 'notifications',
  RECEIVE_MESSAGE = 'receive-message',
  UPDATE_MESSAGE = 'update-message',
}

export type MessageSendRequest = {
  message: string
  receiverId: number
}

export type MessageViewModel = {
  createdAt: Date
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: Date
}

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type DialogItemType = {
  avatars: [] | Avatar[]
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
  userName: string
}

export type DialogListResponse = {
  items: DialogItemType[]
  pageSize: number
  totalCount: number
}

export type GetDialogsListArgs = {
  cursor?: number
  pageSize?: number
  searchName?: string
}

export type MessageItemType = {
  createdAt: string
  id: number
  messageText: string
  messageType: MessageType
  ownerId: number
  receiverId: number
  status: MessageStatus
  updatedAt: string
}

export type GetMessagesResponse = {
  items: MessageItemType[]
  pageSize: number
  totalCount: number
}

export type GetMessagesByIdArgs = {
  dialoguePartnerId: number
} & GetDialogsListArgs
