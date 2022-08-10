import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";
import { itemActions } from "../../../shared/store/item-slice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingList } from "../../../shared/api/LoadingList";
import { uiActions } from "../../../shared/store/ui-slice";

export default function BasicSelect({ selected, className, onShowWarning }) {
  const [options, setOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const { selectedType, selectedTypeChanged } = useSelector(
    (state) => state.item
  );
  const dispatch = useDispatch();

  const onChangeHandler = (input) => {
    dispatch(itemActions.changeSelectedType({ type: input.target.value }));
    onShowWarning && onShowWarning();
  };

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest(
          LoadingList.fetchRoleList,
          Requests.fetchRoleList
        );
        setOptions(
          response.map((res) => (
            <option value={res.role_name} key={res.id_role}>
              {res.role_name}
            </option>
          ))
        );
        dispatch(uiActions.setSpinnerState({ type: "DONE" }));
      } catch (error) {}
    };
    request();
  }, [sendRequest, dispatch]);

  useEffect(() => {
    dispatch(itemActions.getSelected({ type: selected }));
  }, [selected, dispatch]);

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
