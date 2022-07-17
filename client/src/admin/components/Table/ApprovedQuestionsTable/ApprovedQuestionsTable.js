import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DownArrow } from "../../../../shared/components/DownArrow/DownArrow";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { UpArrow } from "../../../../shared/components/UpArrow/UpArrow";
import { itemActions } from "../../../../shared/store/item-slice";
import { Table } from "../Table";
import { TableHeader } from "../TableHeader";
import { ApprovedQuestionList } from "./ApprovedQuestionList";

export const ApprovedQuestionsTable = () => {
  const headItem = TableHeader.approvedQuestionTable;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);

  const onSortItemsHandler = (value) => {
    let sorted;
    if (value === "ASC") {
      sorted = [...items].sort((a, b) =>
        new Date(a.approvedAt).getTime() < new Date(b.approvedAt).getTime()
          ? 1
          : -1
      );
    } else {
      sorted = [...items].sort((a, b) =>
        new Date(a.approvedAt).getTime() > new Date(b.approvedAt).getTime()
          ? 1
          : -1
      );
    }

    dispatch(itemActions.fetchItems({ items: sorted }));
  };
  const tableHeader = (
    <>
      <td className="py-2 px-4">{headItem[0]}</td>
      <td className="py-2 px-4">{headItem[1]}</td>
      <td className="py-2 px-4 flex justify-between mt-1 h-full items-center">
        {headItem[2]}
        <div className="flex flex-col ">
          <UpArrow onSort={onSortItemsHandler} />
          <DownArrow onSort={onSortItemsHandler} />
        </div>
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
