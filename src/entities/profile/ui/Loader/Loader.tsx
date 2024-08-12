import s from './Loader.module.scss'

interface IProps {
  variant: 'large' | 'small'
}

export const Loader = ({ variant }: IProps) => {
  return <span className={`${s.loader} ${variant === 'large' ? s.large : s.small}`}></span>
}
