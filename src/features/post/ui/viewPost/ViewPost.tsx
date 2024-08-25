import * as React from 'react'

import { ProfileIntro } from '@/src/features/post/ui'
import { Card } from '@bitovyevolki/ui-kit-int'

import s from '@/src/features/post/ui/showPosts/showPosts.module.scss'

type Props = {
  postId: number
}
export const ViewPost = ({ postId }: Props) => {
  return (
    <Card className={s.modalBox}>
      <div className={s.photoBox}>booobbb</div>
      <div className={s.textBox}>
        <div className={s.postHeader}>
          <ProfileIntro avatarSize={} avatars={} userName={} />
        </div>
        <div className={s.postAndComments}>
          <div className={s.post}>Bla-blaa</div>
          <div className={s.comments}>Ha-ha-ha</div>
        </div>
        <div className={s.reactToPost}>How wonderfull!!</div>
      </div>
    </Card>
  )
}
