export enum ProfileContentType {
  DEVICES = 'DEVICES',
  GENERAL = 'GENERAL',
  MANAGEMENT = 'MANAGEMENT',
  PAYMENTS = 'PAYMENTS',
}

export type GetProfileByIdArgs = {
  profileId: number | undefined
}

export interface IProfile {
  aboutMe: string
  avatars: IProfileAvatar[]
  city: string
  country: string
  createdAt: Date
  dateOfBirth: Date | null
  firstName: string
  id: number
  lastName: string
  userName: string
}

export interface IProfileAvatar {
  createdAt: Date
  fileSize: number
  height: number
  url: string
  width: number
}

export type UpdateGeneralProfileArgs = Omit<IProfile, 'avatars' | 'createdAt' | 'id'>

export interface ITempProfilePhoto {
  height: number
  src: string
  width: number
}
