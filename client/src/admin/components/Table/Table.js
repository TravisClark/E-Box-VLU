import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../../shared/components/Pagination/Pagination";
import { pageActions } from "../../../shared/store/page-slice";

export const Table = ({ conditionFilter, tableHeader, children }) => {
  const dispatch = useDispatch();
  const { currentItems } = useSelector((state) => state.page.pagination);
  const {items} = useSelector((state) => state.item)

  useEffect(() => {
    const questions = items.filter(
      (question) => question.status === conditionFilter
    );
    dispatch(
      pageActions.setCurrentItems({
        items: questions,
        itemsPerPage: 10,
        currentPage: 1,
      })
    );
  }, [dispatch, items, conditionFilter]);

  return (
    <div className="flex flex-col w-full table-auto">
      <table className="table-auto">
        <thead>
          <tr className="font-bold bg-gray-100">{tableHeader}</tr>
        </thead>
        {children}
      </table>
      {currentItems.length > 0 && <Pagination />}
    </div>
  );
};
