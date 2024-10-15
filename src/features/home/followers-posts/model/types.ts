export interface IGetFollowersPostsResponse {
  items: IFollowersPostsItem[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export interface IFollowersPostsItem {
  avatarOwner: string
  createdAt: Date
  description: string
  id: number
  images: IImage[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: IPostOwner
  ownerId: number
  updatedAt: Date
  userName: string
}

interface IPostOwner {
  firstName: string
  lastName: string
}

export interface IImage {
  createdAt: Date
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type GetFollowersPostsArgs = {
  endCursorPostId?: number
  pageNumber?: number
  pageSize?: number
}
