import React from "react";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { SearchItem } from "../../SearchItem/SearchItem";
import { Sort } from "../../Sort/Sort";
import { Table } from "../Table";
import { TableHeader } from "../TableHeader";
import { RepliedQuestionList } from "./RepliedQuestionList";

export const RepliedQuestionsTable = () => {
  const headItem = TableHeader.repliedQuestionsTable;
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
    </>
  );
  return (
    <div className="flex space-y-4 flex-col w-full">
      <SearchItem/>
      <Table conditionFilter="Đã được trả lời" tableHeader={tableHeader}>
        <RepliedQuestionList />
      </Table>
    </div>
  );
};
