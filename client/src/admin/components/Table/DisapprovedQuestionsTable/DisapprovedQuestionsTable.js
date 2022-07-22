import React from "react";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { Sort } from "../../Sort/Sort";
import { Table } from "../Table";
import { TableHeader } from "../TableHeader";
import { DisapprovedQuestionList } from "./DisapprovedQuestionsList";


export const DisapprovedQuestionsTable = () => {
  const headItem = TableHeader.disapprovedTable;
  const tableHeader = (
    <>
      <td className="py-2 px-4">{headItem[0]}</td>
      <td className="py-2 px-4">{headItem[1]}</td>
      <td className="py-2 px-4 flex justify-between mt-1 h-full items-center">
        {headItem[2]}
        <Sort />
      </td>
      <td className="py-2 px-4">{headItem[3]}</td>
      <td className="py-2 px-4">
        <QuestionType isSorting/>
      </td>
      <td className="py-2 px-4">{headItem[4]}</td>
      <td className="py-2 px-4">{headItem[5]}</td>
    </>
  );
  return (
    <Table
      conditionFilter="Đã bị từ chối"
      tableHeader={tableHeader}
    >
      <DisapprovedQuestionList />
    </Table>
  );
};
