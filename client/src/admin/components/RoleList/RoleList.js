import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";

export default function BasicSelect(props) {
  // const [age, setAge] = React.useState("");
  const [roles, setRoles] = useState();
  const {sendRequest} = useHttpClient()

  const handleChange = (event) => {
    console.log(event.target);
  };
  useEffect(() => {
    const fetchRoles = async ()=>{
      try {
        const response = await sendRequest(Requests.fetchRoleList)
        const roleMap = response.map(role =>  <MenuItem value={role.role_name} key={role.id_role}>{role.role_name}</MenuItem>);
        setRoles(roleMap);
      } catch (error) {
        console.log(error)
      }
    }
    fetchRoles();
  }, [sendRequest]);
  // const roles = DUMMY_ROLES.map(role => <MenuItem value={role} key={role}>{role}</MenuItem>)
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
              onChange={e => console.log(e)}
              
              {...field}
            >
              {roles}
            </Select>
          )}
          control={props.control}
          name={props.name}
          onChange={e => console.log(e)}
        />
      </FormControl>
    </Box>
  );
}
