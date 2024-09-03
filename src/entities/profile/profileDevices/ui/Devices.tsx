import { Chrome } from '@/src/shared/assets/icons/chrome'
import { Button, Card, Typography } from '@bitovyevolki/ui-kit-int'
import { toast } from 'react-toastify'
import {
  useDeleteDeviceByIdMutation,
  useGetDevicesQuery,
  useTerminateAllSessionsMutation,
} from '../api/profile.devices'
import s from './device.module.scss'
import { DeviceCard } from './DeviceCard'

export const Devices = () => {
  const { data, isLoading, error, refetch } = useGetDevicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const [terminateAllSessions] = useTerminateAllSessionsMutation()
  const [deleteDeviceById] = useDeleteDeviceByIdMutation()

  const handleTerminateSessions = () => {
    terminateAllSessions()
      .unwrap()
      .then(() => {
        toast.success('All sessions terminated!', { position: 'top-right' })
        refetch()
      })
      .catch(error => {
        toast.error('Failed to terminate all sessions!', { position: 'top-right' })
      })
  }

  const handleTerminateDevice = (deviceId: number) => {
    deleteDeviceById({ deviceId })
      .unwrap()
      .then(() => {
        toast.success(`Device with ID ${deviceId} logged out`, { position: 'top-right' })
      })
      .catch(error => {
        toast.error('Failed to log out device!', { position: 'top-right' })
      })
  }

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>
  }

  if (error || !data) {
    return <Typography variant="body1">Failed to load devices</Typography>
  }

  const currentDevice = data.current
  const otherDevices = data.others || []

  return (
    <div>
      <div className={s.text}>
        <Typography variant={'h3'}>{'Current device'}</Typography>
      </div>
      <div className={s.card}>
        {currentDevice ? (
          <div className={s.curWrap}>
            <Card
              style={{
                height: '120px',
                padding: '12px',
                width: '972px',
              }}
            >
              <div className={s.wrap}>
                <div className={s.contentWrap}>
                  <div className={s.icon}>
                    <Chrome />
                  </div>
                  <div className={s.textBody}>
                    <Typography variant={'body1'}>{data.current.browserName}</Typography>
                    <Typography variant={'caption'}>{`IP: ${data.current.ip}`}</Typography>
                  </div>
                </div>
              </div>
            </Card>
            <div className={s.btn}>
              <Button variant={'outlined'} onClick={handleTerminateSessions}>
                Terminate all other session
              </Button>
            </div>
          </div>
        ) : (
          <Typography variant="body1">No current device data available</Typography>
        )}
      </div>
      <div className={s.activeWrap}>
        <div className={s.activeSession}>
          <Typography variant={'h3'}>{'Active sessions'}</Typography>
        </div>
        <div>
          {otherDevices.length > 0 ? (
            otherDevices.map(device => (
              <div key={device.deviceId} className={s.deviceCards}>
                <DeviceCard
                  browserName={device.browserName}
                  ip={device.ip}
                  onTerminate={() => handleTerminateDevice(device.deviceId)}
                  lastActive={device.lastActive}
                  deviceType={device.deviceType as 'mobile' | 'desktop'}
                />
              </div>
            ))
          ) : (
            <div className={s.bodyWrap}>
              <Typography variant={'h1'}>
                {'You have not yet logged in from other devices'}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
