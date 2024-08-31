import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { Button, Card, Typography } from '@bitovyevolki/ui-kit-int'
import { useGetDevicesQuery, useTerminateAllSessionsMutation } from '../api/profile.devices'
import s from './device.module.scss'
import { DeviceCard } from './DeviceCard'

export const Devices = () => {
  const { data, isLoading, error } = useGetDevicesQuery()
  const [terminateAllSessions] = useTerminateAllSessionsMutation()

  const handleTerminateSessions = () => {
    terminateAllSessions()
      .unwrap()
      .then(() => {
        console.log('All sessions terminated')
      })
      .catch(err => {
        console.error('Failed to terminate all sessions', err)
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
            <DeviceCard
              browserName={currentDevice.browserName}
              ip={currentDevice.ip}
              onTerminate={handleTerminateSessions}
              lastActive={currentDevice.lastActive}
            />
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
                  onTerminate={handleTerminateSessions}
                  lastActive={device.lastActive}
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
