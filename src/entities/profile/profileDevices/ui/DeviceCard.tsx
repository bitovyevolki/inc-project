import React from 'react'

import { DesktopIcon } from '@/src/shared/assets/icons/desktop'
import { Phone } from '@/src/shared/assets/icons/phone'
import { LogoutIcon } from '@/src/shared/ui/Sidebar/Icons'
import { Button, Card, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './device.module.scss'

interface DeviceCardProps {
  browserName: string
  deviceType: 'desktop' | 'mobile'
  ip: string
  lastActive: string
  onTerminate: () => void
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  browserName,
  deviceType,
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
  const t = useTranslations('Devices')
  const formattedDate = formatDate(lastActive)

  const DeviceIcon = ({ deviceType }: { deviceType: 'desktop' | 'mobile' }) => {
    switch (deviceType) {
      case 'mobile':
        return <Phone />
      case 'desktop':
        return <DesktopIcon />
      default:
        return <Phone />
    }
  }

  return (
    <Card style={{ height: '120px', padding: '12px', width: '972px' }}>
      <div className={s.wrap}>
        <div className={s.contentWrap}>
          <div className={s.icon}>
            <DeviceIcon deviceType={deviceType} />
          </div>
          <div className={s.textBody}>
            <Typography variant={'body1'}>{browserName}</Typography>
            <Typography variant={'caption'}>{`IP: ${ip}`}</Typography>
            <Typography variant={'caption'}>{`Last visit: ${formattedDate}`}</Typography>
          </div>
        </div>
        <div className={s.buttonLogout}>
          <LogoutIcon />
          <Button onClick={onTerminate} variant={'ghost'}>
            <Typography as={'p'} variant={'h4'}>
              {t('logout')}
            </Typography>
          </Button>
        </div>
      </div>
    </Card>
  )
}
