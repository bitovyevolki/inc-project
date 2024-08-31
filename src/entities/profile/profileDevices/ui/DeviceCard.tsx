import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { Button, Card, Typography } from '@bitovyevolki/ui-kit-int'
import s from './device.module.scss'

interface DeviceCardProps {
  browserName: string
  ip: string
  onTerminate: () => void
  lastActive: string
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ browserName, ip, lastActive }) => {
  return (
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
            <GoogleIcon />
          </div>
          <div className={s.textBody}>
            <Typography variant={'body1'}>{browserName}</Typography>
            <Typography variant={'caption'}>{`IP: ${ip}`}</Typography>
            <Typography variant={'caption'}>{lastActive}</Typography>
          </div>
        </div>
        <div>logOut</div>
      </div>
    </Card>
  )
}
