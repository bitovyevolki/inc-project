export const checkAge = (date: Date) => {
  const today = new Date()

  return today.getFullYear() - date.getFullYear() > 13
}
