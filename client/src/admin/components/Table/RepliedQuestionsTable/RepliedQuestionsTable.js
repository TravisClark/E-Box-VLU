import React from 'react'
import { useState } from 'react';
import { Pagination } from '../../Ui/Pagination';
import { RepliedQuestionList } from './RepliedQuestionList';

const headItem = ["No", "Câu hỏi", "Người trả lời", 'Thao tác'];

export const RepliedQuestionsTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(2);
  const questions = props.questions.filter(
    (question) => question.status === "Đã được trả lời"
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
          <RepliedQuestionList questions={currentQuestions}/>
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
export const TableHeadItems = ({ item }) => <td className="py-2 px-4">{item}</td>;


