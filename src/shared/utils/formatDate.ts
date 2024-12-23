import moment from 'moment'

import 'moment/locale/ru'

moment.locale('ru')

export const formatDate = (date: Date | string) => {
  const createdAt = moment(date).local()
  const dateDifferenceInHours = moment().diff(createdAt, 'hours')

  return dateDifferenceInHours >= 1 ? createdAt.format('D MMMM YYYY HH:mm') : createdAt.fromNow()
}

export const formatDateSmall = (date: Date | string) => {
  const createdAt = moment(date).local()
  const dateDifferenceInHours = moment().diff(createdAt, 'hours')

  return dateDifferenceInHours >= 1 ? createdAt.format('D.MM HH:mm') : createdAt.fromNow()
}
