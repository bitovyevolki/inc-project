import * as React from 'react'
import { FormEvent } from 'react'

import { IProfile } from '@/src/entities/profile/model/types/profile'
import {
  useCreateCommentToPostMutation,
  useGetPostCommentsQuery,
  useLazyGetPostCommentsQuery,
} from '@/src/features/post/model/posts.service'
import { Post } from '@/src/features/post/model/posts.service.types'
import { ProfileIntro } from '@/src/features/post/ui'
import { BookmarkIcon } from '@/src/shared/assets/icons/bookmark'
import { HeartIcon } from '@/src/shared/assets/icons/heart'
import { PaperPlaneIcon } from '@/src/shared/assets/icons/paper-plane'
import { Button, Card, Input, Typography } from '@bitovyevolki/ui-kit-int'

import s from './viewPost.module.scss'

type Props = {
  avatars?: IProfile['avatars']
  imageUrl?: string
  post?: Post
  userName: string
}
export const ViewPost = ({ avatars, imageUrl, post, userName }: Props) => {
  const { data: commentsData, isLoading: loadingComments } = useGetPostCommentsQuery({
    postId: post?.id,
  })
  const [updateComments, { data: moreComments }] = useLazyGetPostCommentsQuery()
  const [createComment, { isError, isLoading }] = useCreateCommentToPostMutation()

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString() + `?postId=${post?.id}`)
  }

  if (!commentsData) {
    return
  }
  console.log('commentsData', commentsData)

  const commentsToShow = commentsData.items.map(comment => {
    return (
      <div key={comment.id}>
        <ProfileIntro
          avatarSize={'small'}
          avatars={comment.from.avatars}
          userName={comment.from.username}
        />
        <Typography as={'p'} variant={'body1'}>
          {comment.content}
        </Typography>
      </div>
    )
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)
    const content = JSON.stringify(data.leaveComment)

    createComment({ content, postId: post?.id })
      .unwrap()
      .then(comment => {
        updateComments({ postId: post?.id })
      })
  }

  return (
    <Card className={s.modalBox}>
      <div className={s.photoBox}>
        <img alt={'Post image'} src={imageUrl} />
      </div>
      <div className={s.textBox}>
        <div className={s.postHeader}>
          <ProfileIntro avatarSize={'small'} avatars={avatars} userName={userName} />
        </div>
        <div className={s.post}>
          <span>{post?.userName}</span>
          <span className={s.post}>{post?.description}</span>
        </div>
        <div>
          <div className={s.comments}>{commentsToShow} </div>
        </div>
        <div className={s.reactToPost}>
          <div className={s.reactionsBox}>
            <div className={s.iconsBox}>
              <BookmarkIcon />
              <HeartIcon />
              <span onClick={copyUrlToClipboard}>
                <PaperPlaneIcon />
              </span>
            </div>
          </div>
          <form className={s.leaveComment} onSubmit={handleSubmit}>
            <Input inputMode={'text'} name={'leaveComment'} placeholder={'Add a comment...'} />
            <Button type={'submit'} variant={'ghost'}>
              Publish
            </Button>
          </form>
        </div>
      </div>
    </Card>
  )
}
