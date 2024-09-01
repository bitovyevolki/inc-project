import { GoogleIcon } from '@/src/shared/assets/icons/google'
import { LogoutIcon } from '@/src/shared/ui/Sidebar/Icons'
import { Button, Card, Typography } from '@bitovyevolki/ui-kit-int'
import s from './device.module.scss'

interface DeviceCardProps {
  browserName: string
  ip: string
  onTerminate: () => void
  lastActive: string
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  browserName,
  ip,
  lastActive,
  onTerminate,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }
  const formattedDate = formatDate(lastActive)

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
            <Typography variant={'caption'}>
              <Typography variant={'caption'}>Last visit: {formattedDate}</Typography>
            </Typography>
          </div>
        </div>
        <div className={s.buttonLogout}>
          <LogoutIcon />
          <Button variant={'ghost'} onClick={onTerminate}>
            <Typography as={'p'} variant={'h4'}>
              Log Out
            </Typography>
          </Button>
        </div>
      </div>
    </Card>
  )
}
