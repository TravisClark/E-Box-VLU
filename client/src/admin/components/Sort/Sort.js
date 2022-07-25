import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DownArrow } from "../../../shared/components/DownArrow/DownArrow";
import { UpArrow } from "../../../shared/components/UpArrow/UpArrow";
import { itemActions } from "../../../shared/store/item-slice";

export const Sort = ({ headItem }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const onSortItemsHandler = (sortType) => {
    let sorted;
    sorted = [...items].slice().sort((a, b) => {
      let first, second;
      switch (headItem) {
        case "Ngày trả lời": {
          first = new Date(a.responsedAt);
          second = new Date(b.responsedAt);
          break;
        }
        case "Ngày duyệt": {
          first = new Date(a.approvedAt);
          second = new Date(b.approvedAt);
          break;
        }
        case "Ngày tạo": {
          first = new Date(a.createdAt);
          second = new Date(b.createdAt);
          break;
        }
        default: {
          first = new Date(a.createdAt);
          second = new Date(b.createdAt);
        }
      }
      if (sortType === "ASC") {
        return first < second ? 1 : -1;
      } else {
        return first > second ? 1 : -1;
      }
    });
    dispatch(itemActions.fetchItems({ items: sorted }));
  };
  return (
    <div className="flex flex-col ">
      <UpArrow onSort={onSortItemsHandler} />
      <DownArrow onSort={onSortItemsHandler} />
    </div>
  );
};
