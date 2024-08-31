export interface IDevice {
  deviceId: number
  ip: string
  lastActive: string
  browserName: string
  browserVersion: string
  deviceName: string
  osName: string
  osVersion: string
  deviceType: string
}

export interface IDevicesResponse {
  current: IDevice
  others: IDevice[]
}
