import React from "react";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { SearchItem } from "../../../../shared/components/SearchItem/SearchItem";
// import { SearchItem } from "../../SearchItem/SearchItem";
import { Sort } from "../../Sort/Sort";
import { Table } from "../Table";
import { TableHeader } from "../TableHeader";
import { RepliedQuestionList } from "./RepliedQuestionList";

export const RepliedQuestionsTable = () => {
  const headItem = TableHeader.repliedQuestionsTable;
  const tableHeader = (
    <>
      <td className="py-2 px-4 whitespace-nowrap">{headItem[0]}</td>
      <td className="py-2 px-4 whitespace-nowrap w-96">{headItem[1]}</td>
      <td className="py-2 px-4 whitespace-nowrap flex justify-between mt-1 h-full items-center">
        {headItem[2]}
        <Sort headItem={headItem[2]} />
      </td>
      <td className="py-2 px-4 whitespace-nowrap">{headItem[3]}</td>
      <td className="py-2 px-4 whitespace-nowrap">
        <QuestionType isSorting />
      </td>
      <td className="py-2 px-4 whitespace-nowrap">{headItem[4]}</td>
    </>
  );

  return (
    <div className="flex space-y-4 flex-col w-full">
      <div className="flex border rounded-lg px-2 py-2 space-x-2 h-10 w-96">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="fill-gray-500"
        >
          <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
        </svg>
        <SearchItem
          className="outline-none text-sm w-full"
          placeholder="Tìm kiếm"
        />
      </div>
      <Table conditionFilter="Đã được trả lời" tableHeader={tableHeader}>
        <RepliedQuestionList />
      </Table>
    </div>
  );
};
