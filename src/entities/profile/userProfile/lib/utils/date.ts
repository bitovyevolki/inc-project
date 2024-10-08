export const checkAge = (date: Date) => {
  const today = new Date()

  return today.getFullYear() - date.getFullYear() > 13
}

export const getDateViewWithDots = (date: Date): string => {
  if (!date) {
    return ''
  }

  date = new Date(date)

  return `${getCorrectDateNumber(date.getDate())}.${getCorrectDateNumber(
    date.getMonth() + 1
  )}.${date.getFullYear()}`
}

const getCorrectDateNumber = (num: number) => {
  return num < 10 ? `0${num}` : num
}
