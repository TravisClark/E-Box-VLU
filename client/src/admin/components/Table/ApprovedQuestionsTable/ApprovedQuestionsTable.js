import React from "react";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { Sort } from "../../Sort/Sort";
import { Table } from "../Table";
import { TableHeader } from "../TableHeader";
import { ApprovedQuestionList } from "./ApprovedQuestionList";

export const ApprovedQuestionsTable = () => {
  const headItem = TableHeader.approvedQuestionTable;
  const tableHeader = (
    <>
      <td className="py-2 px-4">{headItem[0]}</td>
      <td className="py-2 px-4">{headItem[1]}</td>
      <td className="py-2 px-4 flex justify-between mt-1 h-full items-center">
        {headItem[2]}
        <Sort headItem={headItem[2]}/>
      </td>
      <td className="py-2 px-4">
        <QuestionType isSorting/>
      </td>
      <td className="py-2 px-4">{headItem[4]}</td>
    </>
  );
  return (
    <Table tableHeader={tableHeader} conditionFilter="Đã được duyệt">
      <ApprovedQuestionList />
    </Table>
  );
};
