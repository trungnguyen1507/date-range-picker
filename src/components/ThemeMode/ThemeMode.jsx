import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { MODE_TYPE } from '../../utils/constants'

export const ThemeMode = ({ mode, onModeChange }) => {
  return (
    <Box sx={{ minWidth: 120, pb: 2 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: mode === MODE_TYPE.LIGHT ? '' : 'white' }} id='demo-simple-select-label'>
          Mode
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={mode}
          label='Mode'
          onChange={onModeChange}
          sx={{
            color: mode === MODE_TYPE.LIGHT ? '' : 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: mode === MODE_TYPE.LIGHT ? '' : 'white'
            },
            '.MuiSvgIcon-root': {
              color: mode === MODE_TYPE.LIGHT ? '' : 'white'
            }
          }}
        >
          <MenuItem value='light'>Light</MenuItem>
          <MenuItem value='dark'>Dark</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
