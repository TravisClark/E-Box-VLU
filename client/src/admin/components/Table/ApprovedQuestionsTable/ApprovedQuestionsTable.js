import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DownArrow } from "../../../../shared/components/DownArrow/DownArrow";
import { Pagination } from "../../../../shared/components/Pagination/Pagination";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { UpArrow } from "../../../../shared/components/UpArrow/UpArrow";
import { pageActions } from "../../../../shared/store/page-slice";
import { ApprovedQuestionList } from "./ApprovedQuestionList";
// import downArrow from "../../../../assets/"
const headItem = ["No", "Câu hỏi", "Thời gian duyệt", "Danh mục", "Trả lời"];

export const ApprovedQuestionsTable = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const questions = props.questions.filter(
      (question) => question.status === "Đã được duyệt"
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
              <td className="py-2 px-4">{headItem[0]}</td>
              <td className="py-2 px-4">{headItem[1]}</td>
              <td className="py-2 px-4 flex justify-between mt-1 h-full items-center">
                {headItem[2]}
                <div className="flex flex-col ">
                  <UpArrow />
                  <DownArrow />
                </div>
              </td>
              <td className="py-2 px-4">
                <QuestionType />
              </td>
              <td className="py-2 px-4">{headItem[4]}</td>
            </tr>
          </thead>
          <ApprovedQuestionList/>
        </table>
        <Pagination/>
      </div>
    </>
  );
};
