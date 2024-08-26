import * as React from 'react'

import { IProfile } from '@/src/entities/profile/model/types/profile'
import { Post } from '@/src/features/post/model/posts.service.types'
import { ProfileIntro } from '@/src/features/post/ui'
import { Button, Card, Input } from '@bitovyevolki/ui-kit-int'

import s from './viewPost.module.scss'

type Props = {
  avatars?: IProfile['avatars']
  imageUrl?: string
  post: Post
  userName: string
}
export const ViewPost = ({ avatars, imageUrl, post, userName }: Props) => {
  return (
    <Card className={s.modalBox}>
      <div className={s.photoBox}>
        <img alt={'Post image'} src={imageUrl} width={490} />
      </div>
      <div className={s.textBox}>
        <div className={s.postHeader}>
          <ProfileIntro avatarSize={'small'} avatars={avatars} userName={userName} />
        </div>
        <div className={s.postAndComments}>
          <div className={s.post}>{post?.description}</div>
          <div className={s.comments}>Ha-ha-ha</div>
        </div>
        <div className={s.reactToPost}>
          <form onSubmit={() => {}}>
            <Input inputMode={'text'} label={'Leave a comment'} name={'leaveComment'} />
            <Button className={s.publishButton} variant={'outlined'}>
              Publish
            </Button>
          </form>
        </div>
      </div>
    </Card>
  )
}
