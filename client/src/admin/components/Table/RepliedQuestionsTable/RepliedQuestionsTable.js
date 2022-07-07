import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from '../../../../shared/components/Pagination/Pagination';
import { pageActions } from '../../../../shared/store/page-slice';
import { RepliedQuestionList } from './RepliedQuestionList';

const headItem = ["No", "Câu hỏi","Ngày trả lời", "Người trả lời", 'Thao tác'];

export const RepliedQuestionsTable = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const questions = props.questions.filter(
      (question) => question.status === "Đã được trả lời"
    );
    dispatch(
      pageActions.setCurrentItems({
        items: questions,
        itemsPerPage: 1,
        currentPage: 1,
      })
    );
  }, [dispatch, props.questions]);

  return (
    <>
      <div className="flex flex-col w-full table-auto">
        <table className="table-auto">
          <thead>
            <tr className="font-bold bg-gray-100">
              {headItem.map((item) => (
                <TableHeadItems item={item} key={item} />
              ))}
            </tr>
          </thead>
          <RepliedQuestionList/>
        </table>
        <Pagination/>
      </div>
    </>
  );
}
export const TableHeadItems = ({ item }) => <td className="py-2 px-4">{item}</td>;


