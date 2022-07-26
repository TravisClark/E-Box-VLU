import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from '../../../../shared/components/Pagination/Pagination';
import { pageActions } from '../../../../shared/store/page-slice';
import { Table } from '../Table';
import { TableHeader } from '../TableHeader';
import { UserList } from './UserList';

export const UserTable = ({users}) => {
  const tableHeader = TableHeader.userTable.map(item => <td className="py-2 px-4">{item}</td>)

  return (
    <Table tableHeader={tableHeader} itemList={useMemo(()=>users, [users])}>
      <UserList />
    </Table>
  );
}


