export const checkAge = (date: Date) => {
  date = date ? new Date(date) : new Date()

  const today = new Date()

  return today.getFullYear() - date.getFullYear() > 13
}
