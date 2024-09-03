export interface IDevice {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

export interface IDevicesResponse {
  current: IDevice
  others: IDevice[]
}
