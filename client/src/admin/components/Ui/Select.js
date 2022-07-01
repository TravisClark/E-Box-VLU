import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export default function BasicSelect(props) {
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  const DUMMY_ROLES = ['admin', 'user', 'assistant']
  const roles = DUMMY_ROLES.map(role => <MenuItem value={role} key={role}>{role}</MenuItem>)
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Controller
          render={({ field }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Role"
              // onChange={handleChange}
              {...field}
            >
              {roles}
            </Select>
          )}
          control={props.control}
          name={props.name}
        />
      </FormControl>
    </Box>
  );
}
