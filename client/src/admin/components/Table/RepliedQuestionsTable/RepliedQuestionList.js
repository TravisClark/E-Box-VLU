import React from "react";

export const RepliedQuestionList = (props) => {
  const questions = props.questions.map((question, index) => (
    <tr key={question._id}>
      <td className="py-2 px-4">{++index}</td>
      <td className="py-2 px-4">{question.question}</td>
      <td className="py-2 px-4">{question.user_name_answer}</td>
      <td className="py-2 px-4 underline">Chỉnh sửa</td>
    </tr>
  ));
  return <tbody>
  {questions.length > 0 ? (
    questions
  ) : (
    <tr>
      <td>There is no question in this list</td>
    </tr>
  )}
</tbody>;
};
