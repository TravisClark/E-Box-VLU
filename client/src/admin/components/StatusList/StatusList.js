import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useHttpClient from "../../../shared/hooks/http-hook";
import Requests from "../../../shared/api/Requests";
import { useDispatch } from "react-redux";
import { LoadingList } from "../../../shared/api/LoadingList";

export default function StatusList({ onChangeStatus, status }) {
  const [options, setOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest(
          LoadingList.fetchAccountStatus,
          Requests.fetchAccountStatus
        );
        setOptions(
          response.map((res) => (
            <option value={res.status_account} key={res.id_status}>
              {res.status_account}
            </option>
          ))
        );
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
