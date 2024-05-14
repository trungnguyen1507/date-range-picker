import { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import './Calendar.css'

const Calendar = ({ date, onPrevMonth, onNextMonth, selectedDateRange, onDateClick, mode }) => {
  const [currentDate, setCurrentDate] = useState(date || new Date())
  const [nextMonthDate, setNextMonthDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  useEffect(() => {
    setCurrentDate(date || new Date())
    setNextMonthDate(new Date(date.getFullYear(), date.getMonth() + 1))
  }, [date])

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }
  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const generateCalendar = (currentDate) => {
    const weeks = []
    let currentWeek = []

    for (let i = 0; i < firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()); i++) {
      currentWeek.push(null)
    }

    for (let i = 1; i <= daysInMonth(currentDate.getFullYear(), currentDate.getMonth()); i++) {
      currentWeek.push(i)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      weeks.push(currentWeek)
    }

    return weeks
  }

  const handlePrevMonth = () => {
    onPrevMonth()
  }

  const handleNextMonth = () => {
    onNextMonth()
  }

  const handleDayClick = (day, currentDate) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    onDateClick(selectedDate)
  }

  const isSameDate = (date1, date2) => {
    return (
      date1?.getFullYear() === date2?.getFullYear() &&
      date1?.getMonth() === date2?.getMonth() &&
      date1?.getDate() === date2?.getDate()
    )
  }

  const isCurrentMonthDay = (year, month) => {
    const today = new Date()
    return today.getFullYear() === year && today.getMonth() === month
  }

  const isInRange = (day, currentDate) => {
    if (!selectedDateRange.start || !selectedDateRange.end) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date >= selectedDateRange.start && date <= selectedDateRange.end
  }

  const renderCalendarTable = (currentDate) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth())
    const weeks = generateCalendar(currentDate)

    return (
      <table className='calendar-table'>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day, index) =>
                day === null ? (
                  <td key={index}></td>
                ) : (
                  <td
                    key={index}
                    className={
                      isSameDate(selectedDateRange.start, new Date(date.getFullYear(), date.getMonth(), day))
                        ? 'day-elem start-day'
                        : isSameDate(selectedDateRange.end, new Date(date.getFullYear(), date.getMonth(), day))
                        ? 'day-elem end-day'
                        : isInRange(day, currentDate) &&
                          isCurrentMonthDay(currentDate.getFullYear(), currentDate.getMonth()) &&
                          new Date().getDate() === day
                        ? 'day-elem current-day in-range'
                        : isCurrentMonthDay(currentDate.getFullYear(), currentDate.getMonth()) &&
                          new Date().getDate() === day
                        ? 'day-elem current-day'
                        : isInRange(day, currentDate)
                        ? 'day-elem in-range'
                        : 'day-elem'
                    }
                    onClick={() => handleDayClick(day, currentDate)}
                  >
                    {day}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className={mode === 'light' ? 'calendar-container' : 'calendar-container dark'}>
      <div className='button-container'>
        <button className='nav-button' onClick={handlePrevMonth}>
          <KeyboardArrowLeftIcon />
        </button>
        <h2 className='month-header'>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <h2 className='month-header'>
          {monthNames[nextMonthDate.getMonth()]} {nextMonthDate.getFullYear()}
        </h2>
        <button className='nav-button' onClick={handleNextMonth}>
          <KeyboardArrowRightIcon />
        </button>
      </div>
      <div className='months-container'>
        <div className='single-month'>{renderCalendarTable(currentDate)}</div>
        <div className='single-month'>{renderCalendarTable(nextMonthDate)}</div>
      </div>
    </div>
  )
}

export default Calendar
