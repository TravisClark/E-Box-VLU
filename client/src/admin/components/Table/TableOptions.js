import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function TableList({onChangeSelectedTable, selectedTable}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    onChangeSelectedTable(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 220}}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">{selectedTable}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          
        >
          <MenuItem value={'New Question List'}>New Question List</MenuItem>
          <MenuItem value={'Disapproved Question List'}>Disapproved Question List</MenuItem>
          <MenuItem value={'Approved Question List'}>Approved Question List</MenuItem>
          <MenuItem value={'Replied Question List'}>Replied Question List</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
