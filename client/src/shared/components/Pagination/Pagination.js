import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Pagination.module.css";
import { pageActions } from "../../store/page-slice";

const prevBtn = (
  <div className="top-0 relative">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
    </svg>
  </div>
);

const nextBtn = (
  <div className="h-6">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
    </svg>
  </div>
);

export const Pagination = ({
  activeBtnStyle,
  containerStyle,
  disabledBtnStyle,
}) => {
  const dispatch = useDispatch();
  const { items, itemsPerPage, currentPage } = useSelector(
    (state) => state.page.pagination
  );

  // Change page
  const [totalPages, setTotalPages] = useState();
  const changePage = ({ selected }) => {
    dispatch(pageActions.setCurrentPage(selected + 1));
  };

  useEffect(() => {
    setTotalPages(Math.ceil(items.length / itemsPerPage));
  }, [itemsPerPage, items]);

  return (
    <ReactPaginate
      previousLabel={prevBtn}
      nextLabel={nextBtn}
      pageCount={totalPages}
      onPageChange={changePage}
      containerClassName={`${classes.paginationBtn} mt-10 flex space-x-4 ${containerStyle}`}
      previousLinkClassName={""}
      previousClassName={"h-6 flex justify-center items-center"}
      nextLinkClassName={""}
      nextClassName={"h-6 flex justify-center items-center"}
      disabledClassName={`${classes.paginationDisabled} ${disabledBtnStyle}`}
      activeClassName={`${classes.paginationActive} ${activeBtnStyle}`}
      forcePage={currentPage - 1}
    />
  );
};
