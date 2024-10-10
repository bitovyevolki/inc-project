export interface IAvatar {
  createdAt: string // Формат даты
  fileSize: number
  height: number
  url: string
  width: number
}

export interface IUser {
  avatars: IAvatar[] // Массив объектов аватаров
  createdAt: string // Формат даты
  firstName: string
  id: number
  lastName: string
  userName: string
}

export interface IUsersResponse {
  items: IUser[] // Предполагается, что здесь будет один объект IUser
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
