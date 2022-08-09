import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function TableList({ onChangeSelectedTable, selectedTable, tableOptions }) {
  const [options, setOptions] = React.useState([]);
  const { account } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    onChangeSelectedTable(event.target.value);
  };
  
  useEffect(() => {
    let roleList;
    switch (account.role_name) {
      case "Ban Chủ Nhiệm Khoa":
        roleList = tableOptions.filter(
          (option) =>
            option !== tableOptions[0] &&
            option !== tableOptions[1]
        );
        break;
      default:
        roleList = tableOptions;
    }
    setOptions(
      roleList.map((role, index) => (
        <MenuItem value={role} key={index}>
          {role}
        </MenuItem>
      ))
    );
  }, [account.role_name, tableOptions]);

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">{selectedTable}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value=""
          label="Age"
          onChange={handleChange}
        >
          {options}
        </Select>
      </FormControl>
    </Box>
  );
}
