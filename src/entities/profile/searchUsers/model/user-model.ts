export interface IAvatar {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export interface IUser {
  avatars: IAvatar[]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

export interface IUsersResponse {
  items: IUser[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type GetUsersByNameArgs = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search: string
}
