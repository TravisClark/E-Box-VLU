import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Pagination.module.css";
import { pageActions } from "../../store/page-slice";
export const Pagination = ({prevBtn = "Previous", nextBtn = "Next", activeBtnStyle, containerStyle, disabledBtnStyle}) => {
    const dispatch = useDispatch();
    const {items, itemsPerPage, currentPage} = useSelector((state)=> state.page.pagination)
  // Change page
    const [totalPages, setTotalPages] = useState()
  const changePage = ({ selected }) => {
    dispatch(pageActions.setCurrentPage(selected+1))
  };
    useEffect(() => {
      setTotalPages( Math.ceil(items.length / itemsPerPage))
    }, [itemsPerPage, items]);
  return (
    <ReactPaginate
      previousLabel={prevBtn}
      nextLabel={nextBtn}
      pageCount={totalPages}
      onPageChange={changePage}
      containerClassName={`${classes.paginationBtn} mt-10 flex space-x-4 ${containerStyle}  `}
      previousLinkClassName={""}
      nextLinkClassName={""}
      disabledClassName={`${classes.paginationDisabled} ${disabledBtnStyle}`}
      activeClassName={`${classes.paginationActive} ${activeBtnStyle}`}
      forcePage={currentPage-1}
    />
  );
};
