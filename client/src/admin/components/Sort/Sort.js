import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DownArrow } from "../../../shared/components/DownArrow/DownArrow";
import { UpArrow } from "../../../shared/components/UpArrow/UpArrow";
import { itemActions } from "../../../shared/store/item-slice";

export const Sort = () => {
    const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const onSortItemsHandler = (value) => {
    let sorted;
    if (value === "ASC") {
      sorted = [...items].slice().sort((a, b) =>
        new Date(a.createdAt) < new Date(b.createdAt)
          ? 1
          : -1
      );
    } else {
      sorted = [...items].slice().sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt)
          ? 1
          : -1
      );
    }
    dispatch(itemActions.fetchItems({ items: sorted }));
};
    return (
      <div className="flex flex-col ">
        <UpArrow onSort={onSortItemsHandler} />
        <DownArrow onSort={onSortItemsHandler} />
      </div>
    );
  
};
