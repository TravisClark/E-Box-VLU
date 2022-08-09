import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../../shared/components/Pagination/Pagination";
import { itemActions } from "../../../shared/store/item-slice";
import { pageActions } from "../../../shared/store/page-slice";

export const Table = ({ conditionFilter, tableHeader, children, itemList }) => {
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const { items, itemSearching } = useSelector((state) => state.item);

  useEffect(() => {
    const questions = items.filter(
      (question) =>
        question.status_question === conditionFilter &&
        question.question.includes(itemSearching)
    );
    dispatch(
      pageActions.setCurrentItems({
        items: itemList ? itemList : questions,
        itemsPerPage: 10,
        currentPage: 1,
      })
    );
  }, [dispatch, items, conditionFilter, itemSearching, itemList]);

  useEffect(() => {
    return () => {
      clearTimeout(dispatch(itemActions.clearItems()));
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full">
      <table className="table-auto">
        <thead>
          <tr className="font-bold bg-gray-100">{tableHeader}</tr>
        </thead>
        {children}
      </table>
      {currentItems.length > 0 && (
        <Pagination
          activeBtnStyle="bg-lightBlue text-white rounded h-fit"
          containerStyle="bg-white py-2 px-6 h-6 rounded mx-auto text-gray-400 lg:w-fit"
          disabledBtnStyle="opacity-50"
        />
      )}
    </div>
  );
};
