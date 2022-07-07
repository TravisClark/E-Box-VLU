import React from "react";
import { useState } from "react";
import { DownArrow } from "../../../../shared/components/DownArrow/DownArrow";
import { QuestionType } from "../../../../shared/components/QuestionType/QuestionType";
import { UpArrow } from "../../../../shared/components/UpArrow/UpArrow";
import { Pagination } from "../../Ui/Pagination";
import { ApprovedQuestionList } from "./ApprovedQuestionList";
// import downArrow from "../../../../assets/"
const headItem = ["No", "Câu hỏi", "Thời gian duyệt", "Danh mục", "Trả lời"];

export const ApprovedQuestionsTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const questions = props.questions.filter(
    (question) => question.status === "Đã được duyệt"
  );

  // Get current posts
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex flex-col w-full table-auto">
        <table className="table-auto">
          <thead>
            <tr className="font-bold bg-gray-100">
              {/* {headItem.map((item) => (
                <TableHeadItems item={item} key={item} />
              ))} */}
              <td className="py-2 px-4">{headItem[0]}</td>
              <td className="py-2 px-4">{headItem[1]}</td>
              <td className="py-2 px-4 flex justify-between mt-1 h-full items-center">
                {headItem[2]}
                <div className="flex flex-col ">
                  <UpArrow />
                  <DownArrow/>
                </div>
              </td>
              <td className="py-2 px-4">
                <QuestionType />
              </td>
              <td className="py-2 px-4">{headItem[4]}</td>
            </tr>
          </thead>
          <ApprovedQuestionList questions={currentQuestions} />
        </table>
        <Pagination
          questionsPerPage={questionsPerPage}
          totalQuestions={questions.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};
export const TableHeadItems = ({ item }) => (
  <td className="py-2 px-4">{item}</td>
);
