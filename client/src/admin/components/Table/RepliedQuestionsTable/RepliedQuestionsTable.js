import React from 'react'
import { Table } from '../Table';
import { TableHeader } from '../TableHeader';
import { RepliedQuestionList } from './RepliedQuestionList'

export const RepliedQuestionsTable = (props) => {
  const tableHeader = TableHeader.repliedQuestionsTable.map((headItem, index) => (
    <td className="py-2 px-4" key={index}>
      {headItem}
    </td>
  ));

  return (
    <Table
      conditionFilter="Đã được trả lời"
      tableHeader={tableHeader}
    >
      <RepliedQuestionList/>
    </Table>
  );
}


