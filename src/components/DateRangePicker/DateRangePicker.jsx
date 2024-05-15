import { useState } from 'react'
import Calendar from '../Calendar/Calendar'
import { MODE_TYPE } from '../../utils/constants'
import './DateRangePicker.css'
import { ThemeMode } from '../ThemeMode/ThemeMode'

const DateRangePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDateRange, setSelectedDateRange] = useState({ start: null, end: null })
  const [mode, setMode] = useState(MODE_TYPE.LIGHT)

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1))
  }

  const handleDateClick = (date) => {
    if (!selectedDateRange.start || (selectedDateRange.start && selectedDateRange.end)) {
      setSelectedDateRange({ start: date, end: null })
    } else {
      if (selectedDateRange.start > date) {
        setSelectedDateRange((prevRange) => ({
          start: date,
          end: prevRange.start
        }))
      } else {
        setSelectedDateRange((prevRange) => ({
          start: prevRange.start,
          end: date
        }))
      }
    }
  }

  return (
    <div className={mode === MODE_TYPE.LIGHT ? 'calendar-wrapper' : 'calendar-wrapper dark'}>
      <ThemeMode mode={mode} onModeChange={handleChange} />
      <Calendar
        date={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        selectedDateRange={selectedDateRange}
        onDateClick={handleDateClick}
        mode={mode}
      />
    </div>
  )
}

export default DateRangePicker
