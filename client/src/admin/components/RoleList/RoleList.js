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
import { itemActions } from "../../../shared/store/item-slice";
import { useDispatch, useSelector } from "react-redux";

export default function BasicSelect({selected, className, onShowWarning}) {
  // const [age, setAge] = React.useState("");
  // const [roles, setRoles] = useState();
  // const {sendRequest} = useHttpClient()
  
  // useEffect(() => {
  //   const fetchRoles = async ()=>{
  //     try {
  //       const response = await sendRequest(Requests.fetchRoleList)
  //       const roleMap = response.map(role =><MenuItem value={role.role_name} key={role.id_role}>{role.role_name}</MenuItem>);
  //       setRoles(roleMap);
  //     } catch (error) {
  //     }
  //   }
  //   fetchRoles();
  // }, [sendRequest]);
  const [options, setOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const {selectedType} = useSelector((state) => state.item)
  const dispatch = useDispatch();

  const onChangeHandler = (input)=>{
    dispatch(itemActions.getSelected(input.target.value));
    onShowWarning()
  }

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest(Requests.fetchRoleList);
        setOptions(response.map(res => <option value={res.role_name} key={res.id_role}>{res.role_name}</option>));
        dispatch(itemActions.getSelected(selected ? selected : response[0].role_name))
      } catch (error) {}
    };
    request();
  }, [sendRequest, dispatch, selected]);
  // console.log(selectedType)

  return (
    // <Box sx={{ minWidth: 120 }}>
    //   <FormControl fullWidth>
    //     <InputLabel id="demo-simple-select-label">Role</InputLabel>
    //     <Controller
    //       render={({ field }) => (
    //         <Select
    //           labelId="demo-simple-select-label"
    //           id="demo-simple-select"
    //           value={roles[0]}
    //           label={roles[0]}
    //           {...field}
    //         >
    //           {roles}
    //         </Select>
    //       )}
    //       control={props.control}
    //       name={props.name}
    //       onChange={e => console.log(e)}
    //     />
    //   </FormControl>
    // </Box>
    <select
      value={selectedType}
      onChange={(e) => onChangeHandler(e)}
      className={`w-fit px-4 py-2 rounded-md outline-none ${className}`}
      
    >
      {options}
    </select>
  );
}
