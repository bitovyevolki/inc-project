export interface IAvatar {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string // Формат даты
}

export interface IUser {
  id: number
  userName: string
  firstName: string
  lastName: string
  avatars: IAvatar[] // Массив объектов аватаров
  createdAt: string // Формат даты
}

export interface IUsersResponse {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor: number
  items: IUser // Предполагается, что здесь будет один объект IUser
}
