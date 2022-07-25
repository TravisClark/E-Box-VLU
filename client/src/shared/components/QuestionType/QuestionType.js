import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../api/Requests";
import useHttpClient from "../../hooks/http-hook";
import { itemActions } from "../../store/item-slice";
import { pageActions } from "../../store/page-slice";
import selectStyles from "../UI/Select.module.css";
export const QuestionType = ({ className, isSorting }) => {
  const { sendRequest } = useHttpClient();
  const { selectedType, typeList } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const onChangeHandler = (input) => {
    const type = input.target.value;
    isSorting
      ? dispatch(itemActions.changeSortType({ type }))
      : dispatch(itemActions.changeSelectedType({ type }));
  };

  useEffect(() => {
    isSorting && dispatch(pageActions.SortItemsByType());
  }, [isSorting, dispatch]);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest(Requests.fetchQuestionTypes);
        dispatch(
          itemActions.storeTypes({
            typeList: response.map((item) => item.type_name),
          })
        );
      } catch (error) {}
    };
    request();
  }, [sendRequest, dispatch, isSorting, selectedType]);
  const opts = (
    <>
      {isSorting && (
        <option value="Tất cả" key={0} selected>
          Tất cả
        </option>
      )}
      {typeList.map((res, index) => (
          <option value={res} key={index} selected={selectedType === res && !isSorting}>
            {res}
          </option>
        ))}
    </>
  );

  return (
    <select
      onChange={(e) => onChangeHandler(e)}
      className={`w-fit px-4 py-2 rounded-md ${selectStyles} outline-none ${className}`}
    >
      {opts}
    </select>
  );
};
