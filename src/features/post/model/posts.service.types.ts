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

export interface UploadImageResponse {
  images: Image[]
}
