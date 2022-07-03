import React from "react";

function NewQuestionList(props) {
  const questions = props.questions.map((question, index) => (
    <tr key={question._id}>
      <td className='py-2 px-4'>{++index}</td>
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
