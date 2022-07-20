import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../api/Requests";
import useHttpClient from "../../hooks/http-hook";
import { itemActions } from "../../store/item-slice";
import { pageActions } from "../../store/page-slice";
import selectStyles from "../UI/Select.module.css";
export const QuestionType = ({ className, isSorting }) => {
  // const [options, setOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const { selectedType, newSortType, typeList, selectedTypeChanged } =
    useSelector((state) => state.item);
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
        // let array = response;
        // !isSorting && (array = response.filter(res => res.type_name !== 'Tất cả'))
        // setOptions(array.map(res => <option value={res.type_name} key={res.id_type}>{res.type_name}</option>));
        // dispatch(itemActions.getSelected({type:isSorting ? 'Tất cả' : response[0].type_name}));
        // dispatch(item)
      } catch (error) {}
    };
    request();
  }, [sendRequest, dispatch, isSorting, selectedType]);
  const options = !isSorting
    ? typeList
        .filter((res) => res !== "Tất cả")
        .map((res, index) => (
          <option value={res} key={index} selected={selectedType === res}>
            {res}
          </option>
        ))
    : typeList.map((res, index) => (
        <option value={res} key={index} selected={res === 'Tất cả'}>
          {res}
        </option>
      ));

  return (
    <select
      // defaultValue={''}
      // value=''
      // defaultValue={isSorting ? "Tất cả" : selectedType}
      // value={isSorting ? typeChanged : selectedTypeChanged}
      onChange={(e) => onChangeHandler(e)}
      className={`w-fit px-4 py-2 rounded-md ${selectStyles} outline-none ${className}`}
    >
      {options}
    </select>
  );
};
