import * as React from 'react';
import useHttpClient from '../../../../shared/hooks/http-hook';
import { useState } from 'react';
import Requests from '../../../../shared/api/Requests';

export default function DisapprovedQuestionsTable() {
    const { sendRequest, isLoading, error } = useHttpClient();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(2);

//   React.useEffect(() => {
//     try {
//       const fetchQuestionList = async () => {
//         const response = await sendRequest(Requests.fetchQuestionList);
//         const questionList = response.filter(
//           (question) => question.status === "Chưa được duyệt"
//         );
//         setQuestions(questionList);
//       };
//       fetchQuestionList();
//     } catch (error) {}
//   }, [sendRequest]);

  return (
    <div style={{ height: 400, width: '100%' }}>
    </div>
  );
}
