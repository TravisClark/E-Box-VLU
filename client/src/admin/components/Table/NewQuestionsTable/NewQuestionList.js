import React from "react";

function NewQuestionList(props) {
  // const index = props.ques
  const questions = props.questions.map((question) => (
    <tr key={question.id_question}>
      <td className='py-2 px-4'>{question.id_question}</td>
      <td className='py-2 px-4'>{question.question}</td>
      <td className='py-2 px-4'>Duyệt</td>
      <td className='py-2 px-4'>Từ chối</td>
    </tr>
  ));
  return (
    <tbody>
      {questions}
    </tbody>
  );
}

export default NewQuestionList;
