import React, {  useMemo } from 'react'
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


