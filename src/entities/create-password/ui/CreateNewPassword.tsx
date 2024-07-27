import React from 'react'
import { Card, Input, Button } from '@bitovyevolki/ui-kit-int'
import s from './CreateNewPassword.module.scss'

export const CreateNewPassword = () => {
  return (
    <div className={s.wrapper}>
      <Card className={s.card}>
        <h3 className={s.text}>Create New Password</h3>
        <form className={s.form}>
          <Input
            onChange={() => {}}
            placeholder="New password"
            value="***************"
            variant="password"
          />
          <div className={s.hr}></div>
          <Input
            onChange={() => {}}
            placeholder="Password confirmation"
            value="***************"
            variant="password"
          />
          <div className={s.hr2}></div>
          <Button as="button" fullWidth type="" variant="primary">
            Create password
          </Button>
        </form>
      </Card>
    </div>
  )
}
