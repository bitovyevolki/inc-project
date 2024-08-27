import { IProfileAvatar } from '@/src/entities/profile/model/types/profile'

export type CreatePostArgs = {
  childrenMetadata?: ChildrenMetadatum[]
  description: string
}

export type ChildrenMetadatum = {
  uploadId: string
}

export type CreatePostResponse = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export type UploadImageArgs = {
  images: Image[]
}

export type GetPostsByUserArgs = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  userName: string
}
export type GetPostCommentsArgs = {
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetPublicPostsByUserArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  userId: number
}

export type GetPostByIdArgs = {
  postId: number
}
export type GetPostByIdResponse = Post

export type GetPostsByUserResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

export type Post = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export type Owner = {
  firstName: string
  lastName: string
}

export type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type UploadImageResponse = {
  images: Image[]
}

export type GetPostCommentsResponse = {
  items: Comment[]
  pageSize: number
  totalCount: number
}

export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type From = {
  avatars: IProfileAvatar[]
  id: number
  username: string
}

export type GetCommentAnswersArgs = {
  commentId: number
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type GetCommentAnswersResponse = {
  items: Answer[]
  pageSize: number
  totalCount: number
}

export type Answer = {
  commentId: number
  content: string
  createdAt: string
  from: From
  id: number
  isLiked: boolean
  likeCount: number
}

export type CreateCommentArgs = {
  content: string
  postId: number
}
export type CreateCommentResponse = Comment
