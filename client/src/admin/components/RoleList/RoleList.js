import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";
import { itemActions } from "../../../shared/store/item-slice";
import { useDispatch, useSelector } from "react-redux";

export default function BasicSelect({selected, className, onShowWarning}) {
  const [options, setOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const {selectedType, selectedTypeChanged} = useSelector((state) => state.item)
  const dispatch = useDispatch();

  const onChangeHandler = (input)=>{
    dispatch(itemActions.changeSelectedType({type:input.target.value}));
    onShowWarning && onShowWarning()
  }

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest(Requests.fetchRoleList);
        setOptions(response.map(res => <option value={res.role_name} key={res.id_role}>{res.role_name}</option>));
        // dispatch(itemActions.getSelected({type:selectedTypeChanged ? selectedTypeChanged : selectedType}));
      } catch (error) {}
    };
    request();
  }, [sendRequest, dispatch]);

  useEffect(() => {
    dispatch(itemActions.getSelected({type:selected ? selected : ''}))
  }, [selected, dispatch, options]);

  return (
    <select
      value={selectedTypeChanged ? selectedTypeChanged : selectedType}
      onChange={(e) => onChangeHandler(e)}
      className={`w-fit px-4 py-2 rounded-md outline-none ${className}`}
    >
      {options}
    </select>
  );
}
