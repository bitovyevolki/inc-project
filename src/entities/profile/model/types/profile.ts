export enum ProfileContentType {
  DEVICES = 'DEVICES',
  GENERAL = 'GENERAL',
  MANAGEMENT = 'MANAGEMENT',
  PAYMENTS = 'PAYMENTS',
}

export interface IProfile {
  aboutMe: string
  avatars: IProfileAvatars[]
  city: string
  country: string
  createdAt: Date
  dateOfBirth: Date
  firstName: string
  id: number
  lastName: string
  userName: string
  label?: string
}

export interface IProfileAvatars {
  createdAt: Date
  fileSize: number
  height: number
  url: string
  width: number
}
