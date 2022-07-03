import React, { useEffect, useState } from "react";
import Requests from "../../../../shared/api/Requests";
import useHttpClient from "../../../../shared/hooks/http-hook";
import { Pagination } from "../../Ui/Pagination";
import NewQuestionList from "./NewQuestionList";

function TableQuestionList() {
  const { sendRequest, isLoading, error } = useHttpClient();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(2);

  useEffect(() => {
    try {
      const fetchQuestionList = async () => {
        const response = await sendRequest(Requests.fetchQuestionList);
        const questionList = response.filter(
          (question) => question.status === "Chưa được duyệt"
        );
        setQuestions(questionList);
      };
      fetchQuestionList();
    } catch (error) {}
  }, [sendRequest]);

  // Get current posts
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3 className="text-red-500 text-sm">{error}</h3>}
      <div className="flex flex-col w-full table-auto">
        <table className="table-auto">
          <thead>
            <tr className='font-bold bg-gray-100'>
              <td className="py-2 px-4">No</td>
              <td className="py-2 px-4">Câu hỏi</td>
              <td className="py-2 px-4">Duyệt</td>
              <td className="py-2 px-4">Từ chối</td>
            </tr>
          </thead>
            {/* <div className="border min-w-full"></div> */}
          <NewQuestionList questions={currentQuestions} />
        </table>
          <Pagination questionsPerPage={questionsPerPage} totalQuestions={questions.length} paginate={paginate}/>
      </div>
    </>
  );
}

export default TableQuestionList;
