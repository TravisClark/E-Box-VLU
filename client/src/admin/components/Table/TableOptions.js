import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const tableOptions = [
  "New Question List",
  "Approved Question List",
  "Disapproved Question List",
  "Replied Question List",
];

export default function TableList({ onChangeSelectedTable, selectedTable }) {
  const [options, setOptions] = React.useState([]);
  const { account } = useSelector((state) => state.auth);
  const [iniTialValue, setInitialValue] = React.useState(null);

  const handleChange = (event) => {
    onChangeSelectedTable(event.target.value);
  };
  
  useEffect(() => {
    let roleList;
    switch (account.role_name) {
      case "Ban Chủ Nhiệm Khoa":
        roleList = tableOptions.filter(
          (option) =>
            option !== "New Question List" &&
            option !== "Disapproved Question List"
        );
        break;
      default:
        roleList = tableOptions;
    }
    setInitialValue(roleList[0]);
    setOptions(
      roleList.map((role, index) => (
        <MenuItem value={role} key={index}>
          {role}
        </MenuItem>
      ))
    );
  }, [account.role_name]);

  useEffect(() => {
    onChangeSelectedTable(iniTialValue);
  }, [iniTialValue, onChangeSelectedTable]);

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
