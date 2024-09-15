export interface IMarkAsReadRequest {
  ids: number[]
}

export interface INotificationItem {
  id: number
  message: string
  isRead: boolean
  notifyAt: string
}

export interface INotificationsResponse {
  pageSize: number
  totalCount: number
  items: INotificationItem[]
}

export interface IErrorMessage {
  message: string
  field: string
}

export interface IErrorResponse {
  statusCode: number
  messages: IErrorMessage[]
  error: string | null
}
