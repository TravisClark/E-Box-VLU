import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";
import { itemActions } from "../../../shared/store/item-slice";
import { useDispatch, useSelector } from "react-redux";

export default function StatusList({onChangeStatus, status}) {
  const [options, setOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest(Requests.fetchAccountStatus);
        setOptions(response.map(res => <option value={res.status_name} key={res.id_status}>{res.status_name}</option>));
        // dispatch(itemActions.getSelected({type:selectedTypeChanged ? selectedTypeChanged : selectedType}));
      } catch (error) {}
    };
    request();
  }, [sendRequest, dispatch]);

  return (
    <select
      value={status}
      onChange={(e) => onChangeStatus(e)}
      className={`px-4 py-2 rounded-md outline-none w-80 border`}
    >
      {options}
    </select>
  );
}
