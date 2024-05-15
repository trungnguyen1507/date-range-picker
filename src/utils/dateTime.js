export const findNumberOfDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate()
}

export const findFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay()
}

export const isCurrentMonthDay = (year, month) => {
  const today = new Date()
  return today.getFullYear() === year && today.getMonth() === month
}
