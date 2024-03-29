import React from "react";
import NewQuestionList from "./NewQuestionList";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { TableHeader } from "../TableHeader";
import { Table } from "../Table";
import { Sort } from "../../Sort/Sort";

function TableQuestionList() {
  const headItem = TableHeader.newQuestionTable;
  const tableHeader = (
    <>
      <td className="py-2 px-4">{headItem[0]}</td>
      <td className="py-2 px-4">{headItem[1]}</td>
      <td className="py-2 px-4 flex justify-between mt-1 h-full items-center">
        {headItem[2]}
        <Sort />
      </td>
      <td className="py-2 px-4">
        <QuestionType isSorting/>
      </td>
      <td className="py-2 px-4">{headItem[3]}</td>
      <td className="py-2 px-4">{headItem[4]}</td>
    </>
  );

  return (
    <Table tableHeader={tableHeader} conditionFilter="Chưa được duyệt">
      <NewQuestionList />
    </Table>
  );
}

export default TableQuestionList;
