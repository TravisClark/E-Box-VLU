import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { itemActions } from "../../store/item-slice";

export const SearchItem = (props) => {
  const searchInputRef = useRef();
  const dispatch = useDispatch();

  const searchItemHandler = () => {
    dispatch(itemActions.searchItem({ item: searchInputRef.current.value }));
  };

  useEffect(() => {
    return () => {
        dispatch(itemActions.clearItems())
    }
  }, [dispatch]);

  return (
    <input
      type="text"
      ref={searchInputRef}
      className={`${props.className}`}
      placeholder={props.placeholder}
      onChange={searchItemHandler}
    />
  );
};
