import { FormEvent, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import baseAvatar from '@/public/image/default-avatar.webp'
import { LikeIcon } from '@/src/shared/assets/icons/like'
import { formatDate } from '@/src/shared/utils/formatDate'
import { Button, Input, Typography } from '@bitovyevolki/ui-kit-int'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import 'moment/locale/ru'

import s from './CommentItem.module.scss'

import {
  useCreateAnswerMutation,
  useGetAnswersQuery,
  useUpdateAnswerLikeMutation,
} from '../../model/answers.service'
import { Answer, Comment as CommentType } from '../../model/posts.service.types'

type Props = {
  comment: CommentType
  handleCommentLikeStatus: (comment: CommentType) => void
}

export const CommentItem = ({ comment, handleCommentLikeStatus }: Props) => {
  const answerInputRef = useRef<HTMLInputElement>(null)
  const [answerInputValue, setAnswerInputValue] = useState('')
  const [isOpenAnswerInput, setIsOpenAnswerInput] = useState(false)
  const [isShowAnswers, setIsShowAnswers] = useState(false)
  const [answersPage, setAnswersPage] = useState(1)
  const [answers, setAnswers] = useState<Answer[]>([])

  const [totalCount, setTotalCount] = useState(0)

  const [createAnswer] = useCreateAnswerMutation()
  const [updateAnswerLike] = useUpdateAnswerLikeMutation()

  const { data: answersData, isLoading: isLoadingAnswers } = useGetAnswersQuery({
    commentId: comment.id,
    pageNumber: answersPage,
    postId: comment.postId,
  })

  useEffect(() => {
    if (isOpenAnswerInput && answerInputRef.current) {
      answerInputRef.current.focus()
    }
  }, [isOpenAnswerInput])

  useEffect(() => {
    if (answersData && answersData.items) {
      setAnswers(prev => {
        // Объединяем предыдущие и новые ответы
        const mergedAnswers = [...prev, ...answersData.items]

        // Фильтруем уникальные элементы по ID
        const uniqueAnswers = mergedAnswers.filter(
          (answer, index, self) => index === self.findIndex(a => a.id === answer.id)
        )

        return uniqueAnswers
      })
      setTotalCount(answersData.totalCount)
    }
  }, [answersData])

  const handleAnswerLikeStatus = (isLiked: boolean, answerId: number) => {
    const newLikeStatus = isLiked ? 'DISLIKE' : 'LIKE'

    updateAnswerLike({
      answerId,
      commentId: comment.id,
      likeStatus: newLikeStatus,
      postId: comment.postId,
    })
      .unwrap()
      .then(() => {
        const newAnswers = answers.map(el => {
          if (el.id === answerId) {
            return {
              ...el,
              isLiked: !isLiked,
              likeCount: isLiked ? el.likeCount - 1 : el.likeCount + 1,
            }
          } else {
            return el
          }
        })

        setAnswers(newAnswers)
      })
      .catch(error => {
        toast.error(`Failed change like status`)
      })
  }

  const handleCreateAnswer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createAnswer({
      commentId: comment.id,
      content: answerInputValue,
      postId: comment.postId,
    })
      .unwrap()
      .then(res => {
        setAnswerInputValue('')
        setIsOpenAnswerInput(false)
        setAnswers(prev => [res, ...prev])
        setTotalCount(prev => prev + 1)
      })
      .catch(error => {
        toast.error(`Failed change like status`)
      })
  }

  const onOpenAnswerInput = () => {
    setIsOpenAnswerInput(prevState => !prevState)
  }

  const commentItem = (item: Answer | CommentType) => {
    const likeColor = item.isLiked ? 'red' : 'white'
    const isAnswerType = (item: Answer | CommentType): boolean => {
      return (item as Answer).commentId !== undefined
    }
    const isAnswer = isAnswerType(item)

    const handlerLikeStatus = () => {
      if (isAnswer) {
        handleAnswerLikeStatus(item.isLiked, item.id)
      } else {
        handleCommentLikeStatus(item as CommentType)
      }
    }

    const dateComment = formatDate(item.createdAt)

    return (
      <div className={s.commentItem} key={item.id + item.createdAt}>
        <Image
          alt={'avatar'}
          className={s.avatar}
          height={36}
          src={item.from.avatars.length > 0 ? item.from.avatars[0].url : baseAvatar}
          width={36}
        />
        <div>
          <p>
            <Link className={s.linkUserProfile} href={`/profile/${item.from.id}`}>
              <Typography as={'span'} variant={'h3'}>
                {item.from.username}
              </Typography>
            </Link>
            <Typography as={'span'} variant={'body1'}>
              {'\u00A0'}
              {item.content}
            </Typography>
          </p>
          <div className={clsx(s.bottomBlock, s.colorGrey)}>
            <Typography variant={'caption'}>{dateComment}</Typography>
            {item.likeCount > 0 && (
              <Typography variant={'body2'}>Like: {item.likeCount}</Typography>
            )}
            {!isAnswer && (
              <Typography className={s.answerButton} onClick={onOpenAnswerInput} variant={'body2'}>
                Answer
              </Typography>
            )}
          </div>
        </div>
        <div className={s.like} onClick={() => handlerLikeStatus()}>
          <LikeIcon fill={likeColor} />
        </div>
      </div>
    )
  }

  return (
    <>
      {commentItem(comment)}
      <div className={s.answersBlock}>
        {answers && answers.length !== 0 && (
          <div className={s.hideShowAnswersButton}>
            <div className={s.line}></div>
            {isShowAnswers ? (
              <Typography onClick={() => setIsShowAnswers(false)} variant={'caption'}>
                {'\u00A0'}Hide Answers <span>{`(${totalCount})`}</span>
              </Typography>
            ) : (
              <Typography onClick={() => setIsShowAnswers(true)} variant={'caption'}>
                {'\u00A0'}Show Answers <span>{`(${totalCount})`}</span>
              </Typography>
            )}
          </div>
        )}

        {isShowAnswers && (
          <>
            {answers.map(el => {
              return commentItem(el)
            })}
            {answersData && answersData.pageSize * answersPage < answersData.totalCount && (
              <div
                className={s.hideShowAnswersButton}
                onClick={() => setAnswersPage(prev => prev + 1)}
              >
                <div className={s.line}></div>{' '}
                <Typography variant={'caption'}>
                  {'\u00A0'}Show more{'\u00A0'}
                </Typography>{' '}
                <div className={s.line}></div>
              </div>
            )}
          </>
        )}
        {isOpenAnswerInput && (
          <form className={s.inputBlock} onSubmit={e => handleCreateAnswer(e)}>
            <Input
              autoComplete={'off'}
              errorMessage={
                answerInputValue.length > 300 ? 'Answer must not exceed 300 characters.' : ''
              }
              inputMode={'text'}
              name={'leaveComment'}
              onChange={e => {
                setAnswerInputValue(e.currentTarget.value)
              }}
              placeholder={'Add an answer...'}
              ref={answerInputRef}
              rootClassName={s.customInput}
              value={answerInputValue}
            />
            <Button
              disabled={answerInputValue.length === 0 || answerInputValue.length > 300}
              type={'submit'}
              variant={'ghost'}
            >
              Send
            </Button>
          </form>
        )}
      </div>
    </>
  )
}
