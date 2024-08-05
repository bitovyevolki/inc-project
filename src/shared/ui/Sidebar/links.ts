import { RouterPaths } from '../../config/router.paths'
import {
  CreateIcon,
  FavoritesIcon,
  HomeIcon,
  MessengerIcon,
  MyProfileIcon,
  SearchIcon,
  StatisticsIcon,
} from './Icons'

interface ILink {
  path: string
  svg: () => JSX.Element
  title: string
}

export const sidebarLinks: ILink[] = [
  { path: RouterPaths.HOME, svg: HomeIcon, title: 'Home' },
  { path: RouterPaths.HOME, svg: CreateIcon, title: 'Create' },
  { path: RouterPaths.HOME, svg: MyProfileIcon, title: 'My Profile' },
  { path: RouterPaths.HOME, svg: MessengerIcon, title: 'Messenger' },
  { path: RouterPaths.HOME, svg: SearchIcon, title: 'Search' },
  { path: RouterPaths.HOME, svg: StatisticsIcon, title: 'Statistics' },
  { path: RouterPaths.HOME, svg: FavoritesIcon, title: 'Favorites' },
]
