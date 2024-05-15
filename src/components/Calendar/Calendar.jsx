import { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { findNumberOfDaysInMonth, findFirstDayOfMonth, isCurrentMonthDay } from '../../utils/dateTime'
import { MONTH_NAMES, MODE_TYPE, DAYS_IN_WEEK, NO_DAYS_IN_WEEK } from '../../utils/constants'
import './Calendar.css'

const Calendar = ({ date, onPrevMonth, onNextMonth, selectedDateRange, onDateClick, mode }) => {
  const [currentDate, setCurrentDate] = useState(date || new Date())
  const [nextMonthDate, setNextMonthDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  useEffect(() => {
    setCurrentDate(date || new Date())
    setNextMonthDate(new Date(date.getFullYear(), date.getMonth() + 1))
  }, [date])

  const generateCalendar = (currentDate) => {
    let weeks = []
    let currentWeek = []
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = findFirstDayOfMonth(year, month)
    const daysInMonth = findNumberOfDaysInMonth(year, month)

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      currentWeek.push(i)
      if (currentWeek.length === DAYS_IN_WEEK) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > NO_DAYS_IN_WEEK) {
      while (currentWeek.length < DAYS_IN_WEEK) {
        currentWeek.push(null)
      }
      weeks.push(currentWeek)
    }

    return weeks
  }

  const handleDayClick = (day, currentDate) => {
    if (day !== null) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      onDateClick(selectedDate)
    }
  }

  const isSameDate = (date1, date2) => {
    return (
      date1?.getFullYear() === date2?.getFullYear() &&
      date1?.getMonth() === date2?.getMonth() &&
      date1?.getDate() === date2?.getDate()
    )
  }

  const isInRange = (day, currentDate) => {
    if (!selectedDateRange.start || !selectedDateRange.end) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return date >= selectedDateRange.start && date <= selectedDateRange.end
  }

  const getClassName = (day, currentDate) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const selectedDate = new Date(year, month, day)
    if (day !== null) {
      if (isSameDate(selectedDateRange.start, selectedDate)) {
        return 'day-elem start-day'
      } else if (isSameDate(selectedDateRange.end, selectedDate)) {
        return 'day-elem end-day'
      } else if (isInRange(day, currentDate) && isCurrentMonthDay(year, month) && new Date().getDate() === day) {
        return 'day-elem current-day in-range'
      } else if (isCurrentMonthDay(year, month) && new Date().getDate() === day) {
        return 'day-elem current-day'
      } else if (isInRange(day, currentDate)) {
        return 'day-elem in-range'
      } else {
        return 'day-elem'
      }
    }
  }

  const renderCalendarTable = (currentDate) => {
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
          {weeks.map((week, weekIndex) => (
            <tr key={`week-${weekIndex}`}>
              {week.map((day, dayIndex) => (
                <td
                  key={`day-${dayIndex}`}
                  className={getClassName(day, currentDate)}
                  onClick={() => handleDayClick(day, currentDate)}
                >
                  {day === null ? '' : day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className={mode === MODE_TYPE.LIGHT ? 'calendar-container' : 'calendar-container dark'}>
      <div className='button-container'>
        <button className='nav-button' onClick={onPrevMonth}>
          <KeyboardArrowLeftIcon />
        </button>
        <h2 className='month-header'>
          {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <h2 className='month-header'>
          {MONTH_NAMES[nextMonthDate.getMonth()]} {nextMonthDate.getFullYear()}
        </h2>
        <button className='nav-button' onClick={onNextMonth}>
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
