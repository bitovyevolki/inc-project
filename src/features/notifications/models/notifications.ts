export interface IMarkAsReadRequest {
  ids: number[]
}

export interface INotificationItem {
  id: number
  isRead: boolean
  message: string
  notifyAt: string
}

export interface INotificationsResponse {
  items: INotificationItem[]
  pageSize: number
  totalCount: number
}

export interface IErrorMessage {
  field: string
  message: string
}

export interface IErrorResponse {
  error: null | string
  messages: IErrorMessage[]
  statusCode: number
}
