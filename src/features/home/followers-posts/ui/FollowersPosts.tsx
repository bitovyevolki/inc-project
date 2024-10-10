import s from './FollowersPosts.module.scss'

import { useGetFollowersPostsQuery } from '../api/followers-posts.service'
import { IFollowersPostsItem } from '../model/types'
import { FollowersPostsItem } from './followers-posts-item/FollowersPostsItem'

const mockFollowers: IFollowersPostsItem[] = [
  {
    avatarOwner: '',
    createdAt: new Date(),
    description:
      'a,jkadadilawjdilwjdijdiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    id: 1,
    images: [
      {
        createdAt: new Date(),
        fileSize: 10000,
        height: 300,
        uploadId: '3',
        url: '',
        width: 300,
      },
      {
        createdAt: new Date(),
        fileSize: 10000,
        height: 300,
        uploadId: '3',
        url: '',
        width: 300,
      },
      {
        createdAt: new Date(),
        fileSize: 10000,
        height: 300,
        uploadId: '3',
        url: '',
        width: 300,
      },
    ],
    isLiked: true,
    likesCount: 20,
    location: '',
    owner: {
      firstName: 'dssd',
      lastName: 'ddkmd',
    },
    ownerId: 30,
    updatedAt: new Date(),
    userName: 'sdsd',
  },
  {
    avatarOwner: '',
    createdAt: new Date(),
    description: 'a,jkadadilawjdilwjdijdi',
    id: 1,
    images: [
      {
        createdAt: new Date(),
        fileSize: 10000,
        height: 300,
        uploadId: '3',
        url: '',
        width: 300,
      },
      {
        createdAt: new Date(),
        fileSize: 10000,
        height: 300,
        uploadId: '3',
        url: '',
        width: 300,
      },
      {
        createdAt: new Date(),
        fileSize: 10000,
        height: 300,
        uploadId: '3',
        url: '',
        width: 300,
      },
    ],
    isLiked: true,
    likesCount: 20,
    location: '',
    owner: {
      firstName: 'dssd',
      lastName: 'ddkmd',
    },
    ownerId: 30,
    updatedAt: new Date(),
    userName: 'sdsd',
  },
  {
    avatarOwner: '',
    createdAt: new Date(),
    description: 'a,jkadadilawjdilwjdijdi',
    id: 1,
    images: [
      {
        createdAt: new Date(),
        fileSize: 10000,
        height: 300,
        uploadId: '3',
        url: '',
        width: 300,
      },
    ],
    isLiked: true,
    likesCount: 20,
    location: '',
    owner: {
      firstName: 'dssd',
      lastName: 'ddkmd',
    },
    ownerId: 30,
    updatedAt: new Date(),
    userName: 'sdsd',
  },
]

export const FollowersPosts = () => {
  const { data, error, isLoading } = useGetFollowersPostsQuery({})

  // if (data?.items.length === 0) {
  //   return <Typography variant={'h2'}>У ваших пользователей еще нет публикаций</Typography>
  // }

  return (
    <div className={s.posts}>
      {mockFollowers.map(p => (
        <FollowersPostsItem item={p} key={p.id + '-' + Math.random()} />
      ))}
    </div>
  )
}
