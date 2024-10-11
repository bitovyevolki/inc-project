import { IProfileAvatar } from '@/src/entities/profile/userProfile/model/types/profile'

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
  postId?: number
}
export type CreateCommentResponse = Comment
export type GetLastCreatedPostsArgs = Omit<GetPublicPostsByUserArgs, 'userId'>

export interface GetLastCreatedPostsResponse {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export interface GetLikesPostResponse {
  isLiked: boolean
  items: IGetLikeItem[]
  pageSize: number
  totalCount: number
}

export interface IGetLikeItem {
  avatars: [
    {
      createdAt: string
      fileSize: number
      height: number
      url: string
      width: number
    },
  ]
  createdAt: string
  id: number
  isFollowedBy: true
  isFollowing: true
  userId: number
  userName: string
}

export interface GetLikesPostArgs {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  postId: number
  search?: string
}

export interface DeletePostArgs {
  ownerId: number
  postId: number
}

export interface UpdatePostArgs {
  ownerId: string
  postId: string
  updatedPostData: Pick<Post, 'description'>
}

//ANSWERS
export interface CreateAnswerArgs {
  commentId: number
  content: string
  postId: number
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

//LIKES
type LikeType = 'DISLIKE' | 'LIKE'

export interface LikeAnswerArgs {
  answerId: number
  commentId: number
  likeStatus: LikeType
  postId: number
}

export interface LikeCommentArgs {
  commentId: number
  likeStatus: LikeType
  postId: number
}

export interface LikePostArgs {
  likeStatus: LikeType
  postId: number
}

export interface ProfileData {
  avatars?: { url: string }[] // массив с аватарами
  id: number
  userName: string
}

// followers

interface FollowAvatar {
  createdAt: string // ISO формат даты
  fileSize: number
  height: number
  url: string
  width: number
}

interface FollowItem {
  avatars: FollowAvatar[]
  createdAt: string // ISO формат даты
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export interface GetFollowResponse {
  items: FollowItem[] // Массив объектов типа Item
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

// Типизация основного объекта
export interface GetUserProfileResponse {
  aboutMe: string
  avatars: FollowAvatar[]
  city: string
  country: string
  dateOfBirth: string // ISO формат даты
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}
