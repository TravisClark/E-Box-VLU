import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Pagination.module.css";
import { pageActions } from "../../store/page-slice";
export const Pagination = () => {
    const dispatch = useDispatch();
    const {items, itemsPerPage,} = useSelector((state)=> state.page.pagination)

  // Change page
  const itemCount = Math.ceil(items.length / itemsPerPage);
  const changePage = ({ selected }) => {
    dispatch(pageActions.setCurrentPage(selected + 1))
  };
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={itemCount}
      onPageChange={changePage}
      containerClassName={`${classes.paginationBtn} mt-10 flex space-x-4`}
      previousLinkClassName={""}
      nextLinkClassName={""}
      disabledClassName={`${classes.paginationDisabled}`}
      activeClassName={`${classes.paginationActive} underline-offset-1 underline`}
    />
  );
};
