import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../api/Requests";
import useHttpClient from "../../hooks/http-hook";
import { itemActions } from "../../store/item-slice";
import selectStyles from "../UI/Select.module.css";
export const QuestionType = ({selected, className, isSorting}) => {
  const [options, setOptions] = useState([]);
  const { sendRequest } = useHttpClient();
  const {selectedType} = useSelector((state) => state.item)
  const dispatch = useDispatch();

  const onChangeHandler = (input)=>{
    dispatch(itemActions.getSelected(input.target.value));
  }

  useEffect(() => {
    const request = async () => {
      try {
        const response = await sendRequest(Requests.fetchQuestionTypes);
        let array = response;
        !isSorting && (array = response.filter(res => res.type_name !== 'Tất cả'))
        setOptions(array.map(res => <option value={res.type_name} key={res.id_type}>{res.type_name}</option>));
        dispatch(itemActions.getSelected(selectedType ? selectedType :'Tất cả'));;
      } catch (error) {}
    };
    request();
  }, [sendRequest, dispatch, isSorting, selectedType]);
  
  return (
    <select
      value={selected ? selected : selectedType ? selectedType :'Tất cả'}
      onChange={(e) => onChangeHandler(e)}
      className={`w-fit px-4 py-2 rounded-md ${selectStyles} outline-none ${className}`}
    >
      {options}
    </select>
  );
};
