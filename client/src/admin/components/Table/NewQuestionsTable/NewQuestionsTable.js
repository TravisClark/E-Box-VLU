import React from "react";
import NewQuestionList from "./NewQuestionList";
import { UpArrow } from "../../../../shared/components/UpArrow/UpArrow";
import { DownArrow } from "../../../../shared/components/DownArrow/DownArrow";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { TableHeader } from "../TableHeader";
import { Table } from "../Table";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../../../shared/store/item-slice";

function TableQuestionList() {
  const headItem = TableHeader.newQuestionTable;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const onSortItemsHandler = (value) => {
    let sorted;
    if (value === "ASC") {
      sorted = [...items].sort((a, b) =>
        new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
          ? 1
          : -1
      );
    }
    else{
      sorted = [...items].sort((a, b) =>
        new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
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
          <UpArrow onSort={onSortItemsHandler}/>
          <DownArrow onSort={onSortItemsHandler}/>
        </div>
      </td>
      <td className="py-2 px-4">
        <QuestionType isSorting />
      </td>
      <td className="py-2 px-4">{headItem[4]}</td>
      <td className="py-2 px-4">{headItem[5]}</td>
    </>
  );

  return (
    <Table tableHeader={tableHeader} conditionFilter="Chưa được duyệt">
      <NewQuestionList />
    </Table>
  );
}

export default TableQuestionList;
