import { format, isToday, isYesterday } from 'date-fns'

const formatDate = date => {
  const dateObj = new Date(date)

  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, 'h:mm a')}`
  } else if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, 'h:mm a')}`
  } else {
    return format(dateObj, 'dd/MM/yyyy h:mm a')
  }
}

const formatDateToTime = date => {
  const dateObj = new Date(date)
  return format(dateObj, 'hh:mm a')
}

export { formatDate, formatDateToTime }
