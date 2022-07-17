import React from "react";
import { Table } from "../Table";
import { TableHeader } from "../TableHeader";
import { DisapprovedQuestionList } from "./DisapprovedQuestionsList";


export const DisapprovedQuestionsTable = () => {
  const tableHeader = TableHeader.disapprovedTable.map((headItem, index) => (
    <td className="py-2 px-4" key={index}>
      {headItem}
    </td>
  ));
  return (
    <Table
      conditionFilter="Đã bị từ chối"
      tableHeader={tableHeader}
    >
      <DisapprovedQuestionList />
    </Table>
  );
};
