import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from '../../../../shared/components/Pagination/Pagination';
import { pageActions } from '../../../../shared/store/page-slice';
import { UserList } from './UserList';
// import { RepliedQuestionList } from './RepliedQuestionList';

const headItem = ["No", "Tài khoản","Vai trò", "Tình trạng", 'Thao tác', 'Chi tiết'];

export const UserTable = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      pageActions.setCurrentItems({
        items: props.users,
        itemsPerPage: 10,
        currentPage: 1,
      })
    );
  }, [dispatch, props.users]);

  return (
    <>
      <div className="flex flex-col w-full table-auto">
        <table className="table-auto">
          <thead>
            <tr className="font-bold bg-gray-100">
              {headItem.map((item) => (
                <TableHeadItems item={item} key={item} />
              ))}
            </tr>
          </thead>
          <UserList/>
        </table>
        <Pagination/>
      </div>
    </>
  );
}
export const TableHeadItems = ({ item }) => <td className="py-2 px-4">{item}</td>;


