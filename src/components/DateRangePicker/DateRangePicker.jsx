import { useState } from 'react'
import Calendar from '../Calendar/Calendar'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import './DateRangePicker.css'

const DateRangePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDateRange, setSelectedDateRange] = useState({ start: null, end: null })
  const [mode, setMode] = useState('light')

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
  console.log(selectedDateRange)

  return (
    <div className={mode === 'light' ? 'calendar-wrapper' : 'calendar-wrapper dark'}>
      <Box sx={{ minWidth: 120, pb: 2 }}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: mode === 'light' ? '' : 'white' }} id='demo-simple-select-label'>
            Mode
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={mode}
            label='Mode'
            onChange={handleChange}
            sx={{
              color: mode === 'light' ? '' : 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: mode === 'light' ? '' : 'white'
              },
              '.MuiSvgIcon-root': {
                color: mode === 'light' ? '' : 'white'
              }
            }}
          >
            <MenuItem value='light'>Light</MenuItem>
            <MenuItem value='dark'>Dark</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
