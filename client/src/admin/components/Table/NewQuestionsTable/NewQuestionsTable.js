import React, { useState } from "react";
import { Pagination } from "../../Ui/Pagination";
import NewQuestionList from "./NewQuestionList";

const headItem = ["No", "Câu hỏi", "Thời gian tạo", "Danh mục", "Duyệt", "Từ chối"];

function TableQuestionList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const questions = props.questions.filter(
    (question) => question.status === "Chưa được duyệt"
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
              {headItem.map((item) => (
                <TableHeadItems item={item} key={item} />
              ))}
            </tr>
          </thead>
          {/* <div className="border min-w-full"></div> */}
          <NewQuestionList questions={currentQuestions} />
        </table>
        <Pagination
          questionsPerPage={questionsPerPage}
          totalQuestions={questions.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

const TableHeadItems = ({ item }) => <td className="py-2 px-4">{item}</td>;

export default TableQuestionList;
